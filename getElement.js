const getElement = (selector) => {
  const el = document.querySelector(selector);
  if (el) {
    return el;
  } else {
    throw new Error(`Cannot find the element ${selector}`);
  }
};

export default getElement;
