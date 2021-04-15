import {
  validationSetting,
  formEditProfile,
  formAddElement,
  popups,
  buttonEdit,
  buttonAdd,
  formEditInputName,
  profileName,
  formEditInputAbout,
  profileAbout,
  popupEditProfile,
  popupAddElement,
} from '../utils/constants.js';
import { initialCards } from '../initial-card.js';
import { showElement } from '../utils/utils.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';

const editFormValidator = new FormValidator(validationSetting, formEditProfile);
const addFormValidator = new FormValidator(validationSetting, formAddElement);

const elementsList = new Section ({data: initialCards,
  renderer: (card) => {
    const newCard = new Card (card, '#element-template', showElement);
    const element = newCard.generateElement();
    elementsList.setItem(element);
  }
}, '.elements__list');
elementsList.renderItems();


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
  const newElement = new Section ({data: {name: formAddInputName.value, link: formAddInputLink.value},
    renderer: (card) => {
      const newCard = new Card (card, '#element-template', showElement);
      const element = newCard.generateElement();
      elementsList.setItem(element);
    }
  }, '.elements__list');
  newElement.renderItems();

  formAddElement.reset();
  hidePopup(popupAddElement);
}

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
