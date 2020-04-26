import React from 'react';
import { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';

import io from 'socket.io-client';
import './App.css';

const socket = io("http://localhost:8080");
socket.on('connect', () => {
  console.log("connected")
});


function App() {

  const [text, setText] = useState('');
  const [msg, setMsg] = useState([]);
  const [rcvd, setRcvd] = useState([])

  useEffect(() => {
    socket.on('text1', (data) => {
      console.log(data)
      setMsg(msg.concat(data));
      setText('');
    });
  });

  return (
    <Container maxWidth="sm">
      <h1> Messages</h1>
      <hr />
      <Paper style={{ width: '100%', height: 550, backgroundColor: '#bbf8dc', marginBottom: 20 }}>
        {msg.map((msg, index) => {


          return (

            <Paper key={index} style={{
              // marginTop: 20,
              // marginBottom: 10,
              width: '50%',
              padding: 20,
              margin: 20
            }} >
              {msg}
            </Paper>
          )

        })
        }

      </Paper>
      <Grid container>
        <Grid xs={9} sm={10}>
          <FormControl fullWidth variant="outlined">
            <InputLabel htmlFor="input">Message</InputLabel>
            <OutlinedInput
              style={{ height: 38 }}
              id="input"
              value={text}
              onChange={(e) => setText(e.target.value)}
              labelWidth={60}
            />
          </FormControl>
        </Grid>
        <Grid xs={3} sm={2}>
          <Button variant="contained" onClick={() => {
            socket.emit('text', text);

          }} color="primary" disableElevation>
            Send
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
