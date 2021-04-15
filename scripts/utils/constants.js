const content = document.querySelector('.content');
export const profileName = content.querySelector('.profile__name');
export const profileAbout = content.querySelector('.profile__about');
export const buttonEdit = content.querySelector('.profile__button-edit');
export const buttonAdd = content.querySelector('.profile__button-add');
export const popups = content.querySelectorAll('.popup');
export const popupFigure = content.querySelector('.popup_type_figure');
export const popupFigureImage = content.querySelector('.popup__image');
export const popupFigcap = content.querySelector('.popup__text');
export const popupEditProfile = content.querySelector('.popup_form_edit-profile');
export const formEditProfile = popupEditProfile.querySelector('.popup__content_type_form');
export const formEditInputName = popupEditProfile.querySelector('.popup__item_name');
export const formEditInputAbout = popupEditProfile.querySelector('.popup__item_about');
export const popupAddElement = content.querySelector('.popup_form_add-element');
export const formAddElement = popupAddElement.querySelector('.popup__content_type_form');
export const formAddInputName = popupAddElement.querySelector('.popup__item_name');
export const formAddInputLink = popupAddElement.querySelector('.popup__item_link');
export const validationSetting = {
  formSelector: '.popup__content_type_form',
  inputSelector: '.popup__item',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button-save_disabled',
  inputErrorClass: 'popup__item_type_error',
  errorClass: 'popup__error_active'
}
