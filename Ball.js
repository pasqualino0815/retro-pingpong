import React, { Component } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";

type Props = {};
type State = {
  x: Number,
  y: Number,
  Speed: Number
};
export default class Ball extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    var variableStyle = { top: this.props.y, left: this.props.x };
    return <View style={[styles.container, variableStyle]} />;
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fbfb4c",
    borderWidth:StyleSheet.hairlineWidth,
    width: 15,
    height: 15,
    borderRadius: 15,
    position: "absolute"
  }
});
