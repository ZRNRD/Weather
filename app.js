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

        cityName.innerText = currentCity;
        temperature.innerText = getCorrectTemperature(currentTemperature);
        currentTime.innerText = "Сейчас " + getCurrentTime();

        wind.innerText = getCorrectWind(wheather.wind);
        humidity.innerText = wheather.main.humidity + "%";
        pressure.innerText = getCorrectPressure(wheather.main.pressure);

        localStorage.setItem("currentCity", currentCity);

        document.querySelector(".city-input").value = "";
    }else{
        alert("Ошибка запроса погоды");
    }
}

// Вспомогательные функции
const getCurrentTime = () => {
    const date = new Date();
    return date.getHours() + ":" + date.getMinutes();
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
        return speed + " м/с, C" 
    }else if(deg > 25 && deg < 65){
        return speed + " м/с, CВ" 
    }else if(deg >= 65 && deg <= 115){
        return speed + " м/с, В" 
    }else if(deg > 115 && deg < 155){
        return speed + " м/с, ЮВ" 
    }else if(deg >= 155 && deg <= 205){
        return speed + " м/с, Ю" 
    }else if(deg > 205 && deg < 245){
        return speed + " м/с, ЮЗ" 
    }else if(deg >= 245 && deg <= 295){
        return speed + " м/с, З" 
    }else{
        return speed + " м/с, CЗ" 
    }
}

const getCorrectPressure = (pressure) => {
    return Math.round(pressure / 1.333) + " мм рт. ст."
}

// Повесить функцию на событие "после полной загрузки документа"
getWheather()

document.querySelector(".get-weather").addEventListener("click", () => {
    currentCity = document.querySelector(".city-input").value;
    getWheather();
})