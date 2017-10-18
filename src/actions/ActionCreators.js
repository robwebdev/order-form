import * as types from "./ActionTypes";

function updateItem(index, update) {
  return {
    type: types.UPDATE_ITEM,
    index,
    update
  };
}

function removeItem(index, update) {
  return {
    type: types.REMOVE_ITEM,
    index
  };
}

function addItem(index, update) {
  return {
    type: types.ADD_ITEM
  };
}

function updateOrderRef(orderReference) {
  return {
    type: types.UPDATE_ORDER_REF,
    orderReference
  };
}

function orderReferenceWasBlurred() {
  return {
    type: types.ORDER_REF_BLURRED
  };
}

function submit() {
  return {
    type: types.SUBMIT
  };
}

export const actionCreators = {
  updateItem,
  removeItem,
  addItem,
  updateOrderRef,
  orderReferenceWasBlurred,
  submit
};
