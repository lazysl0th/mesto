import { initialCards } from './initial-card.js';
import {
  renderElement,
  elementsList,
  popups,
  buttonEdit,
  showFormEditProfile,
  buttonAdd,
  showFormAddElement,
  formEditProfile,
  formEditSubmitHandler,
  formAddElement,
  formAddSubmitHandler,
  hidePopup,
} from './utils.js';

/*заполнение страницы*/
initialCards.forEach ((card) => (renderElement(card, elementsList)));

/*слушатели закрытия поапа*/
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
