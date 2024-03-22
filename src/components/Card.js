class Card {
  constructor(
    cardData,
    cardElement,
    handlePreviewPicture,
    handleDeleteCardClick,
    handleLikeButtonClick
  ) {
    this._name = cardData.name;
    this._link = cardData.link;

    this._isLiked = cardData._isLiked;
    this._id = cardData._id;

    this._handlePreviewPicture = handlePreviewPicture;
    this._handleDeleteCardClick = handleDeleteCardClick;
    this._handleLikeButtonClick = handleLikeButtonClick;

    this._cardElement = cardElement;
  }

  _setEventListeners() {
    this._deleteButton.addEventListener("click", () =>
      this._handleDeleteCardClick(this)
    );

    this._cardImage.addEventListener("click", () =>
      this._handlePreviewPicture({ name: this._name, link: this._link })
    );

    this._likeButton.addEventListener("click", () =>
      this._handleLikeButtonClick(this)
    );
  }

  handleLikeIcon = () => {
    this._likeButton.classList.toggle("card__like-button_active");
  };

  isLiked() {
    return this._isLiked;
  }

  renderLike() {
    if (this._isLiked) {
      this._likeButton.classList.add("card__like-button_active");
    } else {
      this._likeButton.classList.remove("card__like-button_active");
    }
  }

  handleDeleteCard = () => {
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
    this.renderLike();
    return this._element;
  }
}

export default Card;
