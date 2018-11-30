import React, { Component } from 'react';

import './playerResult.css';

class PlayerResult extends Component {

    render() {
        return (
            <div className='playerResult'>
                <span>Score :</span>
                <span>{this.props.points ? this.props.points.total : null}</span>
            </div>
        );
    }
}

export default PlayerResult;
