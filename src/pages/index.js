import './index.css';
import {
  validationSetting,
  formEditProfile,
  formAddElement,
  buttonEdit,
  buttonAdd,
} from '../scripts/utils/constants.js';
import { createCard } from '../scripts/utils/utils.js';
import FormValidator from '../scripts/components/FormValidator.js';
import Section from '../scripts/components/Section.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import UserInfo from '../scripts/components/UserInfo.js';
import Api from '../scripts/components/Api.js';

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-23/',
  headers: {
    authorization: 'a820ff32-e1e8-488c-be97-b68f912afc14',
    'Content-Type': 'application/json'
  }
});

const userInfo = new UserInfo ({nameSelector: '.profile__name', aboutSelector: '.profile__about', avatarSelector: '.profile__avatar'});

api.getInformationAboutUser()
  .then((result) => (userInfo.setUserInfo(result)))
  .catch((error) => (console.log(error)));

const editFormValidator = new FormValidator(validationSetting, formEditProfile);
const addFormValidator = new FormValidator(validationSetting, formAddElement);

export const elementsList = new Section ({
  renderer: (data) => {
    elementsList.addItem(createCard(data));
  }
}, '.elements__list');

const initialCards = api.getInitialCards();
initialCards.then((result) => {
    elementsList.renderItems(result);
  })
  .catch((error) => (console.log(error)));

const editPopup = new PopupWithForm ( { popupSelector: '.popup_form_edit-profile',
  submitHandler: (inputValues) => {
    api.editInformationAboutUser(inputValues)
      .then((result) => {
        userInfo.setUserInfo(result);
      })
      .catch((error) => (console.log(error)));
  }
});

const addPopup = new PopupWithForm ( { popupSelector: '.popup_form_add-element',
  submitHandler: (inputValues) => {
    api.addCard(inputValues)
      .then((result) => {
        elementsList.addItem(createCard(result));
      })
      .catch((error) => (console.log(error)));
  }
});

export const imagePopup = new PopupWithImage ('.popup_type_figure');

editPopup.setEventListeners();

addPopup.setEventListeners();

imagePopup.setEventListeners();

/*валидация форм*/
editFormValidator.enableValidate();
addFormValidator.enableValidate();

buttonEdit.addEventListener('click', () => {
  editFormValidator.resetValidate();
  const user = userInfo.getUserInfo();
  editPopup.form.name.value = user.profileName;
  editPopup.form.about.value = user.profileAbout;
  editPopup.openPopup();
});

buttonAdd.addEventListener('click', () => {
  addFormValidator.resetValidate();
  addPopup.openPopup();
});
