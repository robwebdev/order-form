import { ADD_ITEM, REMOVE_ITEM, UPDATE_ITEM } from "../src/actions/ActionTypes";

import MockDate from "mockdate";
import reducer from "../src/reducers/rootReducer";

describe("reducer", () => {
  describe("initial state", () => {
    beforeEach(() => {
      MockDate.set(new Date(2019, 10, 28));
    });

    afterEach(() => {
      MockDate.reset();
    });

    it("should return the initial state", () => {
      expect(reducer(undefined, {})).toEqual({
        orderReference: null,
        date: "2019-11-28",
        items: [],
        grandTotal: 0
      });
    });
  });

  it("should handle ADD_ITEM", () => {
    const initialState = { items: [] };
    const action = {
      type: ADD_ITEM
    };
    const state = reducer(initialState, action);
    const expectedState = {
      items: [
        {
          itemNo: 1,
          description: "",
          quantity: 1,
          pricePerItem: 0,
          totalPrice: 0
        }
      ],
      grandTotal: 0
    };
    expect(state).toEqual(expectedState);
  });

  it("should handle REMOVE_ITEM", () => {
    const initialState = {
      items: [
        {
          itemNo: 1,
          description: "",
          quantity: 1,
          pricePerItem: 5,
          totalPrice: 5
        },
        {
          itemNo: 2,
          description: "",
          quantity: 2,
          pricePerItem: 1.9,
          totalPrice: 3.8
        }
      ],
      grandTotal: 8.8
    };
    const action = {
      type: REMOVE_ITEM,
      index: 0
    };
    const state = reducer(initialState, action);
    const expectedState = {
      items: [
        {
          itemNo: 2,
          description: "",
          quantity: 2,
          pricePerItem: 1.9,
          totalPrice: 3.8
        }
      ],
      grandTotal: 3.8
    };

    expect(state).toEqual(expectedState);
  });

  it("should handle UPDATE_ITEM with an updated pricePerItem", () => {
    const initialState = {
      items: [
        {
          itemNo: 1,
          description: "",
          quantity: 1,
          pricePerItem: 0,
          totalPrice: 0
        }
      ],
      grandTotal: 0
    };
    const action = {
      type: UPDATE_ITEM,
      index: 0,
      update: {
        pricePerItem: "2.50"
      }
    };
    const state = reducer(initialState, action);
    const expectedState = {
      items: [
        {
          itemNo: 1,
          description: "",
          quantity: 1,
          pricePerItem: 2.5,
          totalPrice: 2.5
        }
      ],
      grandTotal: 2.5
    };
    expect(state).toEqual(expectedState);
  });

  it("should handle UPDATE_ITEM with an updated quantity", () => {
    const initialState = {
      items: [
        {
          itemNo: 1,
          description: "",
          quantity: 1,
          pricePerItem: 2.50,
          totalPrice: 2.50
        }
      ]
    };
    const action = {
      type: UPDATE_ITEM,
      index: 0,
      update: {
        quantity: 5
      }
    };
    const state = reducer(initialState, action);
    const expectedState = {
      items: [
        {
          itemNo: 1,
          description: "",
          quantity: 5,
          pricePerItem: 2.5,
          totalPrice: 12.5
        }
      ],
      grandTotal: 12.5
    };
    expect(state).toEqual(expectedState);
  });
});
