import React, { Component } from 'react';
import './App.css';
import Join from "./components/Join/Join";
import QRView from "./components/qrView/qrView";
import * as Icon from 'react-feather';
import Modal from "react-bootstrap/es/Modal";
import {Button} from "react-bootstrap";

class App extends Component {

  //declared components
  components = {
      Join : Join,
      QRView: QRView
  };

  constructor(){
      super();
      this.state = {
          componentName : "QRView",
          data: {},
          showModal: false,
          fullScreen: false
      };
      this.exitHandler = this.exitHandler.bind(this);
      if (document.addEventListener)
      {
          document.addEventListener('webkitfullscreenchange', this.exitHandler, false);
          document.addEventListener('mozfullscreenchange', this.exitHandler, false);
          document.addEventListener('fullscreenchange', this.exitHandler, false);
          document.addEventListener('MSFullscreenChange', this.exitHandler, false);
      }

  }

    exitHandler()
    {
        if (document.webkitIsFullScreen || document.mozFullScreen || document.msFullscreenElement !== null)
        {
            this.setState({
                fulScreen: false
            })
        }
    }

  //change dynamic component
  changeComponent(componentName) {
      this.setState({
          componentName: componentName
      })
  }

  //set data to pass to the new component
  changeData(data) {
      this.setState({
          data: data
      })
  }

  toggleFullScreen() {
      var doc = window.document;
      var docEl = doc.documentElement;
      var requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
      var cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;
      if(!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
          requestFullScreen.call(docEl);
      }
      else {
          cancelFullScreen.call(doc);
          this.setState({
              fullScreen: false
          })
      }
      this.setState({showModal: false, fullScreen: true});
  }

  handleDismiss() {
      this.setState({ showModal: false });
  }


  render() {
    let ComponentName = this.components[this.state.componentName];
    return (
       <div id="mainDiv">
           {this.state.showModal ?
               <Modal.Dialog>
                   <Modal.Body>Pour plus de confort nous vous conseillons de passer en plein écran</Modal.Body>
                   <Modal.Footer>
                       <Button onClick={this.toggleFullScreen.bind(this)}>Accepter</Button>
                       <Button bsStyle="primary" onClick={this.handleDismiss.bind(this)}>Refuser</Button>
                   </Modal.Footer>
               </Modal.Dialog>
               : null
           }
           {
               (!window.document.fullscreenElement && !window.document.mozFullScreenElement && !window.document.webkitFullscreenElement && !window.document.msFullscreenElement) ?
                   <Icon.Maximize2 id="maximize" onClick={this.toggleFullScreen.bind(this)}/>
                   :null
           }
           <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossOrigin="anonymous"/>
           <ComponentName data={this.state.data} changeData={this.changeData.bind(this)} changeComponent={this.changeComponent.bind(this)}/>
       </div>
    );
  }
}

export default App;
