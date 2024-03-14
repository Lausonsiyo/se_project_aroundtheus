import FormValidator from "../components/FormValidation.js";
import Card from "../components/Card.js";
import "../pages/index.css";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import {
  initialCards,
  validationSettings,
  addNewCardpopup,
  addNewCardBtn,
  addNewCardTitleInput,
  addNewCardLinkInput,
  profileTitleInput,
  profileDescriptionInput,
  profileEditBtn,
  profileEditpopup,
  profileTitle,
  profileDescription,
  cardListEl,
  previewImagepopupWindow,
  previewImageElement,
  previewImageTitle,
  profileEditForm,
  addNewCardForm,
  cardTemplate,
} from "../utils/constants.js";
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
// function handleProfileEditSubmit(event) {
//   event.preventDefault();
//   profileTitle.textContent = profileTitleInput.value;
//   profileDescription.textContent = profileDescriptionInput.value;
//   closePopup();
// }

function handleProfileEditSubmit(inputValues) {
  userInfo.setUserInfo(inputValues);
  formValidators["profile-edit-form"].resetValidation();
  editProfilePopupForm.close();
}

function handleAddNewCardSubmit(data) {
  sectionCard.addItem(createCard({ title: data.title, link: data.link }));
  addNewCardPopupForm.close();
  formValidators["new-card-form"].resetValidation();
}

function handlePreviewPicture(card) {
  previewImagePopup.open(card);
}
// function handleAddNewCardSubmit(event) {
//   const name = addNewCardTitleInput.value;
//   const link = addNewCardLinkInput.value;
//   renderCard({ name, link }, cardListEl);
//   addNewCardPopupForm.close();
//   formValidators["new-card-form"].resetValidation();
// }

// function handlePreviewPicture(cardData) {
//   previewImageElement.src = cardData.link;
//   previewImageElement.alt = cardData.name;
//   previewImageTitle.textContent = cardData.name;
//   openPopup(previewImagepopupWindow);
// }

// function handleEscUp(event) {
//   event.preventDefault();
//   isEscEvent(event, closePopup);
// }

// ! ||--------------------------------------------------------------------------------||
// ! ||                                 EVENT LISTENERS                                ||
// ! ||--------------------------------------------------------------------------------||

// PROFILE EDIT

// profileEditBtn.addEventListener("click", () => {
//   profileTitleInput.value = profileTitle.textContent;
//   profileDescriptionInput.value = profileDescription.textContent;
//   openPopup(profileEditpopup);
// });
// profileEditForm.addEventListener("submit", handleProfileEditSubmit);

profileEditBtn.addEventListener("click", () => {
  const userInformation = userInfo.getUserInfo();
  profileTitleInput.value = userInformation.userName;
  profileDescriptionInput.value = userInformation.userDescription;
  editProfilePopupForm.open();
});

// ADD NEW CARD
// addNewCardForm.addEventListener("submit", handleAddNewCardSubmit);
addNewCardBtn.addEventListener("click", () => {
  addNewCardPopupForm.open();
});
// addNewCardBtn.addEventListener("click", () => {
//   openPopup(addNewCardpopup);
// });

// CLOSING popup

// const popups = document.querySelectorAll(".popup");

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

// initialCards.forEach((cardData) => renderCard(cardData, cardListEl));

//RENDER CARD FUNCTION

function createCard(item) {
  const card = new Card(item, cardTemplate, handlePreviewPicture);
  return card.getView();
}

// function renderCard(item, cardList, method = "prepend") {
//   const cardElement = createCard(item);
//   cardList[method](cardElement);
// }

// ! ||--------------------------------------------------------------------------------||
// ! ||                                   VALIDATION;                                  ||
// ! ||--------------------------------------------------------------------------------||

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

// ! ||--------------------------------------------------------------------------------||
// ! ||                             INSTANCE SECTION CLASS                             ||
// ! ||--------------------------------------------------------------------------------||

const sectionCard = new Section(
  {
    items: initialCards,
    renderer: (cardData) => sectionCard.addItem(createCard(cardData)),
  },
  ".cards__list"
);

sectionCard.renderItems();

// ! ||--------------------------------------------------------------------------------||
// ! ||                               INTANCE PUPUP WITH                               ||
// ! ||--------------------------------------------------------------------------------||

const addNewCardPopupForm = new PopupWithForm(
  "#add-NewCard-popup",
  handleAddNewCardSubmit
);
addNewCardPopupForm.setEventListeners();

const editProfilePopupForm = new PopupWithForm(
  "#profile-edit-popup",
  handleProfileEditSubmit
);
editProfilePopupForm.setEventListeners();

const previewImagePopup = new PopupWithImage("#previewImage-popup");
previewImagePopup.setEventListeners();

// ! ||--------------------------------------------------------------------------------||
// ! ||                               INSTANCE USER INFO                               ||
// ! ||--------------------------------------------------------------------------------||

const userInfo = new UserInfo({
  userNameSelector: profileTitle,
  userDescriptionSelector: profileDescription,
});
