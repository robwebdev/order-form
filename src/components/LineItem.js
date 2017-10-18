import { Button, Text, TextInput, View } from "react-native";

import React from "react";
import { actionCreators } from "../actions/ActionCreators";
import { connect } from "react-redux";
import styles from "../styles";

const { updateItem, removeItem } = actionCreators;

const ColumnField = props => {
  return (
    <View style={[styles.itemColumn, props.style]}>
      {props.label && <Text>{props.label}</Text>}
      <TextInput
        style={styles.columnInput}
        value={props.value}
        editable={props.editable}
        name={props.name}
        onChangeText={props.onChangeText}
        underlineColorAndroid="transparent"
      />
    </View>
  );
};

export const LineItem = props => {
  const { index, updateItem, removeItem, canDelete } = props;
  return (
    <View style={index % 2 === 0 ? styles.itemOdd : styles.itemEven}>
      <View style={styles.itemRow}>
        <ColumnField
          label={"Item No"}
          value={props.itemNo}
          editable={false}
          name={"itemNo"}
          style={{ width: 60, flex: 0 }}
        />
        <ColumnField
          label={"Description"}
          value={props.description}
          editable={true}
          name={"description"}
          onChangeText={description => {
            updateItem(index, { description });
          }}
        />
      </View>
      <View style={styles.itemRow}>
        <ColumnField
          label={"Qty"}
          value={props.quantity}
          editable={true}
          name={"quantity"}
          onChangeText={quantity => {
            updateItem(index, { quantity });
          }}
        />
        <ColumnField
          label={"Price per each"}
          value={props.pricePerItem}
          editable={true}
          name={"pricePerItem"}
          onChangeText={pricePerItem => {
            updateItem(index, { pricePerItem });
          }}
        />
        <ColumnField
          label={"Total"}
          value={props.totalPrice}
          editable={false}
          name={"totalPrice"}
        />
        <View
          style={[
            styles.itemColumn,
            {
              marginRight: 0,
              justifyContent: "flex-end",
              flex: 0.4
            }
          ]}
        >
          <Button
            title="X"
            onPress={() => {
              removeItem(index);
            }}
            disabled={!canDelete}
          />
        </View>
      </View>
    </View>
  );
};

function mapStateToProps(state, ownProps) {
  const {
    itemNo,
    description,
    quantity,
    pricePerItem,
    totalPrice
  } = state.items[ownProps.index];
  return {
    itemNo: itemNo.toString(),
    description,
    quantity: quantity.toString(),
    pricePerItem: pricePerItem.toString(),
    totalPrice: totalPrice.toString()
  };
}

export default connect(mapStateToProps, {
  updateItem,
  removeItem
})(LineItem);
