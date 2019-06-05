import React, { Component } from 'react';

class Chatbar extends Component {
  constructor(props) {
    super(props);
    this.state = {content: ''};
  }

messageChange = event => {
  this.setState({content: event.target.value});
}

messageKeyDown = event => {
  if (event.keyCode === 13) {
    event.preventDefault();
    this.props.addNewMessage(this.state.content);
    this.setState({content: ''})
  }
}

userKeyDown = event => {
  if (event.keyCode === 13) {
    event.preventDefault();
    const newUserName = event.target.value;
    this.props.updateCurrentUser(newUserName);
  }
}

  
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
