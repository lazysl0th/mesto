import Popup from '../components/Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector, ) {
    super(popupSelector);
    this._popupFigureImage = this._popup.querySelector('.popup__image');
    this._popupFigcap = this._popup.querySelector('.popup__text');
  }

  setEventListeners() {
    super.setEventListeners();
  }

  openPopup() {
    super.openPopup();
  }
}
