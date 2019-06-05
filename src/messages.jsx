import React, {Component} from 'react';



const Messages = ({messages}) => { 

    const messageComponent = messages.map(messageObj => (
        messageObj.type === "incomingMessage" ? 
            <div className="message" key={messageObj.id}>
            <span className="message-username">{messageObj.username}</span>
            <span className="message-content">{messageObj.content}</span>
            </div> 
        : 
            <div className="message system"> 
            {messageObj.content};
            </div>        
    ));
    return (
        <main className="messages">
          {messageComponent}  
        </main>
    );
}
export default Messages;