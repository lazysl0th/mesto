import Card from './Card.js';
import FormValidator from './FormValidator.js';

export const content = document.querySelector('.content');
export const popupFigure = content.querySelector('.popup_type_figure');
export const popupFigureImage = content.querySelector('.popup__image');
export const popupFigcap = content.querySelector('.popup__text');
const elementTemplate = document.querySelector('#element-template').content;
export const element = elementTemplate.querySelector('.element');
const profileName = content.querySelector('.profile__name');
const profileAbout = content.querySelector('.profile__about');
export const buttonEdit = content.querySelector('.profile__button-edit');
export const buttonAdd = content.querySelector('.profile__button-add');
export const popups = content.querySelectorAll('.popup');
const popupEditProfile = content.querySelector('.popup_form_edit-profile');
export const formEditProfile = popupEditProfile.querySelector('.popup__content_type_form');
const formEditInputName = popupEditProfile.querySelector('.popup__item_name');
const formEditInputAbout = popupEditProfile.querySelector('.popup__item_about');
const popupAddElement = content.querySelector('.popup_form_add-element');
export const formAddElement = popupAddElement.querySelector('.popup__content_type_form');
const formAddInputName = popupAddElement.querySelector('.popup__item_name');
const formAddInputLink = popupAddElement.querySelector('.popup__item_link');
export const elementsList = content.querySelector('.elements__list');
export const validationSetting = {
  formSelector: '.popup__content_type_form',
  inputSelector: '.popup__item',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button-save_disabled',
  inputErrorClass: 'popup__item_type_error',
  errorClass: 'popup__error_active'
}

/*Открытие попапа*/
export function showPopup(popup) {
  popup.classList.add('popup_visible');
}

/*Закрытие попапа*/
export function hidePopup(popup) {
  popup.classList.remove('popup_visible');
}

/*показ формы редактирования профиля*/
export function showFormEditProfile() {
  formEditInputName.value = profileName.textContent;
  formEditInputAbout.value = profileAbout.textContent;
  const formValidator = new FormValidator(validationSetting, popupEditProfile);
  formValidator.checkInput(formEditInputName);
  formValidator.checkInput(formEditInputAbout);
  formValidator.enableValidate();
  showPopup(popupEditProfile);
}

/*показ формы добавленя элемента*/
export function showFormAddElement() {
  const formValidator = new FormValidator(validationSetting, popupAddElement);
  formValidator.enableValidate();
  showPopup(popupAddElement);
}

/*отрисовка элемента*/
export function renderElement(card, place) {
  place.prepend(new Card(card).generateElement());
}

/*обработка формы редактирования профиля*/
export function formEditSubmitHandler() {
  profileName.textContent = formEditInputName.value;
  profileAbout.textContent = formEditInputAbout.value;
  hidePopup(popupEditProfile);
}

/*обработка формы добавления элемента*/
export function formAddSubmitHandler() {
  renderElement({
    name: formAddInputName.value,
    link: formAddInputLink.value
  }, elementsList);
  formAddElement.reset();
  hidePopup(popupAddElement);
}
