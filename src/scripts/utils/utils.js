/*показать элемент*/
import { popupFigureImage, popupFigcap } from '../utils/constants.js';
import { elementsList, imagePopup } from '../pages/index.js';
import Card from '../components/Card.js';

export function showElement (name, link) {
  popupFigureImage.src = link;
  popupFigureImage.alt = name;
  popupFigcap.textContent = name;
  imagePopup.openPopup();
}

export const renderCard = (card) => {
  const newCard = new Card ({data: card, handleCardClick: showElement}, '#element-template');
  const element = newCard.generateElement();
  elementsList.addItem(element);
}
