import Popup from '../components/Popup.js';

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, submitHandler }) {
    super(popupSelector);
    this._submitHandler = submitHandler;
    this.form = this._popup.querySelector('.popup__content_type_form');
    this._formInputs = this.form.querySelectorAll('.popup__item');
  }

  _getInputValues() {
    const inputValues = {};
    this._formInputs.forEach((input) => (inputValues[input.name] = input.value));
    return inputValues;
  }

  setEventListeners() {
    this.form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitHandler(this._getInputValues());
      this.closePopup();
    });
    super.setEventListeners();
  }

  closePopup() {
    this.form.reset();
    super.closePopup();
  }
}
