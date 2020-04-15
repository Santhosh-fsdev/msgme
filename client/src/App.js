import React from 'react';
import { useState, useEffect } from 'react';



import io from 'socket.io-client';
import './App.css';

const socket = io("https://santxt.herokuapp.com");
socket.on('connect', () => {
  console.log("connected")
});


function App() {

  const [text, setText] = useState('');
  const [msg, setMsg] = useState([]);

  useEffect(() => {
    socket.once('text', (data) => {
      console.log(data)
      setMsg(msg.concat(data));
      setText('')
    });
  });

  return (
    <div className="App">
      <h1> Messages</h1>
      <hr />
      <div>
        {msg.map((msg, index) => {


          return (
            <div>
              <p key={index} color="dark">
                <h5>{msg}</h5>
              </p>
            </div>
          )

        })
        }
      </div>
      <input value={text} placeholder="Enter Input" onChange={e => setText(e.target.value)}/>
        <button onClick={()=>{
          socket.emit('text',text);
        }}
        color="dark">Send</button>
    </div>
  );
}

export default App;
