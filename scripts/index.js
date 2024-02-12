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
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

// ! ||--------------------------------------------------------------------------------||
// ! ||                                   FUNCTIONS;                                   ||
// ! ||--------------------------------------------------------------------------------||
function closePopup(modal) {
  modal.classList.remove("modal_opened");
}

function openPopup(modal) {
  modal.classList.add("modal_opened");
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

function renderCard(cardData, element) {
  const cardElement = getCardElement(cardData);
  element.prepend(cardElement);
}

// ! ||--------------------------------------------------------------------------------||
// ! ||                                 EVENT HANDLERS                                 ||
// ! ||--------------------------------------------------------------------------------||
function handlerProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopup(profileEditModal);
}
function handlerAddNewCardSubmit(e) {
  e.preventDefault();
  const name = addNewCardTitleInput.value;
  const link = addNewCardLinkInput.value;
  renderCard({ name, link }, cardListEl);
  closePopup(addNewCardModal);
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
profileEditCloseBtn.addEventListener("click", () =>
  closePopup(profileEditModal)
);
profileEditForm.addEventListener("submit", handlerProfileEditSubmit);

// ADD NEW CARD
addNewCardForm.addEventListener("submit", handlerAddNewCardSubmit);
addNewCardBtn.addEventListener("click", () => {
  addNewCardLinkInput.value = "";
  addNewCardTitleInput.value = "";
  openPopup(addNewCardModal);
});

addNewCardCloseBtn.addEventListener("click", () => closePopup(addNewCardModal));

// PREVIEW MODAL

previewImageCloseBtn.addEventListener("click", () =>
  closePopup(previewImageModalWindow)
);

// ! ||--------------------------------------------------------------------------------||
// ! ||                                      LOOP;                                     ||
// ! ||--------------------------------------------------------------------------------||

initialCards.forEach((cardData) => renderCard(cardData, cardListEl));
