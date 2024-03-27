import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });

    this._popupForm = this._popupElement.querySelector(".popup__form");
    this._inputList = this._popupForm.querySelectorAll(".popup__form-input");
    this._submitButton = this._popupForm.querySelector(".popup__button");
    this._submitButtonText = this._submitButton.textContent;
    this._handleFormSubmit = handleFormSubmit;
  }

  close() {
    this._popupForm.reset();
    super.close();
  }

  setInputValues(data) {
    this._inputList.forEach((input) => (input.value = [input.name]));
  }

  setEventListeners() {
    this._popupForm.addEventListener("submit", (event) => {
      event.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
    super.setEventListeners();
  }

  renderLoading(isLoading, loadingText = "Saving...") {
    if (isLoading) {
      this._submitButton.textContent = loadingText;
    } else {
      this._submitButton.textContent = this._submitButtonText;
    }
  }

  _getInputValues() {
    const inputValues = {};
    this._inputList.forEach((input) => {
      inputValues[input.name] = input.value;
    });
    return inputValues;
  }
}
