/*показать элемент*/
import { elementsList, imagePopup } from '../../pages/index.js';
import Card from '../components/Card.js';

function showElement (name, link) {
  imagePopup.openPopup(name, link);
}

export const createCard = (card) => {
  const newCard = new Card ({data: card, handleCardClick: showElement}, '#element-template');
  return newCard.generateElement();
}
