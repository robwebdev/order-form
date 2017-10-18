import "react-native";

import Index from "../index.js";
import React from "react";
// Note: test renderer must be required after react-native.
import renderer from "react-test-renderer";

it("renders correctly", () => {
  const tree = renderer.create(<Index />);
});
