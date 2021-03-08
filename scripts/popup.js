const elementTemplate = document.querySelector('#element-template').content;
const content = document.querySelector('.content');
const buttonEdit = content.querySelector('.profile__button-edit');
const buttonAdd = content.querySelector('.profile__button-add');
const popup = content.querySelector('.popup');
const elementsList = content.querySelector('.elements__list');

const elements = [
  {
    elementText: 'гора Архыз, Карачаево-Черкессия',
    elementImage: './images/arkhyz.jpg',
  },
  {
    elementText: 'Полуостров Камчатка',
    elementImage: './images/kamchatka.jpg',
  },
  {
    elementText: 'Красная поляна, Краснодарский край',
    elementImage: './images/krasnaya-polyana.jpg',
  },
  {
    elementText: 'Северная Осетия - Алания',
    elementImage: './images/north-ossetia-alania.jpg',
  },
  {
    elementText: 'Остров Ольхон',
    elementImage: './images/olkhon-island.jpg',
  },
  {
    elementText: 'Усть-Ленский Заповедник',
    elementImage: './images/ust-lenskiy-zapovednik.jpg',
  },
];

function openPopup(evt) {
  const target = evt.target;
  const buttonCancel = popup.querySelector('.popup__button-cancel');
  popup.querySelector('.popup__image').src = '';
  popup.querySelector('.popup__text').textContent = '';

  if (target.name) {
    showForm(target);
  }
  else {
    showFigure(target)
  }
  buttonCancel.addEventListener ('click', disabledPopup);
  return popup.classList.add('popup-visible');
}

function showForm(target) {
  const form = popup.querySelector(`#${target.name}`);
  popup.classList.add('popup_type_form');
  form.classList.add('popup-visible');

  if (target.name === 'button-edit') {
    form.querySelectorAll('.popup__item')[0].value = content.querySelector('.profile__name').textContent;
    form.querySelectorAll('.popup__item')[1].value = content.querySelector('.profile__about').textContent;
  }
  form.addEventListener('submit', formSubmitHandler);
}

function showFigure(target) {
  popup.classList.add('popup_type_figure');
  popup.querySelector('.popup__content_type_figure').classList.add('popup-visible');
  popup.querySelector('.popup__image').src = target.src;
  popup.querySelector('.popup__text').textContent = target.alt;
}

function disabledPopup() {
  const formItems = popup.querySelectorAll('.popup__item');
  formItems.forEach((item) => (item.value = ''));
  popup.classList.remove('popup_type_form');
  popup.classList.remove('popup_type_figure');
  popup.querySelectorAll('.popup__content').forEach((content) => (content.classList.remove('popup-visible')));
  return popup.classList.remove('popup-visible');
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  const form = evt.target;
  const formItems = form.querySelectorAll('.popup__item');
  formInputs = Array.from(formItems).reduce((previousValue, item) => ({[previousValue.name]: previousValue.value, [item.name]: item.value,}));
  if (form.name === 'popupFormEditProfile') {
      content.querySelector('.profile__name').textContent = formInputs.profileName;
      content.querySelector('.profile__about').textContent = formInputs.profileAbout;
    }
  else {
    addElement(formInputs)
  }
  disabledPopup();
}

function openElement(elements) {
  elements.forEach(function (el) {
    const element = elementTemplate.querySelector('.element').cloneNode(true);
    element.querySelector('.element__button-delete').addEventListener('click', deleteElement);
    element.querySelector('.element__image').src = el.elementImage;
    element.querySelector('.element__image').alt = el.elementText;
    element.querySelector('.element__text').textContent = el.elementText;
    element.querySelector('.element__image').addEventListener('click', openPopup);
    element.querySelector('.element__button-like').addEventListener('click', likeElement);
    elementsList.append(element);
  })
}

function addElement(formInputs) {
  const newElement = elementTemplate.querySelector('.element').cloneNode(true);
  newElement.querySelector('.element__button-delete').addEventListener('click', deleteElement);
  newElement.querySelector('.element__image').src = formInputs.elementImage || '';
  newElement.querySelector('.element__image').alt = formInputs.elementText || '';
  newElement.querySelector('.element__text').textContent = formInputs.elementText || '';
  newElement.querySelector('.element__image').addEventListener('click', openPopup);
  newElement.querySelector('.element__button-like').addEventListener('click', likeElement);
  elementsList.prepend(newElement);
}

function likeElement(evt) {
  evt.target.classList.toggle('element__button-like_active');
}

function deleteElement(evt) {
  const element = evt.target.closest(`.${evt.target.parentElement.className}`)
  element.remove();
}

openElement(elements);

buttonEdit.addEventListener('click', openPopup);

buttonAdd.addEventListener('click', openPopup);

