import FormValidator from "../components/FormValidation.js";
import Card from "../components/Card.js";

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

// ! ||--------------------------------------------------------------------------------||
// ! ||                                    ELEMENTS                                    ||
// ! ||--------------------------------------------------------------------------------||

const profileEditBtn = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileEditCloseBtn = document.querySelector("#edit-close-button");

const previewImageModalWindow = document.querySelector("#previewImage-modal");
const previewImageElement = document.querySelector(".modal__preview-image");
const previewImageCloseBtn = document.querySelector(
  "#previewImage-close-button"
);
const previewImageTitle = document.querySelector(".modal__image-title");

const addNewCardBtn = document.querySelector("#add-newCard-button");
const addNewCardModal = document.querySelector("#add-NewCard-modal");
const addNewCardCloseBtn = document.querySelector("#addNewCard-close-button");
const newCardTitleInput = document.querySelector("#new-image-title-input");
const newCardLinkInput = document.querySelector("#new-image-link-input");

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const addNewCardTitleInput = document.querySelector("#new-image-title-input");
const addNewCardLinkInput = document.querySelector("#new-image-link-input");

const profileEditForm = document.forms["profile-edit-form"];
const addNewCardForm = document.forms["new-card-modal"];
const cardListEl = document.querySelector(".cards__list");
const cardTemplate = document.querySelector("#card-template");

// ! ||--------------------------------------------------------------------------------||
// ! ||                                   FUNCTIONS;                                   ||
// ! ||--------------------------------------------------------------------------------||

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

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__title");

  const likeButton = cardElement.querySelector(".card__like-button");
  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });

  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  cardImageEl.addEventListener("click", function () {
    previewImageElement.src = cardData.link;
    previewImageElement.alt = cardData.name;
    previewImageTitle.textContent = cardData.name;
    openPopup(previewImageModalWindow);
  });

  cardImageEl.src = cardData.link;
  cardImageEl.alt = cardData.name;
  cardTitleEl.textContent = cardData.name;
  return cardElement;
}

function isEscEvent(event, action) {
  if (event.key === "Escape") {
    action();
  }
}

// ! ||--------------------------------------------------------------------------------||
// ! ||                                 EVENT HANDLERS                                 ||
// ! ||--------------------------------------------------------------------------------||
function handleProfileEditSubmit(event) {
  event.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopup();
}

function handleAddNewCardSubmit(event) {
  event.preventDefault();
  const name = addNewCardTitleInput.value;
  const link = addNewCardLinkInput.value;
  renderCard({ name, link }, cardListEl);
  event.target.reset();
  closePopup();
}

function handleEscUp(event) {
  event.preventDefault();
  isEscEvent(event, closePopup);
}
// ! ||--------------------------------------------------------------------------------||
// ! ||                                 EVENT LISTENERS                                ||
// ! ||--------------------------------------------------------------------------------||

// PROFILE EDIT

profileEditBtn.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openPopup(profileEditModal);
});
profileEditForm.addEventListener("submit", handleProfileEditSubmit);

// ADD NEW CARD
addNewCardForm.addEventListener("submit", handleAddNewCardSubmit);
addNewCardBtn.addEventListener("click", () => {
  openPopup(addNewCardModal);
});

// CLOSING MODAL

const modals = document.querySelectorAll(".modal");

modals.forEach((modal) => {
  modal.addEventListener("mousedown", (event) => {
    if (event.target.classList.contains("modal_opened")) {
      closePopup();
    }
    if (event.target.classList.contains("modal__close")) {
      closePopup();
    }
  });
});

// ! ||--------------------------------------------------------------------------------||
// ! ||                                      LOOP;                                     ||
// ! ||--------------------------------------------------------------------------------||

initialCards.forEach((cardData) => renderCard(cardData, cardListEl));

// ! ||--------------------------------------------------------------------------------||
// ! ||                                   VALIDATION;                                  ||
// ! ||--------------------------------------------------------------------------------||

const validationSettings = {
  inputSelector: ".modal__form-input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__form-input_type_error",
  errorClass: "modal__error_visible",
};

const editFormElement = profileEditModal.querySelector(".modal__form");
const addFormElement = addNewCardModal.querySelector(".modal__form");

const editFormValidator = new FormValidator(
  validationSettings,
  editFormElement
);

const addFormValidator = new FormValidator(validationSettings, addFormElement);

editFormValidator.enableValidation();
addFormValidator.enableValidation();

function renderCard(cardData, element) {
  // const cardElement = getCardElement(cardData);
  // console.log(cardData);
  const card = new Card(cardData, cardTemplate);
  element.prepend(card.getView());
  return card.getView();
}
