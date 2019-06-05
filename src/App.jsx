import React, {Component} from 'react';
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
    this.socket = new WebSocket('ws://localhost:3001');
  }

  addNewMessage = inputMessage => {
    const newMessage = {
      type: "postMessage",
      username: this.state.currentUser.name,
      content: inputMessage
    }
    this.socket.send(JSON.stringify(newMessage));
  }

  updateCurrentUser = newUserName => {
    let newCurrentUser = {name: newUserName};
    const postNotification = {
      type: "postNotification",
      content: `${this.state.currentUser.name} has changed their name to ${newUserName}`
    }
    this.setState({currentUser: newCurrentUser});
    this.socket.send(JSON.stringify(postNotification));
  }

  handleOnMessage = event => {
    console.log(event);
    const data = JSON.parse(event.data);

    switch(data.type) {
      case "countUsers":
        this.setState({userCount: data.size});
        break;

      case "incomingMessage":
        this.setState({messages: [data, ...this.state.messages]});
        break;

      case "incomingNotification":
        this.setState({messages: [data, ...this.state.messages]});
        break;

      default:
        throw new Error("Unknown event type " + data.type);  
    }
  };
    
  componentDidMount() {
    this.setState({
      loading: false,
    });
  
    this.socket.onopen = function (event) {
      console.log("Connected to server");
    };

    this.socket.onerror = function (event) {
      console.log('Error connecting to websocket');
    };

    this.socket.onmessage = this.handleOnMessage;
  };

  render() {
    if (this.state.loading) {
      return <h1>Loading...</h1>
    } else {
    return (
      <div>
        <NavBar userCount={this.state.userCount}/>
        <Messages messages={this.state.messages}/>
        <ChatBar currentUser={this.state.currentUser} addNewMessage={this.addNewMessage} updateCurrentUser={this.updateCurrentUser}/>
    </div>
    );
  }
}
}

export default App;
