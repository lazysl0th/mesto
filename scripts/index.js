const content = document.querySelector('.content');
const profileName = content.querySelector('.profile__name');
const profileAbout = content.querySelector('.profile__about');
const buttonEdit = content.querySelector('.profile__button-edit');
const buttonAdd = content.querySelector('.profile__button-add');
const popups = content.querySelectorAll('.popup');
const popupEditProfile = content.querySelector('.popup_form_edit-profile');
const formEditProfile = popupEditProfile.querySelector('.popup__content_type_form');
const formEditInputName = popupEditProfile.querySelector('.popup__item_name');
const formEditInputAbout = popupEditProfile.querySelector('.popup__item_about');
const formEditButtonSave = popupEditProfile.querySelector('.popup__button-save');
const buttonCancelEditProfile = popupEditProfile.querySelector('.popup__button-cancel_type_edit-profile');
const popupAddElement = content.querySelector('.popup_form_add-element');
const formAddElement = popupAddElement.querySelector('.popup__content_type_form');
const formAddInputName = popupAddElement.querySelector('.popup__item_name');
const formAddInputLink = popupAddElement.querySelector('.popup__item_link');
const buttonCancelAddElement = popupAddElement.querySelector('.popup__button-cancel_type_add-element');
const popupFigure = content.querySelector('.popup_type_figure');
const popupFigureImage = content.querySelector('.popup__image');
const popupFigcap = content.querySelector('.popup__text');
const buttonCancelFigure = popupFigure.querySelector('.popup__button-cancel');
const elementsList = content.querySelector('.elements__list');
const elementTemplate = document.querySelector('#element-template').content;
const element = elementTemplate.querySelector('.element');

/*Открытие попапа*/
function showPopup(popup) {
  popup.classList.add('popup_visible');
}

/*Закрытие попапа*/
function hidePopup(popup) {
  popup.classList.remove('popup_visible');
}

/*like-элемента*/
function likeElement(evt) {
  evt.target.classList.toggle('element__button-like_active');
}

/*удаление элемента*/
function deleteElement(evt) {
  evt.target.closest('.element').remove();
}

/*показ формы редактирования профиля*/
function showFormEditProfile() {
  formEditInputName.value = profileName.textContent;
  formEditInputAbout.value = profileAbout.textContent;
  checkInput(formEditProfile, formEditInputName, validationSetting.inputErrorClass, validationSetting.errorClass);
  checkInput(formEditProfile, formEditInputAbout, validationSetting.inputErrorClass, validationSetting.errorClass);
  setStateButtonSave([formEditInputName, formEditInputAbout], formEditButtonSave, validationSetting.inactiveButtonClass);
  showPopup(popupEditProfile);
}

/*показ формы добавленя элемента*/
function showFormAddElement() {
  showPopup(popupAddElement);
}

/*показ картинки*/
function showFigure(card) {
  popupFigureImage.src = card.link;
  popupFigureImage.alt = card.name;
  popupFigcap.textContent = card.name;
  showPopup(popupFigure);
}

/*создание элемента*/
function createElement(card) {
  const newElement = element.cloneNode(true);
  const buttonDelete = newElement.querySelector('.element__button-delete');
  const elementImage = newElement.querySelector('.element__image');
  const elementText = newElement.querySelector('.element__text');
  const buttonLike = newElement.querySelector('.element__button-like');

  elementImage.src = card.link;
  elementImage.alt = card.name;
  elementText.textContent = card.name;

  buttonDelete.addEventListener('click', deleteElement);
  elementImage.addEventListener('click', () => showFigure(card));
  buttonLike.addEventListener('click', likeElement);
  return newElement;
}

/*отрисовка элемента*/
function renderElement(card, place) {
  place.prepend(createElement(card));
}

/*обработка формы редактирования профиля*/
function formEditSubmitHandler() {
  profileName.textContent = formEditInputName.value;
  profileAbout.textContent = formEditInputAbout.value;
  hidePopup(popupEditProfile);
}

/*обработка формы добавления элемента*/
function formAddSubmitHandler() {
  renderElement({
    name: formAddInputName.value,
    link: formAddInputLink.value
  }, elementsList);
  formAddElement.reset();
  hidePopup(popupAddElement);
}

/*заполнение страницы*/
initialCards.forEach((card) => (renderElement(card, elementsList)));

Array.from(popups).forEach(function(popup){
  popup.addEventListener('click', function(evt){
    if(evt.target.classList.contains('popup__button-cancel') || evt.target.classList.contains('popup')){
      hidePopup(popup);
    }
  });

  document.addEventListener('keydown', function(evt){
    if (evt.key === 'Escape') {
      hidePopup(popup);
    }
  });
});

buttonEdit.addEventListener('click', showFormEditProfile);

buttonAdd.addEventListener('click', showFormAddElement);

formEditProfile.addEventListener('submit', formEditSubmitHandler);

formAddElement.addEventListener('submit', formAddSubmitHandler);


