import React from 'react';
import {StyleSheet, View, Button, Dimensions, Text} from 'react-native';

import Spillfeld from './Spillfeld';

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View
        style={{width: '100%', height: '100%', backgroundColor: '#B4E6BD'}}>
        <Spillfeld />
      </View>
    );
  }
}
 