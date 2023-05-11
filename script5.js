const wsUri = "wss://echo-ws-service.herokuapp.com/";

const infoOutput = document.querySelector(".info_output");
const chatOutput = document.querySelector(".chat_output");
const input = document.querySelector("input");
const btnSend = document.querySelector(".btn_send");
const btnGeo = document.querySelector(".btn_geo");

function pageLoaded() {

  let websocket = new WebSocket(wsUri);

  websocket.onopen = () => {
    infoOutput.innerHTML = "Соединение установлено";
  };

  websocket.onmessage = (event) => {
    writeToChat(event.data, true);
  };

  websocket.onerror = () => {
    infoOutput.innerHTML = "Ошибка передачи данных";
  };

  btnSend.addEventListener("click", sendMessage);

  function sendMessage() {
    if (!input.value) return;
    websocket.send(input.value);
    writeToChat(input.value, false);
    input.value = "";
  }

  function writeToChat(message, isRecieved) {
    let messageHTML = `<div class="${
      isRecieved ? "recieved" : "sent"
    }">${message}</div>`;
    chatOutput.innerHTML += messageHTML;
  }

  // гео-локация
  const error = () => {
    infoOutput.innerHTML = "Информация о местоположении недоступна";
  };

  const success = (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    let geoLink = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
    writeToChat(`<a  href='${geoLink}' target='_blank'>Гео-локация</a>`);

  };

  btnGeo.addEventListener("click", () => {
    if (!navigator.geolocation) {
      infoOutput.innerHTML = "Geolocation не поддерживается вашим браузером";
    } else {
      infoOutput.innerHTML = "Определение местоположения…";
      navigator.geolocation.getCurrentPosition(success, error);
      setTimeout(() => infoOutput.innerHTML = "Соединение установлено", 2000);
    }
  });
}

document.addEventListener("DOMContentLoaded", pageLoaded);
