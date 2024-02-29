// ! ||--------------------------------------------------------------------------------||
// ! ||                                    TEMP CODE                                   ||
// ! ||--------------------------------------------------------------------------------||

const previewImageModalWindow = document.querySelector("#previewImage-modal");
const previewImageElement = document.querySelector(".modal__preview-image");
const previewImageTitle = document.querySelector(".modal__image-title");

function closePopup() {
  const openedModal = document.querySelector(".modal_opened");
  if (openedModal) {
    openedModal.classList.remove("modal_opened");
    document.removeEventListener("keyup", handleEscUp);
  }
}

function openPopup(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keyup", handleEscUp);
}

function handleEscUp(event) {
  event.preventDefault();
  isEscEvent(event, closePopup);
}

function isEscEvent(event, action) {
  if (event.key === "Escape") {
    action();
  }
}

// ! ||--------------------------------------------------------------------------------||
// ! ||                                       --                                       ||
// ! ||--------------------------------------------------------------------------------||

class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;

    this._cardSelector = cardSelector;
  }

  _setEventListeners() {
    // this._element
    //   .querySelector(".card__delete-button")
    //   .addEventListener("click", () => this._handleDeleteCard());

    // this._element
    //   .querySelector(".card__image")
    //   .addEventListener("click", () => this._handlePreviewPicture());
    this._likeButton.addEventListener("click", () => this._handleLikeIcon());
  }

  _handleLikeIcon() {
    console.log(this._likeButton.classList);
    this._likeButton.classList.toggle("card__like-button_active");
  }

  _handleDeleteCard() {
    console.log(this._element);
    this._element.querySelector(".card__delete-button");
    this._element.remove();
  }

  _handlePreviewPicture() {
    previewImageElement.src = this._link;
    previewImageElement.alt = this._name;
    previewImageTitle.textContent = this._name;
    openPopup(previewImageModalWindow);
  }

  _getTemplate() {
    const cardElement = this._cardSelector.content
      .querySelector(".card")
      .cloneNode(true);
    return cardElement;
  }

  getView() {
    this._element = this._getTemplate();
    this._likeButton = this._element.querySelector(".card__like-button");
    const cardImageEl = this._element.querySelector(".card__image");
    const cardTitleEl = this._element.querySelector(".card__title");
    cardImageEl.src = this._link;
    cardImageEl.alt = this._name;
    cardTitleEl.textContent = this._name;
    this._setEventListeners();
    return this._element;
  }
}

export default Card;
