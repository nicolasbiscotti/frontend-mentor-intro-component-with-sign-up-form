// formFields is 'payload'
// onSuccess and onFailure are actions to be performed
export default function ({ formFields, onSuccess, onFailure }) {
  const errorList = [];
  for (const field of formFields) {
    if (isAnEmptyField(field)) {
      errorList.push(emptyErrorOf(field));
    } else if (hasAnInvalidFormat(field)) {
      errorList.push(formatErrorOf(field));
    }
  }
  if (errorList.length === 0) {
    onSuccess(formFields);
  } else {
    onFailure(errorList);
  }
}

function isAnEmptyField(field) {
  return field.value === "";
}

function hasAnInvalidFormat(field) {
  return field.formatHaveToBeChecked && !field.isValidFormat(field.value);
}

function emptyErrorOf(field) {
  return {
    name: field.name,
    description: "cannot be empty",
  };
}
function formatErrorOf(field) {
  const { name } = field;
  return {
    name,
    description: `Looks like this is not an ${name.toLowerCase()}`,
  };
}
