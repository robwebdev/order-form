import { StyleSheet, View } from "react-native";

import React from "react";
import TopLevelScreenComponent from "./../components/TopLevelScreenComponent";
import { connect } from "react-redux";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  }
});

class EntryScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <TopLevelScreenComponent />
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps)(EntryScreen);
