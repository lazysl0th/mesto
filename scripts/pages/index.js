import {
  validationSetting,
  formEditProfile,
  formAddElement,
  buttonEdit,
  buttonAdd,
} from '../utils/constants.js';
import { initialCards } from '../initial-card.js';
import { renderCard } from '../utils/utils.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

const userInfo = new UserInfo ({nameSelector: '.profile__name', aboutSelector: '.profile__about'});
const user = userInfo.getUserInfo();

const editFormValidator = new FormValidator(validationSetting, formEditProfile);
const addFormValidator = new FormValidator(validationSetting, formAddElement);

export const elementsList = new Section ({items: initialCards, renderer: renderCard }, '.elements__list');
elementsList.renderItems();

const editPopup = new PopupWithForm ( { popupSelector: '.popup_form_edit-profile',
  submitHandler: (inputValues) => {
    userInfo.setUserInfo(inputValues);
  }
}, user);

const addPopup = new PopupWithForm ( { popupSelector: '.popup_form_add-element', submitHandler: renderCard } );

export const imagePopup = new PopupWithImage ('.popup_type_figure');

editPopup.setEventListeners();

addPopup.setEventListeners();

imagePopup.setEventListeners();

/*валидация форм*/
editFormValidator.enableValidate();
addFormValidator.enableValidate();

buttonEdit.addEventListener('click', () => {
  editFormValidator.resetValidate();
  editPopup.openPopup();
});

buttonAdd.addEventListener('click', () => {
  addFormValidator.resetValidate();
  addPopup.openPopup();
});
