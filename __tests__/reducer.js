import {
  ADD_ITEM,
  ORDER_REF_BLURRED,
  REMOVE_ITEM,
  SUBMIT,
  UPDATE_ITEM,
  UPDATE_ORDER_REF
} from "../src/actions/ActionTypes";

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

    it("should return the initial state which includes todays date and one item", () => {
      expect(reducer(undefined, {})).toEqual({
        orderReference: "",
        date: "2019-11-28",
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
      });
    });
  });

  it("should handle ADD_ITEM and add an item", () => {
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

  it("should handle REMOVE_ITEM and remove an item at a given index", () => {
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
          itemNo: 1,
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

  it("should handle UPDATE_ITEM with empty fields", () => {
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
        quantity: "",
        pricePerItem: ""
      }
    };
    const state = reducer(initialState, action);
    const expectedState = {
      items: [
        {
          itemNo: 1,
          description: "",
          quantity: "",
          pricePerItem: "",
          totalPrice: 0
        }
      ],
      grandTotal: 0
    };
    expect(state).toEqual(expectedState);
  });

  it("should handle UPDATE_ORDER_REF and clear any errors", () => {
    const initialState = {
      orderReference: "",
      orderReferenceError: "SOME_ERROR"
    };
    const action = {
      type: UPDATE_ORDER_REF,
      orderReference: "MY_REF"
    };
    const state = reducer(initialState, action);
    const expectedState = {
      orderReference: "MY_REF",
      grandTotal: 0
    };
    expect(state).toEqual(expectedState);
  });

  it("should handle ORDER_REF_BLURRED", () => {
    const initialState = {};
    const action = {
      type: ORDER_REF_BLURRED
    };
    const state = reducer(initialState, action);
    const expectedState = {
      orderReferenceError: "Required",
      grandTotal: 0
    };
    expect(state).toEqual(expectedState);
  });

  it("should handle SUBMIT with invalid data", () => {
    const initialState = {};
    const action = {
      type: SUBMIT
    };
    const state = reducer(initialState, action);
    const expectedState = {
      orderReferenceError: "Required",
      grandTotal: 0
    };
    expect(state).toEqual(expectedState);
  });
});
