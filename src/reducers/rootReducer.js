import {
  ADD_ITEM,
  ORDER_REF_BLURRED,
  REMOVE_ITEM,
  SUBMIT,
  UPDATE_ITEM,
  UPDATE_ORDER_REF
} from "../actions/ActionTypes";

const initialState = {
  orderReference: ""
};

export default function rootReducer(state = initialState, action) {
  let nextState = { ...state };

  switch (action.type) {
    case ADD_ITEM:
      nextState.items = insertItem(
        nextState.items,
        createNewItem(nextState.items.length)
      );
      break;

    case REMOVE_ITEM:
      nextState.items = removeItem(nextState.items, action.index);
      nextState.items = updateOrderNumber(nextState.items);
      break;

    case UPDATE_ITEM:
      nextState.items = updateItem(
        nextState.items,
        action.index,
        action.update
      );
      break;

    case UPDATE_ORDER_REF:
      nextState.orderReference = action.orderReference;
      if (nextState.orderReference) {
        delete nextState.orderReferenceError;
      }
      break;

    case ORDER_REF_BLURRED:
      if (!nextState.orderReference) {
        nextState.orderReferenceError = "Required";
      }
      break;

    case SUBMIT:
      if (!nextState.orderReference) {
        nextState.orderReferenceError = "Required";
      }
      break;

    default:
      const today = new Date();
      const date = today.toLocaleDateString();
      const items = [createNewItem(0)];
      nextState = { ...nextState, ...initialState, date, items };
      break;
  }

  nextState.grandTotal = calculateGrandTotal(nextState.items);
  return nextState;
}

function createNewItem(index) {
  return {
    itemNo: index + 1,
    description: "",
    quantity: 1,
    pricePerItem: 0,
    totalPrice: 0
  };
}

function insertItem(array, item) {
  return [...array.slice(0, array.length), item, ...array.slice(array.length)];
}

function removeItem(array, index) {
  return [...array.slice(0, index), ...array.slice(index + 1)];
}

function updateOrderNumber(array) {
  return array.map((item, index) => {
    return { ...item, itemNo: index + 1 };
  });
}

function updateItem(array, updateIndex, updateValues) {
  return array.map((item, index) => {
    if (index !== updateIndex) {
      return item;
    }

    const updatedItem = {
      ...item,
      ...updateValues
    };

    updatedItem.pricePerItem = safeParseFloat(updatedItem.pricePerItem);
    updatedItem.quantity = safeParseFloat(updatedItem.quantity);

    if (updatedItem.pricePerItem && updatedItem.quantity) {
      updatedItem.totalPrice = updatedItem.pricePerItem * updatedItem.quantity;
    } else {
      updatedItem.totalPrice = 0;
    }
    return updatedItem;
  });
}

function safeParseFloat(string) {
  const parsed = parseFloat(string);
  if (!isNaN(parsed)) {
    return parsed;
  }
  return string;
}

function calculateGrandTotal(items = []) {
  return items.reduce(
    (runningTotal, item) => {
      return runningTotal + item.totalPrice;
    },
    0
  );
}
