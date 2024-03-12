import FormValidator from "../components/FormValidation.js";
import Card from "../components/Card.js";
import "../pages/index.css";

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
const profileEditpopup = document.querySelector("#profile-edit-popup");

const previewImagepopupWindow = document.querySelector("#previewImage-popup");
const previewImageElement = document.querySelector(".popup__preview-image");

const previewImageTitle = document.querySelector(".popup__image-title");

const addNewCardBtn = document.querySelector("#add-newCard-button");
const addNewCardpopup = document.querySelector("#add-NewCard-popup");

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const addNewCardTitleInput = document.querySelector("#new-image-title-input");
const addNewCardLinkInput = document.querySelector("#new-image-link-input");

const profileEditForm = document.forms["profile-edit-form"];
const addNewCardForm = document.forms["new-card-form"];
const cardListEl = document.querySelector(".cards__list");
const cardTemplate = document.querySelector("#card-template");

// ! ||--------------------------------------------------------------------------------||
// ! ||                                   FUNCTIONS;                                   ||
// ! ||--------------------------------------------------------------------------------||

// function closePopup() {
//   const openedpopup = document.querySelector(".popup_opened");
//   if (openedpopup) {
//     openedpopup.classList.remove("popup_opened");
//     document.removeEventListener("keyup", handleEscUp);
//   }
// }

// function openPopup(popup) {
//   popup.classList.add("popup_opened");
//   document.addEventListener("keyup", handleEscUp);
// }

// function isEscEvent(event, action) {
//   if (event.key === "Escape") {
//     action();
//   }
// }

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
  formValidators["new-card-form"].resetValidation();
}

function handlePreviewPicture(cardData) {
  previewImageElement.src = cardData.link;
  previewImageElement.alt = cardData.name;
  previewImageTitle.textContent = cardData.name;
  openPopup(previewImagepopupWindow);
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
  openPopup(profileEditpopup);
});
profileEditForm.addEventListener("submit", handleProfileEditSubmit);

// ADD NEW CARD
addNewCardForm.addEventListener("submit", handleAddNewCardSubmit);
addNewCardBtn.addEventListener("click", () => {
  openPopup(addNewCardpopup);
});

// CLOSING popup

const popups = document.querySelectorAll(".popup");

// popups.forEach((popup) => {
//   popup.addEventListener("mousedown", (event) => {
//     if (event.target.classList.contains("popup_opened")) {
//       closePopup();
//     }
//     if (event.target.classList.contains("popup__close")) {
//       closePopup();
//     }
//   });
// });

// ! ||--------------------------------------------------------------------------------||
// ! ||                                      LOOP;                                     ||
// ! ||--------------------------------------------------------------------------------||

initialCards.forEach((cardData) => renderCard(cardData, cardListEl));

// ! ||--------------------------------------------------------------------------------||
// ! ||                                   VALIDATION;                                  ||
// ! ||--------------------------------------------------------------------------------||

const validationSettings = {
  inputSelector: ".popup__form-input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__form-input_type_error",
  errorClass: "popup__error_visible",
  formSelector: ".popup__form",
};

//CARD

function createCard(item) {
  const card = new Card(item, cardTemplate, handlePreviewPicture);
  return card.getView();
}

function renderCard(item, cardList, method = "prepend") {
  const cardElement = createCard(item);
  cardList[method](cardElement);
}

const formValidators = {};

const enableValidation = (settings) => {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));

  formList.forEach((formElement) => {
    const validator = new FormValidator(settings, formElement);
    const formName = formElement.getAttribute("name");
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(validationSettings);
