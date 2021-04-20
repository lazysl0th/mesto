import Popup from '../components/Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector, ) {
    super(popupSelector);
    this._popupFigureImage = this._popup.querySelector('.popup__image');
    this._popupFigcap = this._popup.querySelector('.popup__text');
  }

  openPopup(name, link) {
    this._popupFigureImage.src = link;
    this._popupFigureImage.alt = name;
    this._popupFigcap.textContent = name;
    super.openPopup();
  }
}
