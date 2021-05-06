import Popup from '../components/Popup.js';

export default class PopupWithSubmit extends Popup {
  constructor({ popupSelector, submitHandler}) {
    super(popupSelector);
    this._submitHandler = submitHandler;
    this._form = this._popup.querySelector('.popup__content_type_form');
  }

  setEventListeners() {
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitHandler(this._cardId, this._buttonDelete);
    });
    super.setEventListeners();
  }

  openPopup(cardId, buttonDelete) {
    this._cardId = cardId;
    this._buttonDelete = buttonDelete;
    super.openPopup();
  }
}
