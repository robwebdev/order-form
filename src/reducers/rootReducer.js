import { ADD_ITEM, REMOVE_ITEM, UPDATE_ITEM } from "../actions/ActionTypes";

const initialState = {
  orderReference: null,
  items: []
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
      break;
    case UPDATE_ITEM:
      nextState.items = updateItem(
        nextState.items,
        action.index,
        action.update
      );
      break;
    default:
      const today = new Date();
      const date = today.toLocaleDateString();
      nextState = { ...nextState, date };
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

function updateItem(array, updateIndex, updateValues) {
  return array.map((item, index) => {
    if (index !== updateIndex) {
      return item;
    }

    const updatedItem = {
      ...item,
      ...updateValues
    };

    updatedItem.pricePerItem = parseFloat(updatedItem.pricePerItem);
    updatedItem.quantity = parseFloat(updatedItem.quantity);
    updatedItem.totalPrice = updatedItem.pricePerItem * updatedItem.quantity;

    return updatedItem;
  });
}

function calculateGrandTotal(items = []) {
  return items.reduce(
    (runningTotal, item) => {
      return runningTotal + item.totalPrice;
    },
    0
  );
}
