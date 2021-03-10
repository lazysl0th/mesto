const content = document.querySelector('.content');
const buttonEdit = content.querySelector('.profile__button-edit');
const buttonAdd = content.querySelector('.profile__button-add');
const popupEditProfile = content.querySelector('.popup_form_edit-profile');
const formEditProfile = popupEditProfile.querySelector('.popup__content_type_form');
const buttonCancelEditProfile = popupEditProfile.querySelector('.popup__button-cancel_type_edit-profile');
const popupAddElement = content.querySelector('.popup_form_add-element');
const formAddElement = popupAddElement.querySelector('.popup__content_type_form');
const buttonCancelAddElement = popupAddElement.querySelector('.popup__button-cancel_type_add-element');
const popupFigure = content.querySelector('.popup_type_figure');
const popupFigureImage = content.querySelector('.popup__image');
const popupFigcap = content.querySelector('.popup__text');
const buttonCancelFigure = popupFigure.querySelector('.popup__button-cancel');
const elementsList = content.querySelector('.elements__list');
const elementTemplate = document.querySelector('#element-template').content;
const element = elementTemplate.querySelector('.element');


function showPopup(popup) {
  popup.classList.add('popup-visible');
}

function hidePopup(popup) {
  popup.classList.remove('popup-visible');
}

function likeElement(evt) {
  evt.target.classList.toggle('element__button-like_active');
}

function deleteElement(evt) {
  evt.target.closest('.element').remove();
}

function showFormEditProfile() {
  showPopup(popupEditProfile);
  popupEditProfile.querySelectorAll('.popup__item')[0].value = content.querySelector('.profile__name').textContent;
  popupEditProfile.querySelectorAll('.popup__item')[1].value = content.querySelector('.profile__about').textContent;
}

function showFormAddElement() {
  showPopup(popupAddElement);
}

function showFigure(card) {
  popupFigureImage.src = card.link;
  popupFigcap.textContent = card.name;
  showPopup(popupFigure);
}

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

function openElement(card, place) {
  place.append(createElement(card));
}

function formEditSubmitHandler(evt) {
  evt.preventDefault();
  const formItems = formEditProfile.querySelectorAll('.popup__item');
  const formInputs = Array.from(formItems).reduce((previousValue, item) => ({[previousValue.name]: previousValue.value, [item.name]: item.value,}));
  content.querySelector('.profile__name').textContent = formInputs.profileName;
  content.querySelector('.profile__about').textContent = formInputs.profileAbout;
  console.log(formEditProfile);
  hidePopup(popupEditProfile);
}

function formAddSubmitHandler(evt) {
  evt.preventDefault();
  const formItems = formAddElement.querySelectorAll('.popup__item');
  const formInputs = Array.from(formItems).reduce((previousValue, item) => ({[previousValue.name]: previousValue.value, [item.name]: item.value,}));
  elementsList.prepend(createElement(formInputs));
  formItems.forEach((item) => (item.value = ''));
  hidePopup(popupAddElement);
}

initialCards.forEach((card) => (openElement(card, elementsList)));

buttonEdit.addEventListener('click', showFormEditProfile);

buttonAdd.addEventListener('click', showFormAddElement);

formEditProfile.addEventListener('submit', formEditSubmitHandler);

formAddElement.addEventListener('submit', formAddSubmitHandler);

buttonCancelEditProfile.addEventListener ('click', () => hidePopup(popupEditProfile));

buttonCancelAddElement.addEventListener ('click', () => hidePopup(popupAddElement));

buttonCancelFigure.addEventListener ('click', () => hidePopup(popupFigure));

