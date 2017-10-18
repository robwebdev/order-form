import { Provider } from "react-redux";
import React from "react";
import TopLevelComponent from "./screens/EntryScreen";
import store from "./store";

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <TopLevelComponent />
      </Provider>
    );
  }
}

export default App;
