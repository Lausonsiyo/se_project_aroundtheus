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
function closePopup() {
  document.querySelector(".modal_opened").classList.remove("modal_opened");
  document.removeEventListener("keyup", handlerEscUp);
}

function openPopup(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keyup", handlerEscUp);
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

function isEscEvent(e, action) {
  const activeModal = document.querySelector("modal__opened");
  if (e.key === "Escape") {
    action(activeModal);
  }
}

// ! ||--------------------------------------------------------------------------------||
// ! ||                                 EVENT HANDLERS                                 ||
// ! ||--------------------------------------------------------------------------------||
function handlerProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopup();
}

function handlerAddNewCardSubmit(e) {
  e.preventDefault();
  const name = addNewCardTitleInput.value;
  const link = addNewCardLinkInput.value;
  renderCard({ name, link }, cardListEl);
  closePopup();
}

function handlerEscUp(event) {
  event.preventDefault();
  isEscEvent(event, () => closePopup());
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
profileEditCloseBtn.addEventListener("click", () => closePopup());
profileEditForm.addEventListener("submit", handlerProfileEditSubmit);

// ADD NEW CARD
addNewCardForm.addEventListener("submit", handlerAddNewCardSubmit);
addNewCardBtn.addEventListener("click", () => {
  addNewCardLinkInput.value = "";
  addNewCardTitleInput.value = "";
  openPopup(addNewCardModal);
});

addNewCardCloseBtn.addEventListener("click", () => closePopup());

// PREVIEW MODAL

previewImageCloseBtn.addEventListener("click", () => closePopup());

// CLOSING MODAL CLICK

profileEditModal.addEventListener("click", (event) => {
  if (event.target.classList.contains("modal")) {
    closePopup();
  }
});
addNewCardModal.addEventListener("click", (event) => {
  if (event.target.classList.contains("modal")) {
    closePopup();
  }
});
previewImageModalWindow.addEventListener("click", (event) => {
  if (event.target.classList.contains("modal")) {
    closePopup();
  }
});

// ! ||--------------------------------------------------------------------------------||
// ! ||                                      LOOP;                                     ||
// ! ||--------------------------------------------------------------------------------||

initialCards.forEach((cardData) => renderCard(cardData, cardListEl));

// we are listening the click on the ".modal", AND the event.target must ghave modal class as well
