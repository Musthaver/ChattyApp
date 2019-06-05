import React, { Component } from 'react';

class Chatbar extends Component {
  //Setting local state for controlled input of message field
  constructor(props) {
    super(props);
    this.state = { content: '' };
  }

  //set local state to input value
  messageChange = event => {
    this.setState({ content: event.target.value });
  };

  //On KeyDown === Enter in message field, call buildNewMessage (in App.jsx) and clear the message content in local state
  messageKeyDown = event => {
    if (event.keyCode === 13) {
      event.preventDefault();
      this.props.buildNewMessage(this.state.content);
      this.setState({ content: '' });
    }
  };

  //On KeyDown === Enter in Name field, call updateCurrentUser (in App.jsx)
  userKeyDown = event => {
    if (event.keyCode === 13) {
      event.preventDefault();
      const newUserName = event.target.value;
      this.props.updateCurrentUser(newUserName);
    }
  };

  render() {
    return (
      <footer className='chatbar'>
        <input
          className='chatbar-username'
          placeholder='Your Name (Optional)'
          defaultValue={this.props.currentUser.name}
          onKeyDown={this.userKeyDown}
        />
        <input
          className='chatbar-message'
          placeholder='Type a message and hit ENTER'
          onKeyDown={this.messageKeyDown}
          onChange={this.messageChange}
          value={this.state.content}
        />
      </footer>
    );
  }
}
export default Chatbar;
