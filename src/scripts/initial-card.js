const arkhyz = new URL('../images/arkhyz.jpg', import.meta.url);
const kamchatka = new URL('../images/kamchatka.jpg', import.meta.url);
const krasnayaPolyana = new URL('../images/krasnaya-polyana.jpg', import.meta.url);
const northOssetia = new URL('../images/north-ossetia-alania.jpg', import.meta.url);
const olhon = new URL('../images/olkhon-island.jpg', import.meta.url);
const ustLensk = new URL('../images/ust-lenskiy-zapovednik.jpg', import.meta.url);

export const initialCards  = [
  {
    name: 'гора Архыз, Карачаево-Черкессия',
    link: arkhyz,
  },
  {
    name: 'Полуостров Камчатка',
    link: kamchatka,
  },
  {
    name: 'Красная поляна, Краснодарский край',
    link: krasnayaPolyana,
  },
  {
    name: 'Северная Осетия - Алания',
    link: northOssetia,
  },
  {
    name: 'Остров Ольхон',
    link: olhon,
  },
  {
    name: 'Усть-Ленский Заповедник',
    link: ustLensk,
  },
];
