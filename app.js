let currentCity = localStorage.getItem("currentCity") || 'Москва';

const getWheather = async () => {
    const cityName = document.querySelector(".city-name");
    const temperature = document.querySelector(".temperature");
    const currentTime = document.querySelector(".current-time");

    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${currentCity}&appid=85d9877a19499d8c389f1fb40ddcbdb4`);

    if(response.ok){
        let wheather = await response.json();
        let currentTemperature = (wheather.main.temp -273.15).toFixed(1);

        cityName.innerText = currentCity;
        temperature.innerText = getCorrectTemperature(currentTemperature);
        currentTime.innerText = "Сейчас " + getCurrentTime();
        localStorage.setItem("currentCity", currentCity);
    }else{
        alert("Ошибка запроса погоды");
    }
    

}

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
const getCorrectWind = (wind) => {
    
}

getWheather()

document.querySelector(".get-weather").addEventListener("click", () => {
    currentCity = document.querySelector(".city-input").value;
    getWheather();
})