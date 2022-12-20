import createField from "./field.mjs";
import { configureElement } from "./utils.mjs";

export function createInputGroup(template, config, errorLog) {
  const inputGroup = template.content.cloneNode(true);
  const container = inputGroup.querySelector("div");
  const errorMessage = inputGroup.querySelector("em");

  const field = createField({ initialState: config });

  const placeHolder = inputGroup.querySelector("label");
  let placeHolderVisible = true;
  configureElement(placeHolder, { for: config.name }, config.placeHolder);

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
