const zonaTime = document.querySelector('#time-zone');
const dataTime = document.querySelector('#data-time');
const btn = document.querySelector('.j-btn-test');

const error = () => {
  zonaTime.textContent = 'Информация о местоположении недоступна';
}

const success = (position) => {
  const latitude  = position.coords.latitude;
  const longitude = position.coords.longitude;
  
  let requestLink = `https://api.ipgeolocation.io/timezone?apiKey=32bcd4a6e4b548968e7afcdb682ac679&lat=${latitude} &long=${longitude}`;
  
  fetch(requestLink)
    .then((response) => {
      const result = response.json();
      return result;
    })
    .then((data) => {
    zonaTime.textContent = `Ваша временная зона: ${data.timezone}`;
    dataTime.textContent = `Текущая дата и время: ${data.date_time_txt}`;
      console.log(data.timezone);
    console.log(data.date_time_txt);
    })
    .catch(() => {zonaTime.textContent = 'Информация о местоположении недоступна';});

}

btn.addEventListener('click', () => {  
  if (!navigator.geolocation) {
    zonaTime.textContent = 'Geolocation не поддерживается вашим браузером';
  } else {
    zonaTime.textContent = 'Определение местоположения…';
    navigator.geolocation.getCurrentPosition(success, error);
  }
});