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


var selectedFile = document.getElementById('input').files[0];
var btnLoad = document.querySelector('#load');
btnLoad.addEventListener('click', load);
function load(){
    if(selectedFile.type=="application/json"){
        console.log("Chargement de la sauvegarde : "+selectedFile.name);
        app.load(selectedFile.name);
    }else{
        console.log("Le fichier doit être un fichier JSON et non un fichier "+selectedFile.type);
    }
}
