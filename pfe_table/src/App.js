import React, { Component } from 'react';
import { getIPs } from './Ip-helper.js';
import logo from './logo.svg';
import './App.css';
import  QRCode from 'qrcode.react';

class App extends Component {
  render() {

    getIPs((ip)=> document.getElementById("holder").innerHTML=ip);
    return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p id="holder">
            </p>
            <a
                className="App-link"
                href="https://reactjs.org"
                target="_blank"
                rel="noopener noreferrer"
            >
              Learn React
            </a>
          </header>
          <body>
            <QRCode value="http://facebook.github.io/react/" />
            <input id="text" type="text" value="http://jindo.dev.naver.com/collie" />
            <div id="qrcode">
            </div>
          </body>
        </div>
    );
  }
}

export default App;
