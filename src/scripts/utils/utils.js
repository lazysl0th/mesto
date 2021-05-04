/*показать элемент*/
import { imagePopup, submitPopup } from '../../pages/index.js';
import Card from '../components/Card.js';

function showElement (name, link) {
  imagePopup.openPopup(name, link);
}

function deleteElement (cardId, buttonDelete) {
  submitPopup.openPopup(cardId, buttonDelete);
}

export const createCard = (card) => {
  const newCard = new Card ({data: card, handleCardClick: showElement, handleCardDelete: deleteElement}, '#element-template');
  return newCard.generateElement();
}
