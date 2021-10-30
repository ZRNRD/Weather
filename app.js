let currentCity = localStorage.getItem("currentCity") || 'Москва';

const getWheather = async () => {
    const temperature = document.querySelector(".temperature");
    const currentTime = document.querySelector(".current-time");

    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${currentCity}&appid=85d9877a19499d8c389f1fb40ddcbdb4`);
    

    if(response.ok){
        let wheather = await response.json();
        let currentTemperature = (wheather.main.temp -273.15).toFixed(1);

        temperature.innerText = getTemperature(currentTemperature);
        currentTime.innerText = "Сейчас " + getCurrentTime();

    }

    

}

const getTemperature = (temperature) => {
    if(temperature > 0){
        return "+" + temperature + "°C"
    }else{
        return temperature + "°C"
    }
}

const getCurrentTime = () => {
    const date = new Date();
    return date.getHours() + ":" + date.getMinutes();
}

getWheather()
