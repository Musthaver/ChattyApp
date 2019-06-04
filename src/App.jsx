import React, {Component} from 'react';
import NavBar from './NavBar.jsx';
import ChatBar from './ChatBar.jsx';
import Messages from './Messages.jsx';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {loading: true};
  }
    
  componentDidMount() {
    this.setState({
      loading: false,
      currentUser: "Bob",
      messages: [
        {
          id: 123,
          username: "Bob",
          content: "Has anyone seen my marbles?",
        },
        {
          id: 456,
          username: "Anonymous",
          content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
        }
      ]
    });
  }

  addNewMessage = inputMessage => {
    const newMessage = {
      id: 789,
      username: this.state.currentUser,
      content: inputMessage
    }
    this.setState({messages: [newMessage, ...this.state.messages]});
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
