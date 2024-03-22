import Popup from "./Popup.js";

export default class DeleteConfirmation extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".popup__form");
    this._submitButton = this._popupForm.querySelector(
      "#delete-confirm-button"
    );
  }

  setDeleteLoading(loading) {
    if (loading) {
      this._submitButton.textContent = "Deleting";
    } else {
      this._submitButton.textContent = "YES";
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
