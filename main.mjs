import createField from "./js/field.mjs";

const form = document.querySelector("form");
const inputGroupTemplate = document.querySelector("#input-group");

const firstName = {
  name: "firstName",
  nameToShow: "First Name",
  type: "text",
  required: "",
  pattern: "w{1,4}",
  model: createField({ initialState: { value: "" } }),
};

const lastName = {
  name: "lastName",
  nameToShow: "Last Name",
  type: "text",
  required: true,
  pattern: "w{1,16}",
};

const email = {
  name: "emailAddres",
  nameToShow: "Email Address",
  type: "email",
  required: true,
  pattern: "w{1,16}",
};

const password = {
  name: "password",
  nameToShow: "Password",
  type: "password",
  required: true,
  pattern: "w{1,16}",
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
    input.addEventListener("keyup", () =>
      config.model.setProp(input.value, () => "value")
    );
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
