import checkForm from "./js/checkForm.mjs";
import createErrorLog from "./js/errorLog.mjs";
import createField from "./js/field.mjs";

const errorLog = createErrorLog({ initialList: [] });
errorLog.subscribe((errorList) => console.log(errorList));

const form = document.querySelector("form");
const submitButton = form.querySelector("button");
const inputGroupTemplate = document.querySelector("#input-group");

submitButton.addEventListener("click", (e) => {
  e.preventDefault();
  checkForm({
    formFields: [
      firstName.model.getState(),
      lastName.model.getState(),
      email.model.getState(),
      password.model.getState(),
    ],
    onFailure: errorLog.setErrorList,
  });
});

const firstName = {
  name: "firstName",
  nameToShow: "First Name",
  type: "text",

  model: createField({
    initialState: {
      value: "",
      name: "First Name",
      formatHaveToBeChecked: false,
    },
  }),
};

const lastName = {
  name: "lastName",
  nameToShow: "Last Name",
  type: "text",
  required: true,
  pattern: "w{1,16}",
  model: createField({
    initialState: {
      value: "",
      name: "Last Name",
      formatHaveToBeChecked: false,
    },
  }),
};

const email = {
  name: "emailAddres",
  nameToShow: "Email Address",
  type: "email",
  required: true,
  pattern: "w{1,16}",
  model: createField({
    initialState: {
      value: "",
      name: "Email Address",
      formatHaveToBeChecked: false,
    },
  }),
};

const password = {
  name: "password",
  nameToShow: "Password",
  type: "password",
  required: true,
  pattern: "w{1,16}",
  model: createField({
    initialState: {
      value: "",
      name: "Password",
      formatHaveToBeChecked: false,
    },
  }),
};

insertInput([firstName, lastName, email, password]);

function insertInput(inputs) {
  for (let i = inputs.length - 1; i >= 0; i--) {
    form.insertBefore(
      createInputGroup(inputGroupTemplate, inputs[i]),
      form.firstChild
    );
  }
}

function createInputGroup(template, config) {
  const inputGroup = template.content.cloneNode(true);
  const container = inputGroup.querySelector("div");
  const errorMessage = inputGroup.querySelector("em");

  const placeHolder = inputGroup.querySelector("label");
  configureElement(placeHolder, { for: config.name }, config.nameToShow);
  let placeHolderVisible = true;

  const input = inputGroup.querySelector("input");
  configureElement(input, {
    type: config.type,
    name: config.name,
    id: config.name,
    required: config.required,
    pattern: config.pattern,
  });

  if (config.model !== undefined) {
    input.addEventListener("keyup", () => {
      config.model.setProp(input.value, () => "value");
    });
    config.model.subscribe(
      (value) => {
        if (placeHolderVisible && value.length > 0) {
          placeHolderVisible = false;
          container.removeChild(placeHolder);
        } else if (!placeHolderVisible && value.length === 0) {
          placeHolderVisible = true;
          container.appendChild(placeHolder);
        }
      },
      () => "value"
    );
  }

  errorLog.subscribe((errorList) => {
    let description = false;
    for (const error of errorList) {
      if (error.name === config.nameToShow) {
        description = error.description;
      }
    }
    if (!!description) {
      if (placeHolderVisible) {
        container.removeChild(placeHolder);
        placeHolderVisible = false;
      }
      errorMessage.textContent = description;
      container.dataset.icon = "error";
    } else {
      container.dataset.icon = "";
    }
  });

  return inputGroup;
}

function configureElement(element, attributes, textContent) {
  for (const attr in attributes) {
    element.setAttribute(attr, attributes[attr]);
  }
  if (textContent !== undefined) {
    element.textContent = textContent;
  }
}
