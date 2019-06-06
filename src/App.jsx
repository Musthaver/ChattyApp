import React, { Component } from 'react';
import NavBar from './NavBar.jsx';
import ChatBar from './ChatBar.jsx';
import Messages from './Messages.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      currentUser: {},
      messages: []
    };
  }

  //build message object to be sent to Websocket
  buildNewMessage = inputMessage => {
    const newMessage = {
      type: 'postMessage',
      username: this.state.currentUser.name,
      content: inputMessage,
      color: this.state.currentUser.color
    };
    this.socket.send(JSON.stringify(newMessage));
  };

  //build name change notification object to be sent to Websocket, set currentUser in state to new username
  updateCurrentUser = newUserName => {
    const postNotification = {
      type: 'postNotification',
      content: `${this.state.currentUser.name} has changed their name to ${newUserName}`
    };
    const newCurrentUser = Object.assign({}, this.state.currentUser)
    newCurrentUser.name = newUserName;
    this.setState({currentUser: newCurrentUser})
    this.socket.send(JSON.stringify(postNotification));
  };



  //function to handle messages from Websocket and update the state accordingly
  handleOnMessage = event => {
    console.log(event);
    const data = JSON.parse(event.data);

    switch (data.type) {
      case 'countUsers':
        this.setState({ userCount: data.size });
        break;
      case 'clientInfo':
        this.setState({currentUser: data});

      case 'incomingMessage':
      case 'incomingNotification':
        this.setState({ messages: [...this.state.messages, data] });
        break;

      default:
        throw new Error('Unknown event type ' + data.type);
    }
  };

  //Once HTML is rendered, load, set Websocket, set up websocket message handlers
  componentDidMount() {
    this.setState({
      loading: false
    });
    this.socket = new WebSocket('ws://localhost:3001');

    this.socket.onopen = function(event) {
      console.log('Connected to server');
    };

    this.socket.onerror = function(event) {
      console.log('Error connecting to websocket');
    };

    this.socket.onmessage = this.handleOnMessage;
  }

  render() {
    if (this.state.loading) {
      return <h1>Loading...</h1>;
    } else {
      return (
        <div>
          <NavBar userCount={this.state.userCount} currentUser={this.state.currentUser}/>
          <Messages messages={this.state.messages}/>
          <ChatBar
            currentUser={this.state.currentUser}
            buildNewMessage={this.buildNewMessage}
            updateCurrentUser={this.updateCurrentUser}
          />
        </div>
      );
    }
  }
}

export default App;
