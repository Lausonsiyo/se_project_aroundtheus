export const initialCards = [];

export const validationSettings = {
  inputSelector: ".popup__form-input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__form-input_type_error",
  errorClass: "popup__error_visible",
  formSelector: ".popup__form",
};

export const addNewCardpopup = document.querySelector("#add-NewCard-popup");
export const addNewCardBtn = document.querySelector("#add-newCard-button");
export const addNewCardTitleInput = document.querySelector(
  "#new-image-title-input"
);
export const addNewCardLinkInput = document.querySelector(
  "#new-image-link-input"
);

export const profileTitleInput = document.querySelector("#profile-title-input");
export const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
export const profileEditBtn = document.querySelector("#profile-edit-button");
export const profileEditpopup = document.querySelector("#profile-edit-popup");
export const profileTitle = document.querySelector(".profile__title");
export const profileDescription = document.querySelector(
  ".profile__description"
);
export const avatarEditpencil = document.querySelector("#edit-avatar-image");
export const userAvatarImage = document.querySelector(".profile__image");

export const cardListEl = document.querySelector(".cards__list");

export const previewImagepopupWindow = document.querySelector(
  "#previewImage-popup"
);
export const previewImageElement = document.querySelector(
  ".popup__preview-image"
);
export const previewImageTitle = document.querySelector(".popup__image-title");

export const profileEditForm = document.forms["profile-edit-form"];
export const addNewCardForm = document.forms["new-card-form"];

export const cardTemplate = document.querySelector("#card-template");
