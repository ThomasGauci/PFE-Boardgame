import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

var app = new App();

var btnSave = document.querySelector('#save');
btnSave.addEventListener('click', save);
function save() {
    app.save();
}

var btnLoad = document.querySelector('#load');
btnLoad.addEventListener('click', load);
function load(){
    app.load();
}
