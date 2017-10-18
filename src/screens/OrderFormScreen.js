import { Button, ScrollView, Text, TextInput, View } from "react-native";

import LineItem from "../components/LineItem";
import React from "react";
import { actionCreators } from "../actions/ActionCreators";
import { connect } from "react-redux";
import styles from "../styles";

const {
  addItem,
  updateOrderRef,
  orderReferenceWasBlurred,
  submit
} = actionCreators;

export const OrderFormComponent = props => {
  const {
    orderReference,
    date,
    items,
    grandTotal,
    addItem,
    updateOrderRef,
    orderReferenceWasBlurred,
    orderReferenceError,
    submit
  } = props;
  return (
    <View style={styles.appContainer}>
      <Text style={styles.title}>Order Form</Text>
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.formContainer}
      >
        <View style={styles.headerField}>
          <Text style={styles.label}>{"Order Reference:"}</Text>
          <TextInput
            value={orderReference}
            name={"orderReference"}
            style={styles.input}
            onChangeText={text => updateOrderRef(text)}
            onBlur={orderReferenceWasBlurred}
            underlineColorAndroid="transparent"
          />
          {orderReferenceError &&
            <Text style={styles.error}>{orderReferenceError}</Text>}
        </View>

        <View style={styles.headerField}>
          <Text style={styles.label}>{"Date:"}</Text>
          <TextInput
            value={date}
            name={"date"}
            style={styles.input}
            editable={false}
            underlineColorAndroid="transparent"
          />
        </View>

        {items.map((item, index) => {
          return (
            <LineItem key={index} index={index} canDelete={items.length > 1} />
          );
        })}

        <View style={styles.footer}>
          <Button title="Add item" onPress={addItem} />
          <View style={[styles.row, { marginBottom: 0 }]}>
            <Text style={styles.footerLabel}>{"Grand Total:"}</Text>
            <TextInput
              value={grandTotal}
              editable={false}
              name={"grandTotal"}
              style={[styles.input, styles.footerInput]}
              underlineColorAndroid="transparent"
            />
            <Button title="Submit" onPress={submit} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

function mapStateToProps(
  { date, orderReference, items, grandTotal, orderReferenceError }
) {
  return {
    date,
    orderReference: orderReference,
    items,
    grandTotal: grandTotal.toString(),
    orderReferenceError
  };
}

export default connect(mapStateToProps, {
  addItem,
  updateOrderRef,
  orderReferenceWasBlurred,
  submit
})(OrderFormComponent);
