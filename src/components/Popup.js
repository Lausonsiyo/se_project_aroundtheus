export default class Popup {
  constructor({ popupSelector }) {
    this._popupElement = document.querySelector(popupSelector);
  }

  _handleEscClose(event) {
    if (event.key === "Escape") {
      this.close();
    }
  }

  open() {
    this._popupElement.classList.add("popup_opened");
    document.addEventListener("keyup", this._handleEscClose);
  }

  close() {
    this._popupElement.classList.remove("popup_opened");
    document.removeEventListener("keyup", this._handleEscClose);
  }

  setEventListeners() {
    this._popupElement.addEventListener("mousedown", (event) => {
      if (event.target.classList.contains("popup_opened")) {
        this.close();
      }
      if (event.target.classList.contains("popup_close")) {
        this.close();
      }
    });
  }
}
