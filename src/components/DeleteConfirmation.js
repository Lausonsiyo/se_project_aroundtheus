import Popup from "./Popup.js";

export default class DeleteConfirmation extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".popup__form");
    this._submitButton = this._popupForm.querySelector(".popup__button");
  }

  // setDeleteLoading(loading) {
  //   if (loading) {
  //     this._submitButton.textContent = "Deleting";
  //   } else {
  //     this._submitButton.textContent = "YES";
  //   }
  // }
  renderLoading(isLoading, loadingText = "Deleting...") {
    if (isLoading) {
      this._submitButton.textContent = loadingText;
    } else {
      this._submitButton.textContent = this._submitbuttonText;
    }
  }

  setDeleteConfirm(handler) {
    this._handleDeleteSubmit = handler;
  }

  setEventListeners() {
    this._popupForm.addEventListener("submit", (event) => {
      event.preventDefault();
      this._handleDeleteSubmit();
    });
    super.setEventListeners();
  }
}
