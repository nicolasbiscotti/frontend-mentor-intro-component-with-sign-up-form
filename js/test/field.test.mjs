import chai from "chai";
import createField from "../field.mjs";

describe("Field Test", () => {
  const expect = chai.expect;

  it("should call the listener with the current value", () => {
    let value;

    function listener(currentValue) {
      value = currentValue;
    }

    function selector() {
      return "value";
    }

    const initialState = {
      name: "Email",
      value: "name",
      formatHaveToBeChecked: true,
      isValidFormat: () => {},
    };
    const field = createField({ initialState });
    field.subscribe(listener, selector);

    expect(value).to.equal("name");
  });

  it("should call the listener when the value change", () => {
    let value;

    function listener(currentValue) {
      value = currentValue;
    }

    const initialState = {
      name: "Email",
      value: "name",
      formatHaveToBeChecked: true,
      isValidFormat: () => {},
    };
    const field = createField({ initialState });
    field.subscribe(listener, () => "value");
    field.setProp("name@gmail.com", () => "value");

    expect(value).to.equal("name@gmail.com");
  });

  it("should return a copy of the complete state", () => {
    const initialState = {
      name: "Email",
      value: "name",
      formatHaveToBeChecked: true,
      isValidFormat: () => {},
    };
    const field = createField({ initialState });
    field.subscribe(
      () => {},
      () => "value"
    );
    const stateOne = field.getState();
    expect(stateOne).to.deep.equal(initialState);
    expect(stateOne).not.equal(initialState);

    // should set a prop without a listener for that prop
    // found this bug accidentally
    field.setProp(false, () => "formatHaveToBeChecked");
    expect(field.getState()).to.deep.equal({
      ...initialState,
      formatHaveToBeChecked: false,
    });
  });

  it("should return the selected value", () => {
    const initialState = {
      name: "Email",
      value: "name",
      formatHaveToBeChecked: true,
      isValidFormat: () => {},
    };
    const field = createField({ initialState });
    field.subscribe(
      () => {},
      () => "value"
    );

    expect(field.getState(() => "name")).to.equal("Email");
  });

  it("should call each listener", () => {
    let count = 0;
    function listenerOne() {
      count++;
    }
    function listenerTwo() {
      count++;
    }
    const initialState = {
      name: "Email",
      value: "name",
      formatHaveToBeChecked: true,
      isValidFormat: () => {},
    };
    const field = createField({ initialState });
    field.subscribe(listenerOne, () => "value");
    field.subscribe(listenerTwo, () => "value");

    field.setProp("nico@gmail.com", () => "value");

    expect(count).to.equal(4);
  });
});
