import { initialCards } from './initial-card.js';
import { content } from './utils.js';
import Card from './Card.js';

const profileName = content.querySelector('.profile__name');
const profileAbout = content.querySelector('.profile__about');
const buttonEdit = content.querySelector('.profile__button-edit');
const buttonAdd = content.querySelector('.profile__button-add');
const popups = content.querySelectorAll('.popup');
const popupEditProfile = content.querySelector('.popup_form_edit-profile');
const formEditProfile = popupEditProfile.querySelector('.popup__content_type_form');
const formEditInputName = popupEditProfile.querySelector('.popup__item_name');
const formEditInputAbout = popupEditProfile.querySelector('.popup__item_about');
const formEditButtonSave = popupEditProfile.querySelector('.popup__button-save');
const buttonCancelEditProfile = popupEditProfile.querySelector('.popup__button-cancel_type_edit-profile');
const popupAddElement = content.querySelector('.popup_form_add-element');
const formAddElement = popupAddElement.querySelector('.popup__content_type_form');
const formAddInputName = popupAddElement.querySelector('.popup__item_name');
const formAddInputLink = popupAddElement.querySelector('.popup__item_link');
const buttonCancelAddElement = popupAddElement.querySelector('.popup__button-cancel_type_add-element');
const popupFigure = content.querySelector('.popup_type_figure');


const buttonCancelFigure = popupFigure.querySelector('.popup__button-cancel');
const elementsList = content.querySelector('.elements__list');
const elementTemplate = document.querySelector('#element-template').content;
const element = elementTemplate.querySelector('.element');

/*Открытие попапа*/
function showPopup(popup) {
  popup.classList.add('popup_visible');
}

/*Закрытие попапа*/
function hidePopup(popup) {
  popup.classList.remove('popup_visible');
}

/*показ формы редактирования профиля*/
function showFormEditProfile() {
  formEditInputName.value = profileName.textContent;
  formEditInputAbout.value = profileAbout.textContent;
  checkInput(formEditProfile, formEditInputName, validationSetting.inputErrorClass, validationSetting.errorClass);
  checkInput(formEditProfile, formEditInputAbout, validationSetting.inputErrorClass, validationSetting.errorClass);
  setStateButtonSave([formEditInputName, formEditInputAbout], formEditButtonSave, validationSetting.inactiveButtonClass);
  showPopup(popupEditProfile);
}

/*показ формы добавленя элемента*/
function showFormAddElement() {
  showPopup(popupAddElement);
}

/*отрисовка элемента*/
function renderElement(card, place) {
  place.prepend(new Card(card).generateElement());
}

/*обработка формы редактирования профиля*/
function formEditSubmitHandler() {
  profileName.textContent = formEditInputName.value;
  profileAbout.textContent = formEditInputAbout.value;
  hidePopup(popupEditProfile);
}

/*обработка формы добавления элемента*/
function formAddSubmitHandler() {
  renderElement({
    name: formAddInputName.value,
    link: formAddInputLink.value
  }, elementsList);
  formAddElement.reset();
  hidePopup(popupAddElement);
}

/*заполнение страницы*/
initialCards.forEach ((card) => (renderElement(card, elementsList)));

Array.from(popups).forEach(function(popup){
  popup.addEventListener('click', function(evt){
    if(evt.target.classList.contains('popup__button-cancel') || evt.target.classList.contains('popup')){
      hidePopup(popup);
    }
  });

  document.addEventListener('keydown', function(evt){
    if (evt.key === 'Escape') {
      hidePopup(popup);
    }
  });
});

buttonEdit.addEventListener('click', showFormEditProfile);

buttonAdd.addEventListener('click', showFormAddElement);

formEditProfile.addEventListener('submit', formEditSubmitHandler);

formAddElement.addEventListener('submit', formAddSubmitHandler);
