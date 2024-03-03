class Card {
  constructor(cardData, cardElement, handlePreviewPicture) {
    this._name = cardData.name;
    this._link = cardData.link;

    this._cardElement = cardElement;
    this._handlePreviewPicture = handlePreviewPicture;
  }

  _setEventListeners() {
    this._deleteButton.addEventListener("click", this._handleDeleteCard);

    this._cardImage.addEventListener("click", () =>
      this._handlePreviewPicture({ name: this._name, link: this._link })
    );

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
    return this._cardElement.content.querySelector(".card").cloneNode(true);
  }

  getView() {
    this._element = this._getTemplate();
    this._likeButton = this._element.querySelector(".card__like-button");
    this._deleteButton = this._element.querySelector(".card__delete-button");
    this._cardImage = this._element.querySelector(".card__image");
    this._element.querySelector(".card__title").textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._setEventListeners();
    return this._element;
  }
}

export default Card;
