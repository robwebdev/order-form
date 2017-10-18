import * as types from "../src/actions/ActionTypes";

import { actionCreators } from "../src/actions/ActionCreators";

const {
  updateItem,
  removeItem,
  addItem,
  updateOrderRef,
  orderReferenceWasBlurred,
  submit
} = actionCreators;

describe("updateItem", () => {
  it("should create an action with the correct type and data", () => {
    const action = updateItem(0, { some: "update" });
    expect(action).toEqual({
      type: types.UPDATE_ITEM,
      index: 0,
      update: { some: "update" }
    });
  });
});

describe("removeItem", () => {
  it("should create an action with the correct type and data", () => {
    const action = removeItem(0);
    expect(action).toEqual({
      type: types.REMOVE_ITEM,
      index: 0
    });
  });
});

describe("addItem", () => {
  it("should create an action with the correct type and data", () => {
    const action = addItem(0);
    expect(action).toEqual({
      type: types.ADD_ITEM
    });
  });
});

describe("updateOrderRef", () => {
  it("should create an action with the correct type and data", () => {
    const action = updateOrderRef("MY_REF");
    expect(action).toEqual({
      type: types.UPDATE_ORDER_REF,
      orderReference: "MY_REF"
    });
  });
});

describe("orderReferenceWasBlurred", () => {
  it("should create an action with the correct type and data", () => {
    const action = orderReferenceWasBlurred("MY_REF");
    expect(action).toEqual({
      type: types.ORDER_REF_BLURRED
    });
  });
});

describe("submit", () => {
  it("should create an action with the correct type and data", () => {
    const action = submit();
    expect(action).toEqual({
      type: types.SUBMIT
    });
  });
});
