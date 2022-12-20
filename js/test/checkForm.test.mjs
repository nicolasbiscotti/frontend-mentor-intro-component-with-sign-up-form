import chai from "chai";
import checkForm from "../checkForm.mjs";

describe("Check Form Test", () => {
  const expect = chai.expect;
  it("should create an 'empty First Name' error", () => {
    let list;
    function onFailure(errorList) {
      list = errorList;
    }
    checkForm({
      formFields: [
        {
          name: "fierName",
          value: "",
          placeHolder: "First Name",
          formatHaveToBeChecked: false,
        },
      ],
      onSuccess: () => {},
      onFailure,
    });
    expect(list).to.deep.equal([
      { name: "fierName", description: "First Name cannot be empty" },
    ]);
  });

  it("should create 'empty errors' for First Name and Last Name", () => {
    let list;
    function onFailure(errorList) {
      list = errorList;
    }
    checkForm({
      formFields: [
        {
          name: "firstName",
          placeHolder: "First Name",
          value: "",
          formatHaveToBeChecked: false,
        },
        {
          name: "lastName",
          placeHolder: "Last Name",
          value: "",
          formatHaveToBeChecked: false,
        },
        {
          name: "password",
          placeHolder: "Password",
          value: "1234",
          formatHaveToBeChecked: false,
        },
      ],
      onSuccess: () => {},
      onFailure,
    });
    expect(list).to.deep.equal([
      { name: "firstName", description: "First Name cannot be empty" },
      { name: "lastName", description: "Last Name cannot be empty" },
    ]);
  });

  it("should create 'not an email' error", () => {
    let list;
    function onFailure(errorList) {
      list = errorList;
    }
    function isValidFormat(value) {
      if (value === "name") {
        return false;
      } else {
        return true;
      }
    }
    checkForm({
      formFields: [
        {
          name: "Email",
          value: "name",
          formatHaveToBeChecked: true,
          isValidFormat,
        },
        { name: "Password", value: "1234", formatHaveToBeChecked: false },
      ],
      onSuccess: () => {},
      onFailure,
    });
    expect(list).to.deep.equal([
      { name: "Email", description: "Looks like this is not an email" },
    ]);
  });

  it("should call onSuccess with the forms fields", () => {
    let formToBeSubmitted;

    function onSuccess(toBeSubmitted) {
      formToBeSubmitted = toBeSubmitted;
    }

    const formFields = [
      { name: "Name", value: "Nico", formatHaveToBeChecked: false },
      { name: "Pass", value: "123", formatHaveToBeChecked: false },
      {
        name: "Email",
        value: "m@o.com",
        formatHaveToBeChecked: true,
        isValidFormat: () => true,
      },
    ];

    checkForm({
      formFields,
      onSuccess,
      onFailure: () => {},
    });

    expect(formToBeSubmitted).to.equal(formFields);
  });
});
