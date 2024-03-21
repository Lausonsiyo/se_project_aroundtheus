import FormValidator from "../components/FormValidation.js";
import Card from "../components/Card.js";
import "../pages/index.css";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
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

//RENDER CARD FUNCTION

function createCard(item) {
  const card = new Card(item, cardTemplate, handlePreviewPicture);
  return card.getView();
}
// ! ||--------------------------------------------------------------------------------||
// ! ||                                 EVENT HANDLERS                                 ||
// ! ||--------------------------------------------------------------------------------||

// PROFILE EDIT HANDLER

// function handleProfileEditSubmit(data) {
//   userInfo.setUserInfo(data);
//   editProfilePopupForm.close();
// }

function handleProfileEditSubmit({ name, description }) {
  editProfilePopupForm.setLoading(true);
  api
    .updateUserInfo({ name, description })
    .then((res) => {
      userInfo.setUserInfo(res);
      editProfilePopupForm.close();
    })
    .catch((err) => {
      alert(`Error! ${err}`);
    })
    .finally(() => editProfilePopupForm.setLoading(false));
}

// function handleProfileEditSubmit(data) {
//   editProfilePopupForm.setLoading(true);
//   api.updateUserInfo(data).then(console.log(res));
// }

// ADD NEW CARD HANDLER

// function handleAddNewCardSubmit(data) {
//   sectionCard.addItem(createCard({ name: data.title, link: data.link }));
//   addNewCardPopupForm.close();
// }

function handleAddNewCardSubmit(data) {
  addNewCardPopupForm.setLoading(true);
  api
    .addCard(data)
    .then((card) => {
      sectionCard.addItem(card);
      addNewCardPopupForm.close();
    })
    .catch((err) => {
      alert(`Error! ${err}`);
    })
    .finally(() => editProfilePopupForm.setLoading(false));
}

// PREVIEW PICTURE HANDLER

function handlePreviewPicture(card) {
  previewImagePopup.open(card);
}

// ! ||--------------------------------------------------------------------------------||
// ! ||                                 EVENT LISTENERS                                ||
// ! ||--------------------------------------------------------------------------------||

// PROFILE EDIT LISTENER

profileEditBtn.addEventListener("click", () => {
  const userInformation = userInfo.getUserInfo();
  profileTitleInput.value = userInformation.userName;
  profileDescriptionInput.value = userInformation.userDescription;
  formValidators["profile-edit-form"].resetValidation();
  editProfilePopupForm.open();
});

// ADD NEW CARD LISTENER

addNewCardBtn.addEventListener("click", () => {
  formValidators["new-card-form"].resetValidation();
  addNewCardPopupForm.open();
});

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
  // avatarSelector:
});

// ! ||--------------------------------------------------------------------------------||
// ! ||                                      API'S                                     ||
// ! ||--------------------------------------------------------------------------------||

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "4ddc62a6-2321-4363-b6de-23e72ad66920",
    "Content-Type": "application/json",
  },
});

api
  .getInitialCards()
  .then((cards) => {
    sectionCard.setItems(cards);
    sectionCard.renderItems();
  })
  .catch((err) => {
    alert(`Error! ${err}`);
  });

api
  .getUserInfo()
  .then((info) => {
    userInfo.setUserInfo({
      userName: info.name,
      userDescription: info.about,
    });
    userInfo.setAvatar(info.avatar);
  })
  .catch((err) => {
    alert(`Error! ${err}`);
  });
