/*показать элемент*/
import { elementsList, imagePopup } from '../pages/index.js';
import Card from '../components/Card.js';

function showElement (name, link) {
  imagePopup.openPopup(name, link);
}

const createCard = (card) => {
  const newCard = new Card ({data: card, handleCardClick: showElement}, '#element-template');
  return newCard.generateElement();
}

export const renderCard = (card) => {
  const element = createCard(card);
  elementsList.addItem(element);
}
