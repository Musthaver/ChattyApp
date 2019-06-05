import React, { Component } from 'react';

class Chatbar extends Component {
  constructor(props) {
    super(props);
    this.state = {content: ''};
  }

  handleChange = event => {
    this.setState({content: event.target.value});
  }

  handleKeyDown = event => {
    if (event.keyCode === 13) {
      event.preventDefault();
      this.props.addNewMessage(this.state.content);
      this.setState({content: ''})
  }
}
  
  render() {
    return (
      <footer className='chatbar'>
        <input
          className='chatbar-username'
          placeholder='Your Name (Optional)'
          defaultValue={this.props.currentUser.name}
        />
        <input
          className='chatbar-message'
          placeholder='Type a message and hit ENTER'
          onKeyDown={this.handleKeyDown}
          onChange={this.handleChange}
          value={this.state.content}
        />
      </footer>
    );
  }
}
export default Chatbar;
