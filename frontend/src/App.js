import './App.scss';
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import io from "socket.io-client";
import Chat from "./components/Chat";
import Home from "./components/Home";
import Process from "./process/Process";

const socket = io.connect('/');

function Appmain(props){
  return(
    <React.Fragment>
      <div className="right">
        <Chat 
          username={props.match.params.username}
          roomname={props.match.params.roomname}
          socket={socket}
          />
      </div>
      <div className="left">
        <Process/>
      </div>
    </React.Fragment>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact>
            <Home socket={socket} />
          </Route>
          
          <Route path="/chat/:roomname/:username" component={Appmain} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
