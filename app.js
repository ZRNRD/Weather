let currentCity = localStorage.getItem("currentCity") || 'Москва';

// Основная функция запроса погоды
const getWheather = async () => {
    const cityName = document.querySelector(".city-name");
    const temperature = document.querySelector(".temperature");
    const currentTime = document.querySelector(".current-time");
    const wind = document.querySelector(".wind");
    const humidity = document.querySelector(".humidity");
    const pressure = document.querySelector(".pressure");

    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${currentCity}&appid=85d9877a19499d8c389f1fb40ddcbdb4`);

    if(response.ok){
        let wheather = await response.json();
        let currentTemperature = (wheather.main.temp -273.15).toFixed(1);

        cityName.innerText = getCorrectCityName(currentCity);
        temperature.innerText = getCorrectTemperature(currentTemperature);
        currentTime.innerText = "Сейчас " + getCurrentTime();

        wind.innerText = getCorrectWind(wheather.wind);
        humidity.innerText = "Влажность: " + wheather.main.humidity + "%";
        pressure.innerText = getCorrectPressure(wheather.main.pressure);

        localStorage.setItem("currentCity", currentCity);

        document.querySelector(".city-input").value = "";
    }else{
        alert("Ошибка запроса погоды");
        document.querySelector(".city-input").value = "";
    }
}

// Вспомогательные функции
const getCorrectCityName = (cityName) => {
    return cityName.split(" ").map((el) => el[0].toUpperCase() + el.slice(1).toLowerCase()).join(' ');
}

const getCurrentTime = () => {
    const date = new Date();
    const hours = date.getHours() > 9 ? date.getHours() : "0" + date.getHours();
    const minutes = date.getMinutes() > 9 ? date.getMinutes() : "0" + date.getMinutes();

    return hours + ":" + minutes;
}

const getCorrectTemperature = (temperature) => {
    if(temperature > 0){
        return "+" + temperature + "°C"
    }else{
        return temperature + "°C"
    }
}

const getCorrectWind = ({speed, deg}) => {
    if(deg >= 335 && deg <= 25){
        return "Ветер: " + speed + " м/с, C" 
    }else if(deg > 25 && deg < 65){
        return "Ветер: " + speed + " м/с, CВ" 
    }else if(deg >= 65 && deg <= 115){
        return "Ветер: " + speed + " м/с, В" 
    }else if(deg > 115 && deg < 155){
        return "Ветер: " + speed + " м/с, ЮВ" 
    }else if(deg >= 155 && deg <= 205){
        return "Ветер: " + speed + " м/с, Ю" 
    }else if(deg > 205 && deg < 245){
        return "Ветер: " + speed + " м/с, ЮЗ" 
    }else if(deg >= 245 && deg <= 295){
        return "Ветер: " + speed + " м/с, З" 
    }else{
        return "Ветер: " + speed + " м/с, CЗ" 
    }
}

const getCorrectPressure = (pressure) => {
    return "Давление: " + Math.round(pressure / 1.333) + " мм рт. ст."
}

// Повесить функцию на событие "после полной загрузки документа"
getWheather()

document.querySelector(".get-weather").addEventListener("click", () => {
    currentCity = document.querySelector(".city-input").value;
    getWheather();
})

document.querySelector(".city-input").addEventListener("keydown", (e) => {
    if(e.keyCode === 13){
        currentCity = e.target.value;
        getWheather();
    }
})