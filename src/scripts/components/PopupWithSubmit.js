import Popup from '../components/Popup.js';

export default class PopupWithSubmit extends Popup {
  constructor({ popupSelector, submitHandler }) {
    super(popupSelector);
    this._submitHandler = submitHandler;
    this.form = this._popup.querySelector('.popup__content_type_form');
  }

  setEventListeners() {
    this.form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitHandler();
      this.closePopup();
    });
    super.setEventListeners();
  }
}
