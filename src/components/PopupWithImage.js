import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
    this._popupImageElement = this._popupElement.querySelector(
      ".popup__preview-image"
    );
    this._popupImageTitle = this._popupElement.querySelector(
      ".popup__image-title"
    );
  }

  open({ name, link }) {
    this._popupImageElement.alt = name;
    this._popupImageElement.src = link;
    this._popupImageTitle.textContent = name;
    super.open();
  }
}
