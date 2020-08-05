import React, { Component } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";

type Props = {};
export default class Raquette extends Component<Props> {
  render() {
    var variableStyle = this.props.position === "top" ? { top: this.props.distance } : { bottom: this.props.distance };
    var locationStyle = { left: this.props.x, width: this.props.width, height: this.props.height };
    return <View style={[styles.container, variableStyle, locationStyle]} />;
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#3ace3a",
    borderWidth:StyleSheet.hairlineWidth,
    margin: 5,
    position: "absolute"
  }
});
