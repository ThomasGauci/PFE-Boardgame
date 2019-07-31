import React, { Component } from 'react';
import openSocket from "socket.io-client";
import { Form, Button, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends Component {
  state = {
    serverIp: 'ws://127.0.0.1:8000',
    socket: null,
    connectionError: false,
    searchingSeed: false,
    seedName: '',
    gameSeed: this.randomSeed(10),
    searchName: ''
  }

  componentDidMount() {
    this.connect();
  }

  randomSeed(length) {
    let result = '';
    let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charsLength = chars.length;

    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * charsLength));
    }

    return result;
  }

  connect() {
    const socket = openSocket(this.state.serverIp, {transports: ['websocket', 'polling', 'glashsocket']});

    socket.on('connect', () => {
      this.setState({socket, connectionError: false});
    });
    socket.on('connect_error', () => {
      socket.close();
      this.setState({connectionError: true});
    });
  }

  searchSeed(search, callback) {
    if (this.state.socket) {
      if (search.length >= 3) {
        this.state.socket.emit('searchSeed', {search}, response => {
          callback(response);
        });
      }
    }
  }

  updateSearch(search) {
    this.setState({searchName: search});

    // Search if the user has autocompleted the field with the seeds
    let options = document.querySelectorAll('#seeds option');
    if (options.length > 0) {
      for (let i = 0; i < options.length; i++) {
        if (search === options[i].value) {
          let foundSeed = options[i].getAttribute('gameSeed');
          this.setState({searchingSeed: false, seedName: search, gameSeed: foundSeed});
          return;
        }
      }
    }

    this.searchSeed(search, response => {
      let seeds = response.seeds;

      if (seeds.length > 0) {
        let datalist = document.querySelector('#seeds');
        datalist.innerHTML = '';

        for (let i in seeds) {
          for (let name in seeds[i]) {
            let option = document.createElement('option');
            option.value = name;
            let gs = document.createAttribute('gameSeed');
            gs.value = seeds[i][name];
            option.setAttributeNode(gs);
            datalist.appendChild(option);
          }
        }
      }
    });
  }

  save() {
    if (this.state.socket) {
      let data = {
        seedName: this.state.seedName,
        gameSeed: this.state.gameSeed
      };

      this.state.socket.emit('configuration', data, response => {
      });
    }
  }

  render() {
    let searchingSeed = this.state.searchingSeed;
    let seedForm;

    if (searchingSeed) {
      seedForm = <div>
          <Form.Group>
            <Form.Label>Nom de la graine</Form.Label>
            <Form.Control placeholder="Partie 1"
              value={this.state.searchName}
              list="seeds"
              onChange={event => this.updateSearch(event.target.value)} />
            <datalist id="seeds">
            </datalist>
          </Form.Group>

          Ou <a href="#" onClick={() => this.setState({searchingSeed: false})}>entrez une graine</a>
        </div>;
    } else {
      seedForm = <div>
          <Form.Group>
            <Form.Label>Nom de la graine</Form.Label>
            <Form.Control placeholder="Partie 1"
              value={this.state.seedName}
              onChange={event => this.setState({seedName: event.target.value})} />
          </Form.Group>

          <Form.Group>
            <Form.Label>Graine de jeu</Form.Label>
            <Form.Control placeholder="Graine"
              value={this.state.gameSeed}
              onChange={event => this.setState({gameSeed: event.target.value})} />
          </Form.Group>

          Ou <a href="#" onClick={() => this.setState({searchingSeed: true})}>recherchez une graine</a>
        </div>;
    }

    return (
      <div className="App">
        <h1>Configuration du serveur</h1>
        <Form>
          <Form.Group>
            <Form.Label>Adresse IP du serveur</Form.Label>
            <Form.Control placeholder="Adresse IP du serveur"
              value={this.state.serverIp}
              onChange={event => {this.setState({serverIp: event.target.value})}} />
          </Form.Group>
          {this.state.connectionError ?
            <Alert variant="danger" >
              Connexion au serveur impossible
            </Alert> : null }
          <Button className="float-right" variant="primary" onClick={() => this.connect()}>
            Connexion
          </Button>

          <br/>
          <br/>
          <br/>

          {seedForm}

          <br/>
          <br/>
          <br/>

          <Button className="float-right" variant="primary" onClick={() => this.save()}>
            Sauvegarder
          </Button>
        </Form>
      </div>
    );
  }
}

export default App;
