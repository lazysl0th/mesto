/*показать элемент*/
import { popupFigure, popupFigureImage, popupFigcap } from '../utils/constants.js';
import { showPopup } from '../pages/index.js';

export function showElement (name, link) {
  popupFigureImage.src = link;
  popupFigureImage.alt = name;
  popupFigcap.textContent = name;
  showPopup(popupFigure);
}
