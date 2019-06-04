import React, {Component} from 'react';


const Messages = ({messages}) => { 

    const messageComponent = messages.map(messageObj => (
        <div className="message" key={messageObj.id}>
        <span className="message-username">{messageObj.username}</span>
        <span className="message-content">{messageObj.content}</span>
        </div>
    ));
    return (
        <main className="messages">
          {messageComponent}
        <div className="message system">
          Anonymous1 changed their name to nomnom.
        </div>
      </main>
    );
}
export default Messages;