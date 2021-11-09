let currentCity = localStorage.getItem("currentCity") || 'Москва';

// Основная функция запроса погоды
const getWeather = async () => {
    const cityName = document.querySelector(".city-name");
    const temperature = document.querySelector(".temperature");
    const currentTime = document.querySelector(".current-time");
    const wind = document.querySelector(".wind");
    const humidity = document.querySelector(".humidity");
    const pressure = document.querySelector(".pressure");

    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${currentCity}&appid=85d9877a19499d8c389f1fb40ddcbdb4`);

    if(response.ok){
        let weather = await response.json();
        let currentTemperature = (weather.main.temp -273.15).toFixed(1);
        changeBackground(weather)

        cityName.innerText = getCorrectCityName(currentCity);
        temperature.innerText = getCorrectTemperature(currentTemperature);
        currentTime.innerText = "Сейчас " + getCurrentTime();

        wind.innerText = getCorrectWind(weather.wind);
        humidity.innerText = "Влажность: " + weather.main.humidity + "%";
        pressure.innerText = getCorrectPressure(weather.main.pressure);

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

const changeBackground = (weather) => {
    console.log(weather.weather[0].main) // Убрать позже

    const container = document.querySelector(".container");
    switch (weather.weather[0].main) {
        case "Clear":
            container.style.background = "url('./img/Clear-bg.jpg') no-repeat";
            container.style.backgroundSize = "cover"
            break;
        case "Clouds":
            container.style.background = "url('./img/Clouds-bg.jpg') no-repeat";
            container.style.backgroundSize = "cover"
            break;
        case "Rain":
        case "Drizzle":    
            container.style.background = "url('./img/Rain-bg.jpg') no-repeat";
            container.style.backgroundSize = "cover"
            break;
        case "Snow":
            container.style.background = "url('./img/Snow-bg.jpg') no-repeat";
            container.style.backgroundSize = "cover"
            break;
        case "Thunderstorm":
            container.style.background = "url('./img/Thunderstorm-bg.jpg') no-repeat";
            container.style.backgroundSize = "cover"
            break;
        case "Mist":
        case "Haze":
        case "Fog":
            container.style.background = "url('./img/Mist-bg.jpg') no-repeat";
            container.style.backgroundSize = "cover"
            break;
        case "Smoke":
            container.style.background = "url('./img/Smoke-bg.jpg') no-repeat";
            container.style.backgroundSize = "cover"
            break;
        case "Dust":
        case "Sand":
        case "Ash":
            container.style.background = "url('./img/Dust-bg.jpg') no-repeat";
            container.style.backgroundSize = "cover"
            break;
        case "Squal":
            container.style.background = "url('./img/Squal-bg.jpg') no-repeat";
            container.style.backgroundSize = "cover"
            break;
        case "Tornado":
            container.style.background = "url('./img/Tornado-bg.jpg') no-repeat";
            container.style.backgroundSize = "cover"
            break;
        default: break;
    }
}

// Повесить функцию на событие "после полной загрузки документа"
getWeather()

document.querySelector(".get-weather").addEventListener("click", () => {
    currentCity = document.querySelector(".city-input").value;
    getWeather();
})

document.querySelector(".city-input").addEventListener("keydown", (e) => {
    if(e.keyCode === 13){
        currentCity = e.target.value;
        getWeather();
    }
})