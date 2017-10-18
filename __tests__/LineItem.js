import Enzyme, { shallow } from "enzyme";
import LineItemContainer, { LineItem } from "../src/components/LineItem";

import Adapter from "enzyme-adapter-react-16";
import React from "react";
import { actionCreators } from "../src/actions/ActionCreators";
import configureStore from "redux-mock-store";

const middlewares = [];
const mockStore = configureStore(middlewares);

jest.mock("../src/actions/ActionCreators", () => {
  const mockAction = {
    type: "MOCKACTION"
  };
  return {
    actionCreators: {
      updateItem: jest.fn(() => {
        return mockAction;
      }),
      removeItem: jest.fn(() => {
        return mockAction;
      })
    }
  };
});

Enzyme.configure({ adapter: new Adapter() });

describe("LineItemContainer", () => {
  const initialState = {
    orderReference: 1,
    date: "2019-11-28",
    items: [
      {
        itemNo: 1,
        description: "",
        quantity: 1,
        pricePerItem: 5,
        totalPrice: 5
      }
    ],
    grandTotal: 0
  };

  const rendered = shallow(<LineItemContainer index={0} />, {
    context: { store: mockStore(initialState) }
  });
  const props = rendered.props();

  it("should map itemNo to a string prop", () => {
    expect(props.itemNo).toBe("1");
  });

  it("should map description to a prop", () => {
    expect(props.description).toBe("");
  });

  it("should map quantity to a string prop", () => {
    expect(props.quantity).toEqual("1");
  });

  it("should map pricePerItem to a string prop", () => {
    expect(props.pricePerItem).toBe("5");
  });

  it("should map totalPrice to a string prop", () => {
    expect(props.totalPrice).toBe("5");
  });

  it("should map updateItem dispatcher to a prop", () => {
    props.updateItem(0, "foo");
    expect(actionCreators.updateItem).toHaveBeenCalledWith(0, "foo");
  });

  it("should map removeItem dispatcher to a prop", () => {
    props.removeItem(0);
    expect(actionCreators.removeItem).toHaveBeenCalledWith(0);
  });
});
