import checkForm from "./js/checkForm.mjs";
import createErrorLog from "./js/errorLog.mjs";
import createField from "./js/field.mjs";

const errorLog = createErrorLog({ initialList: [] });
errorLog.subscribe((errorList) =>
  console.log(`errorList ${JSON.stringify(errorList)}`)
);

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
      inputs[i]
    );
    formFields.push(field);
    form.insertBefore(inputGroup, form.firstChild);
  }
}

function createInputGroup(template, config) {
  const inputGroup = template.content.cloneNode(true);
  const container = inputGroup.querySelector("div");
  const errorMessage = inputGroup.querySelector("em");

  const field = createField({ initialState: config });

  const placeHolder = inputGroup.querySelector("label");
  configureElement(placeHolder, { for: config.name }, config.placeHolder);
  let placeHolderVisible = true;

  const input = inputGroup.querySelector("input");
  configureElement(input, {
    type: config.type,
    name: config.name,
    id: config.name,
  });

  input.addEventListener("keyup", () => {
    hideError();
    field.setProp(input.value, () => "value");
  });

  field.subscribe(
    (value) => (value.length > 0 ? hidePlaceHolder() : showPlaceHolder()),
    () => "value"
  );

  errorLog.subscribe((errorList) => {
    showError(getErrorMessageFor(config.name, errorList));
  });

  function showError(message) {
    if (!!message) {
      hidePlaceHolder();
      errorMessage.textContent = message;
      container.dataset.icon = "error";
    }
  }

  function hideError() {
    container.dataset.icon = "";
  }

  function getErrorMessageFor(fieldName, errorList) {
    let message = "";
    for (const error of errorList) {
      if (error.name === fieldName) {
        message = error.description;
      }
    }
    return message;
  }

  function showPlaceHolder() {
    placeHolderVisible = true;
    container.appendChild(placeHolder);
  }

  function hidePlaceHolder() {
    placeHolderVisible && container.removeChild(placeHolder);
    placeHolderVisible = false;
  }

  return { inputGroup, field };
}

function configureElement(element, attributes, textContent) {
  for (const attr in attributes) {
    element.setAttribute(attr, attributes[attr]);
  }
  if (textContent !== undefined) {
    element.textContent = textContent;
  }
}
