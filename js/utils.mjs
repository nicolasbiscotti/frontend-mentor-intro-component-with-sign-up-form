export function configureElement(element, attributes, textContent) {
  for (const attr in attributes) {
    element.setAttribute(attr, attributes[attr]);
  }
  if (textContent !== undefined) {
    element.textContent = textContent;
  }
}
