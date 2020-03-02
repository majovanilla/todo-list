const shared = () => {
  function clearInput(domElement) {
    domElement.value = '';
  }

  function generateID(array) {
    let ID;
    if (array.length > 0) {
      ID = array[array.length - 1].id + 1;
    } else if (array.length === 0) {
      ID = 0;
    }
    return ID;
  }

  function validateInput(element) {
    if (element.value === '') {
      return false;
    }
    return true;
  }

  return { clearInput, generateID, validateInput };
};

export { shared as default };