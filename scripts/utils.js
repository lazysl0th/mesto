/*показать элемент*/
import { popupFigure, popupFigureImage, popupFigcap, showPopup } from './index.js';

export function showElement (name, link) {
  popupFigureImage.src = link;
  popupFigureImage.alt = name;
  popupFigcap.textContent = name;
  showPopup(popupFigure);
}
