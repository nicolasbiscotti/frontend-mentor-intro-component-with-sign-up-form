import checkForm from "./js/checkForm.mjs";
import { createInputGroup } from "./js/createInputGroup.mjs";
import createErrorLog from "./js/errorLog.mjs";

const errorLog = createErrorLog({ initialList: [] });

const form = document.querySelector("form");
const formFields = [];
const submitButton = form.querySelector("button");

const inputGroupTemplate = document.querySelector("#input-group");

submitButton.addEventListener("click", (e) => {
  e.preventDefault();
  checkForm({
    formFields: formFields.map((field) => field.getState()),
    onFailure: errorLog.setErrorList,
    onSuccess: () => {},
  });
});

const firstName = {
  name: "firstName",
  placeHolder: "First Name",
  type: "text",
  value: "",
  formatHaveToBeChecked: false,
  isValidFormat: () => {},
};

const lastName = {
  name: "lastName",
  placeHolder: "Last Name",
  type: "text",
  value: "",
  formatHaveToBeChecked: false,
  isValidFormat: () => {},
};

const email = {
  name: "emailAddres",
  placeHolder: "Email Address",
  type: "email",
  value: "",
  formatHaveToBeChecked: true,
  isValidFormat: () => false,
};

const password = {
  name: "password",
  placeHolder: "Password",
  type: "password",
  value: "",
  formatHaveToBeChecked: false,
  isValidFormat: () => {},
};

insertInput([firstName, lastName, email, password]);

function insertInput(inputs) {
  for (let i = inputs.length - 1; i >= 0; i--) {
    const { inputGroup, field } = createInputGroup(
      inputGroupTemplate,
      inputs[i],
      errorLog
    );
    formFields.push(field);
    form.insertBefore(inputGroup, form.firstChild);
  }
}
