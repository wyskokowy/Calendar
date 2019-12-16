const clock = document.querySelector('#clock');
const hour = document.querySelector('#hour');
const minute = document.querySelector('#minute');
const second = document.querySelector('#second');



function time() {
    const now = new Date();

    hour.innerHTML = now.getHours() > 9 ? now.getHours() : `0${now.getHours()}`;
    minute.innerHTML = now.getMinutes() > 9 ? now.getMinutes() : `0${now.getMinutes()}`;
    second.innerHTML = now.getSeconds() > 9 ? now.getSeconds() : `0${now.getSeconds()}`;

}

setInterval(time, 1000);