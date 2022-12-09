import chai from "chai";
import createErrorLog from "../errorLog.mjs";
import createField from "../field.mjs";
describe("Submit Form Test", () => {
  const expect = chai.expect;

  const errorLog = createErrorLog({ initialList: [] });
  const firstName = createField({
    initialState: {
      name: "First Name",
      value: "",
      formatHaveToBeChecked: false,
      isValidFormat: () => {},
    },
  });
  const email = createField({
    initialState: {
      name: "Email",
      value: "",
      formatHaveToBeChecked: true,
      isValidFormat: () => false,
    },
  });
  errorLog.setErrorList

  // it("should check the form fields", () => {
  //   let count = 0;
  //   submitForm({
  //     form: { firstName: "nico", email: "m@g.com", pass: "123" },
  //     checkForm: () => count++,
  //   });
  // });
});
