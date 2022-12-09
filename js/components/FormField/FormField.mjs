export default class FormField extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const shadow = this.attachShadow({ mode: "open" });

    let fieldName = this.getAttribute("fieldName");
    let fieldType = this.getAttribute("fieldType");

    const reset = () => ({
      type: "link",
      attributes: {
        rel: "stylesheet",
        href: "./css/reset.css",
      },
    });

    const general = () => ({
      type: "link",
      attributes: {
        rel: "stylesheet",
        href: "./css/general.css",
      },
    });

    const utilities = () => ({
      type: "link",
      attributes: {
        rel: "stylesheet",
        href: "./css/utilities.css",
      },
    });

    const style = () => ({
      type: "link",
      attributes: {
        rel: "stylesheet",
        href: "./js/components/FormField//style.css",
      },
    });

    const styles = [reset, general, utilities, style];

    const placeholder = () => ({
      element: {
        type: "label",
        attributes: {
          className: "signup__placeholder",
          htmlFor: fieldName,
        },
      },
      children: this.getAttribute("placeholderText"),
    });

    const input = () => ({
      element: {
        type: "input",
        attributes: {
          className: "signup__input",
          type: fieldType,
          name: fieldName,
          id: fieldName,
        },
      },
    });

    const em = () => ({
      element: { type: "em" },
      children: this.getAttribute("fieldHelpText"),
    });
    const helpParagraph = () => ({
      element: {
        type: "p",
        attributes: {
          className: "signup__help-text",
        },
      },
      children: [em()],
    });

    const field = () => ({
      element: {
        type: "div",
        attributes: {
          className: "signup__field grid",
        },
      },
      children: [placeholder(), input(), helpParagraph()],
    });

    this.createStyleSheets(styles, shadow);
    this.render(field(), shadow);
  }

  createStyleSheets(styles, shadow) {
    styles.forEach((style) => {
      shadow.appendChild(this.createElement(style()));
    });
  }

  render(tree, root) {
    if (typeof tree === "string") {
      root.appendChild(this.createElement(tree));
    } else {
      const { element, children } = tree;
      const el = this.createElement(element);
      if (typeof children === "string") {
        this.render(children, el);
      } else {
        children?.forEach((chield) => this.render(chield, el));
      }
      root.appendChild(el);
    }
  }

  createElement(toCreate) {
    let element;
    if (typeof toCreate === "string") {
      element = document.createTextNode(toCreate);
    } else {
      const { type, attributes } = toCreate;
      element = document.createElement(type);
      for (const attribute in attributes) {
        this.setAttribute(element, attribute, attributes[attribute]);
      }
    }
    return element;
  }

  setAttribute(element, attribute, value) {
    if (this.noEmpty(value)) {
      const attr = this.parseAttribute(attribute, {
        className: "class",
        htmlFor: "for",
      });
      element.setAttribute(attr, value);
    }
  }

  parseAttribute(attribute, queryList) {
    if (queryList[attribute] !== undefined) {
      return queryList[attribute];
    } else {
      return attribute;
    }
  }

  noEmpty(value) {
    return value !== undefined && value !== null && value !== "";
  }
}

customElements.define("form-field", FormField);
