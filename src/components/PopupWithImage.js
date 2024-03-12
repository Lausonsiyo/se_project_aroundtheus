import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  open({ name, link }) {
    this._popupElement.querySelector(".popup__image-title").textContent = name;
    const image = this._popupElement.querySelector(".popup__preview-image");
    image.src = link;
    image.alt = name;
    super.open();
  }
}
