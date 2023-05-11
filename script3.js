const size = document.querySelector('#screen-size');
const stat = document.querySelector('#status');
const mapLink = document.querySelector('#map-link');
const btn = document.querySelector('.j-btn-test');

const error = () => {
  stat.textContent = 'Информация о местоположении недоступна';
}

const success = (position) => {
  const latitude  = position.coords.latitude;
  const longitude = position.coords.longitude;

  stat.textContent = `Вы находитесь здесь: Широта: ${latitude} °,  Долгота: ${longitude} °`;
  mapLink.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
  mapLink.textContent = 'Посмотреть на карте';
}

btn.addEventListener('click', () => {
  
  size.textContent = `Размер вашего экрана: ширина: ${window.screen.width} px,  высота: ${window.screen.height} px`;
  mapLink.href = '';
  mapLink.textContent = '';
  
  if (!navigator.geolocation) {
    stat.textContent = 'Geolocation не поддерживается вашим браузером';
  } else {
    stat.textContent = 'Определение местоположения…';
    navigator.geolocation.getCurrentPosition(success, error);
  }
});