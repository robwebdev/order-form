import Enzyme, { shallow } from "enzyme";
import OrderFormScreenContainer, {
  OrderFormComponent
} from "../src/screens/OrderFormScreen";

import Adapter from "enzyme-adapter-react-16";
import LineItem from "../src/components/LineItem";
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
      addItem: jest.fn(() => {
        return mockAction;
      }),
      updateOrderRef: jest.fn(() => {
        return mockAction;
      }),
      orderReferenceWasBlurred: jest.fn(() => {
        return mockAction;
      }),
      submit: jest.fn(() => {
        return mockAction;
      })
    }
  };
});

Enzyme.configure({ adapter: new Adapter() });

describe("OrderFormScreenContainer", () => {
  const initialState = {
    orderReference: "1",
    date: "2019-11-28",
    items: [],
    grandTotal: 0
  };

  const rendered = shallow(<OrderFormScreenContainer />, {
    context: { store: mockStore(initialState) }
  });
  const props = rendered.props();

  it("should map orderReference to a prop", () => {
    expect(props.orderReference).toBe("1");
  });

  it("should map date to a string prop", () => {
    expect(props.date).toBe("2019-11-28");
  });

  it("should map items to a prop", () => {
    expect(props.items).toEqual([]);
  });

  it("should map grandTotal to a string prop", () => {
    expect(props.grandTotal).toBe("0");
  });

  it("should map addItem dispatcher to a prop", () => {
    props.addItem();
    expect(actionCreators.addItem).toHaveBeenCalled();
  });

  it("should map updateOrderRef dispatcher to a prop", () => {
    props.updateOrderRef();
    expect(actionCreators.updateOrderRef).toHaveBeenCalled();
  });

  it("should map orderReferenceWasBlurred dispatcher to a prop", () => {
    props.orderReferenceWasBlurred();
    expect(actionCreators.orderReferenceWasBlurred).toHaveBeenCalled();
  });

  it("should map submit dispatcher to a prop", () => {
    props.submit();
    expect(actionCreators.submit).toHaveBeenCalled();
  });
});

describe("EntryScreen", () => {
  const rendered = shallow(
    <OrderFormComponent
      date={"2019-11-28"}
      orderReference={null}
      grandTotal={"0"}
      items={[]}
      addItem={jest.fn()}
      submit={jest.fn()}
    />
  );

  it("should populate orderReference field with value passed in as a prop", () => {
    const orderReferenceInput = rendered.find({ name: "orderReference" });
    expect(orderReferenceInput.props().value).toBe(null);
  });

  it("should populate date field with value passed in as a prop", () => {
    const dateInput = rendered.find({ name: "date" });
    expect(dateInput.props().value).toBe("2019-11-28");
  });

  it("should populate grandTotal field with value passed in as a prop", () => {
    const grandTotalInput = rendered.find({ name: "grandTotal" });
    expect(grandTotalInput.props().value).toBe("0");
  });

  it("should render LineItem components for each item, passing an index prop", () => {
    const items = [
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
    ];
    const rendered = shallow(
      <OrderFormComponent
        items={items}
        addItem={jest.fn()}
        submit={jest.fn()}
      />
    );
    const props = rendered.find(LineItem).map(lineItem => {
      return lineItem.props().index;
    });
    expect(props).toEqual([0, 1]);
  });

  it("should call addItem prop when the Add item Button is clicked", () => {
    const addItem = jest.fn();
    const rendered = shallow(
      <OrderFormComponent addItem={addItem} items={[]} submit={jest.fn()} />
    );
    rendered.find({ title: "Add item" }).at(0).simulate("press");
    expect(addItem).toHaveBeenCalled();
  });

  it("should call updateOrderRef prop when text is changed in orderReference field", () => {
    const updateOrderRef = jest.fn();
    const rendered = shallow(
      <OrderFormComponent
        updateOrderRef={updateOrderRef}
        addItem={jest.fn()}
        submit={jest.fn()}
        items={[]}
      />
    );
    rendered
      .find({ name: "orderReference" })
      .at(0)
      .simulate("changeText", "MY_REF");
    expect(updateOrderRef).toHaveBeenCalledWith("MY_REF");
  });

  it("should call orderReferenceWasBlurred prop when orderReference field is blurred", () => {
    const orderReferenceWasBlurred = jest.fn();
    const rendered = shallow(
      <OrderFormComponent
        orderReferenceWasBlurred={orderReferenceWasBlurred}
        updateOrderRef={jest.fn()}
        addItem={jest.fn()}
        submit={jest.fn()}
        items={[]}
      />
    );
    rendered.find({ name: "orderReference" }).at(0).simulate("blur");
    expect(orderReferenceWasBlurred).toHaveBeenCalledWith();
  });

  it("should call submit prop when submit button is clicked", () => {
    const submit = jest.fn();
    const rendered = shallow(
      <OrderFormComponent
        submit={submit}
        orderReferenceWasBlurred={jest.fn()}
        updateOrderRef={jest.fn()}
        addItem={jest.fn()}
        items={[]}
      />
    );
    rendered.find({ title: "Submit" }).at(0).simulate("press");
    expect(submit).toHaveBeenCalledWith();
  });
});
