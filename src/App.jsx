import React, {Component} from 'react';
import NavBar from './NavBar.jsx';
import ChatBar from './ChatBar.jsx';
import Messages from './Messages.jsx';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      currentUser: {name: "Bob"},
      messages: []
    };
    this.socket = new WebSocket('ws://localhost:3001');
  }

  handleOnMessage = event => {
    console.log(event);
    const incomingMessage = JSON.parse(event.data);
    console.log(incomingMessage);
    this.setState({messages: [incomingMessage, ...this.state.messages]});
  }
    
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

  addNewMessage = inputMessage => {
    const newMessage = {
      username: this.state.currentUser.name,
      content: inputMessage
    }
    this.socket.send(JSON.stringify(newMessage));
  }

  render() {
    if (this.state.loading) {
      return <h1>Loading...</h1>
    } else {
    return (
      <div>
        <NavBar/>
        <Messages messages={this.state.messages}/>
        <ChatBar currentUser={this.state.currentUser} addNewMessage={this.addNewMessage}/>
    </div>
    );
  }
}
}

export default App;
