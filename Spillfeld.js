import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Platfrom,
  PanResponder,
  Button,
  SafeAreaView,
} from 'react-native';
import Raquette from './Raquette';
import Ball from './Ball';

var {height, width} = Dimensions.get('window');
height = height - (Platform.OS == 'ios' ? 25 : 0);

export default class Spillfeld extends Component {
  gameInterval = 0;

  panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
     
    onPanResponderMove: (event) => {this._onResponderMove(event)},
  });

  constructor(props) {
    super(props);
    this.state = {
      player1Score: 0,
      player2Score: 0,
      player1: {x: 70},
      player2: {x: 70},
      ball: {x: 100, y: 200, size: 15, mov: {x: 0.1, y: 1}, speed: 4},
      raquetteWidth: 100,
      raquetteHeight: 20,
      distance: 100,
      started: false,
    };

    this._gameStep = this._gameStep.bind(this);
  }

   

  render() {
    return (
      <View
      {...this.panResponder.panHandlers}
        onLayout={(evt) => {
          height = evt.nativeEvent.layout.height;
        }}
        style={styles.container}>
        <Raquette
          position="top"
          x={this.state.player1.x}
          width={this.state.raquetteWidth}
          height={this.state.raquetteHeight}
          distance={this.state.distance}
        />
        <Raquette
          position="bottom"
          x={this.state.player2.x}
          width={this.state.raquetteWidth}
          height={this.state.raquetteHeight}
          distance={this.state.distance}
        />
        <Ball
          position="top"
          x={this.state.ball.x}
          y={this.state.ball.y}
          speed={this.state.ball.speed}
        />
        <View style={styles.scorePlayer1}>
          <Text>Score: {this.state.player1Score}</Text>
        </View>
        <View style={styles.scorePlayer2}>
          <Text>Score: {this.state.player2Score}</Text>
        </View>
      </View>
    );
  }

  _gameStep() {
    this.setState(
      {
        ball: {
          ...this.state.ball,
          y: this.state.ball.y + this.state.ball.speed * this.state.ball.mov.y,
          x: this.state.ball.x + this.state.ball.speed * this.state.ball.mov.x,
        },
      },
      () => {
        var ball = this.state.ball;
        var player1 = this.state.player1;
        var player2 = this.state.player2;
        if (
          (ball.x >= player1.x &&
            ball.x <= player1.x + this.state.raquetteWidth &&
            ball.y <= this.state.distance + this.state.raquetteHeight &&
            ball.y >= this.state.distance) ||
          (ball.x >= player2.x &&
            ball.x <= player2.x + this.state.raquetteWidth &&
            ball.y + ball.size >=
              height - this.state.distance - this.state.raquetteHeight &&
            ball.y + ball.size <= height - this.state.distance)
        ) {
          this.setState({
            ball: {
              ...ball,
              mov: {x: Math.random() * 1.5 - 1, y: ball.mov.y * -1},
              speed: ball.speed + 0.3,
            },
          });
        } else if (ball.x <= 0 || ball.x + ball.size >= width) {
          this.setState({
            ball: {
              ...ball,
              mov: {x: -ball.mov.x, y: ball.mov.y},
            },
          });
        } else if (ball.y <= 0) {
          this._stopGame(1);
        } else if (ball.y + ball.size >= height) {
          this._stopGame(-1);
        }
      },
    );
  }

  _stopGame(scoringParam) {
    console.log('Stopping game...');
    clearInterval(this.gameInterval);
    this.setState(
      {
        started: false,
        ball: {
          x: width / 2 - this.state.ball.size / 2,
          y: height / 2 - this.state.ball.size / 2,
          size: 15,
          mov: {x: Math.random() * 1.5 - 1, y: 1},
          speed: 4,
        },
        player1Score: this.state.player1Score + (scoringParam == -1 ? 1 : 0),
        player2Score: this.state.player2Score + (scoringParam == 1 ? 1 : 0),
      },
      () => {},
    );
  }

  _startGame() {
    this.setState({started: true}, () => {
      this.gameInterval = setInterval(this._gameStep, 5);
    });
  }

  _onResponderMove(evt) {
    if (this.state.started == false) {
      this._startGame();
    }
    
    evt.nativeEvent.changedTouches.forEach((currentValue) => {
      var y = currentValue.locationY;
      if (y < 200) {
        this.setState({
          player1: {
            ...this.state.player1,
            x: currentValue.locationX - this.state.raquetteWidth / 2 - 4,
          },
        });
      } else if (y > height - 200) {
        this.setState({
          player2: {
            ...this.state.player2,
            x: currentValue.locationX - this.state.raquetteWidth / 2 - 4,
          },
        });
      }
    });
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Platform.OS == 'ios' ? 20 : 0,
  },
  scorePlayer1: {
    position: 'absolute',
    top: 0,
    left: 0,
    margin: 10,
    transform: [{rotate: '180deg'}],
  },
  scorePlayer2: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    margin: 10,
  },
});
