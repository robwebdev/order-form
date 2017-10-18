import OrderFormScreen from "./screens/OrderFormScreen";
import { Provider } from "react-redux";
import React from "react";
import store from "./store";

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <OrderFormScreen />
      </Provider>
    );
  }
}

export default App;
