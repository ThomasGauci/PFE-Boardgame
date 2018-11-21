let StateMachine = require('javascript-state-machine');

let fsm = new StateMachine({
    init: 'wait',
    transitions: [
        { name: 'settingUp', from: 'wait',  to: 'setUp'},
        { name: 'startAge', from: 'setUp', to: 'newAge'},
        { name: 'distributeCards', from: 'newAge', to: 'turn'},
        { name: 'playTurn', from: 'turn', to: 'endTurn'},
        { name: 'startTurn', from: 'endTurn', to: 'turn'},
        { name: 'battle', from: 'endTurn', to: 'endAge'},
        { name: 'restartAge', from: 'enAge', to: 'newAge'},
        { name: 'findWinner', from: 'enAge', to: 'end'}
    ],
    methods: {
        settingUp:  function() { console.log('I melted')    },
        onFreeze:  function() { console.log('I froze')     },
        onCondense: function() { console.log('I condensed') }
    }
});