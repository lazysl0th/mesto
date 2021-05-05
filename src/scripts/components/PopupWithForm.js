import Popup from '../components/Popup.js';

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, submitHandler }) {
    super(popupSelector);
    this._submitHandler = submitHandler;
    this.form = this._popup.querySelector('.popup__content_type_form');
    this._formInputs = this.form.querySelectorAll('.popup__item');
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this.form.buttonSave.textContent = 'Сохранение...';
    } else {
      this.form.buttonSave.textContent = 'Сохранить';
    }
  }

  _getInputValues() {
    const inputValues = {};
    this._formInputs.forEach((input) => (inputValues[input.name] = input.value));
    return inputValues;
  }

  setEventListeners() {
    this.form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this.renderLoading(true);
      this._submitHandler(this._getInputValues());
    });
    super.setEventListeners();
  }

  closePopup() {
    this.form.reset();
    super.closePopup();
  }
}
