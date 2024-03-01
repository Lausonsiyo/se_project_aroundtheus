class Card {
  constructor(data, cardSelector, handlePreviewPicture) {
    this._name = data.name;
    this._link = data.link;

    this._cardSelector = cardSelector;
    this._handlePreviewPicture = handlePreviewPicture;
  }

  _setEventListeners() {
    this._deleteButton.addEventListener("click", this._handleDeleteCard);

    this._element
      .querySelector(".card__image")
      .addEventListener("click", () => this._handlePreviewPicture(this));

    this._likeButton.addEventListener("click", this._handleLikeIcon);
  }

  _handleLikeIcon = () => {
    this._likeButton.classList.toggle("card__like-button_active");
  };

  _handleDeleteCard = () => {
    this._element.remove();
    this._element = null;
  };

  _getTemplate() {
    return this._cardSelector.content.querySelector(".card").cloneNode(true);
  }

  getView() {
    this._element = this._getTemplate();
    this._likeButton = this._element.querySelector(".card__like-button");
    this._deleteButton = this._element.querySelector(".card__delete-button");
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
