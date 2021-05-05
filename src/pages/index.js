import './index.css';
import {
  validationSetting,
  formEditProfile,
  formAddElement,
  formUpdateAvatar,
  buttonEdit,
  buttonAdd,
  buttonEditAvatar,
} from '../scripts/utils/constants.js';
import { createCard } from '../scripts/utils/utils.js';
import FormValidator from '../scripts/components/FormValidator.js';
import Section from '../scripts/components/Section.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import PopupWithSubmit from '../scripts/components/PopupWithSubmit.js';
import UserInfo from '../scripts/components/UserInfo.js';
import Api from '../scripts/components/Api.js';

export const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-23/',
  headers: {
    authorization: 'a820ff32-e1e8-488c-be97-b68f912afc14',
    'Content-Type': 'application/json'
  }
});

export const userInfo = new UserInfo ({nameSelector: '.profile__name', aboutSelector: '.profile__about', avatarSelector: '.profile__avatar'});

const editFormValidator = new FormValidator(validationSetting, formEditProfile);
const addFormValidator = new FormValidator(validationSetting, formAddElement);
const editAvatarFormValidator = new FormValidator(validationSetting, formUpdateAvatar);

export const elementsList = new Section ({
  renderer: (data) => {
    elementsList.addItem(createCard(data));
  }
}, '.elements__list');

const informationAboutUserPromise =  api.getInformationAboutUser();
const initialCardsPromise = api.getInitialCards();

Promise.all([informationAboutUserPromise, initialCardsPromise])
  .then((result) => {
    userInfo.setUserInfo(result[0]);
    elementsList.renderItems(result[1]);
  })
  .catch((error) => (console.log(error)));

const editPopup = new PopupWithForm ( { popupSelector: '.popup_form_edit-profile',
  submitHandler: (inputValues) => {
    const editInformationAboutUserPromise = api.editInformationAboutUser(inputValues);
    Promise.all([editInformationAboutUserPromise])
      .then((result) => {
        userInfo.setUserInfo(result[0]);
        editPopup.renderLoading(false);
        editPopup.closePopup();
      })
      .catch((error) => (console.log(error)));
  }
});

const addPopup = new PopupWithForm ( { popupSelector: '.popup_form_add-element',
  submitHandler: (inputValues) => {
    const addCardPromise = api.addCard(inputValues);
    Promise.all([addCardPromise])
      .then((result) => {
        elementsList.addItem(createCard(result[0]));
        addPopup.renderLoading(false);
        addPopup.closePopup();
      })
      .catch((error) => (console.log(error)));
  }
});

export const imagePopup = new PopupWithImage ('.popup_type_figure');

export const submitPopup = new PopupWithSubmit ({ popupSelector: '.popup_form_submit-delete-element',
  submitHandler: (cardId, buttonDelete) => {
    api.deleteCard(cardId)
      .then(() => buttonDelete.closest('.element').remove())
      .catch((error) => (console.log(error)));
  }
});

const editAvatarPopup = new PopupWithForm ({ popupSelector: '.popup_form_update-avatar',
  submitHandler: (inputValues) => {
    const updateAvatarPromise = api.updateAvatar(inputValues);
    Promise.all([updateAvatarPromise])
      .then((result) => {
        userInfo.setUserInfo(result[0]);
        editAvatarPopup.renderLoading(false);
        editAvatarPopup.closePopup();
      })
      .catch((error) => (console.log(error)));
  }
});

editPopup.setEventListeners();

addPopup.setEventListeners();

imagePopup.setEventListeners();

submitPopup.setEventListeners();

editAvatarPopup.setEventListeners();

/*валидация форм*/
editFormValidator.enableValidate();
addFormValidator.enableValidate();
editAvatarFormValidator.enableValidate();

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

buttonEditAvatar.addEventListener('click', () => {
  editAvatarFormValidator.resetValidate();
  const user = userInfo.getUserInfo();
  editAvatarPopup.form.link.value = user.profileAvatar;
  editAvatarPopup.openPopup();
});
