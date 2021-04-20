export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._popup = document.querySelector(this._popupSelector);
    this._buttonCancel = this._popup.querySelector('.popup__button-cancel');
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  _handleEscClose(evt) {
      if (evt.key === 'Escape') {
        this.closePopup();
      }
    }

  _click(evt) {
    if(evt.target.classList.contains('popup__button-cancel') || evt.target.classList.contains('popup')){
      this.closePopup();
    }
  }

  setEventListeners() {
    this._popup.addEventListener('click', this._click.bind(this));
  }

  openPopup() {
    this._popup.classList.add('popup_visible');
    document.addEventListener('keydown', this._handleEscClose);
  }

  closePopup() {
    this._popup.classList.remove('popup_visible');
    document.removeEventListener('keydown', this._handleEscClose);
  }
}
