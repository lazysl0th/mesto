import { initialCards } from './initial-card.js';
import { showElement } from './utils.js';
import Card from './Card.js';
import FormValidator from './FormValidator.js';

const content = document.querySelector('.content');
export const popupFigure = content.querySelector('.popup_type_figure');
export const popupFigureImage = content.querySelector('.popup__image');
export const popupFigcap = content.querySelector('.popup__text');
const elementsList = content.querySelector('.elements__list');
const profileName = content.querySelector('.profile__name');
const profileAbout = content.querySelector('.profile__about');
const buttonEdit = content.querySelector('.profile__button-edit');
const buttonAdd = content.querySelector('.profile__button-add');
const popups = content.querySelectorAll('.popup');
const popupEditProfile = content.querySelector('.popup_form_edit-profile');
const formEditProfile = popupEditProfile.querySelector('.popup__content_type_form');
const formEditInputName = popupEditProfile.querySelector('.popup__item_name');
const formEditInputAbout = popupEditProfile.querySelector('.popup__item_about');
const popupAddElement = content.querySelector('.popup_form_add-element');
const formAddElement = popupAddElement.querySelector('.popup__content_type_form');
const formAddInputName = popupAddElement.querySelector('.popup__item_name');
const formAddInputLink = popupAddElement.querySelector('.popup__item_link');
const validationSetting = {
  formSelector: '.popup__content_type_form',
  inputSelector: '.popup__item',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button-save_disabled',
  inputErrorClass: 'popup__item_type_error',
  errorClass: 'popup__error_active'
}

const editFormValidator = new FormValidator(validationSetting, formEditProfile);
const addFormValidator = new FormValidator(validationSetting, formAddElement);

/*Открытие попапа*/
export function showPopup(popup) {
  popup.classList.add('popup_visible');
  document.addEventListener('keydown', closeByEscape);
}

/*Закрытие попапа*/
function hidePopup(popup) {
  popup.classList.remove('popup_visible');
  document.removeEventListener('keydown', closeByEscape);
}

/*Закрытие popup кнопкой Esc*/
const closeByEscape = (evt) => {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_visible');
    hidePopup(openedPopup);
  }
}

/*показ формы редактирования профиля*/
function showFormEditProfile() {
  formEditInputName.value = profileName.textContent;
  formEditInputAbout.value = profileAbout.textContent;
  editFormValidator.resetValidate();
  showPopup(popupEditProfile);
}

/*обработка формы редактирования профиля*/
function formEditSubmitHandler() {
  profileName.textContent = formEditInputName.value;
  profileAbout.textContent = formEditInputAbout.value;
  hidePopup(popupEditProfile);
}

/*показ формы добавленя элемента*/
function showFormAddElement() {
  addFormValidator.resetValidate();
  showPopup(popupAddElement);
}

/*обработка формы добавления элемента*/
function formAddSubmitHandler() {
  const newElement = createElement({
    name: formAddInputName.value,
    link: formAddInputLink.value
  }, showElement);
  renderElement(newElement, elementsList);
  formAddElement.reset();
  hidePopup(popupAddElement);
}

/*создание элемента*/
function createElement(card, showElement) {
  const newCard = new Card (card, '#element-template', showElement);
  return newCard.generateElement();
}

/*отрисовка элемента*/
function renderElement(element, place) {
  place.prepend(element);
}

/*заполнение страницы*/
initialCards.forEach ((card) => {
  const element = createElement(card, showElement);
  renderElement(element, elementsList);
  }
)

/*слушатели закрытия поапа*/
Array.from(popups).forEach(function(popup){
  popup.addEventListener('click', function(evt){
    if(evt.target.classList.contains('popup__button-cancel') || evt.target.classList.contains('popup')){
      hidePopup(popup);
    }
  });
});

/*валидация форм*/
editFormValidator.enableValidate();
addFormValidator.enableValidate();

buttonEdit.addEventListener('click', showFormEditProfile);

buttonAdd.addEventListener('click', showFormAddElement);

formEditProfile.addEventListener('submit', (evt) => {
  evt.preventDefault();
  formEditSubmitHandler();
});

formAddElement.addEventListener('submit', (evt) => {
  evt.preventDefault();
  formAddSubmitHandler();
});
