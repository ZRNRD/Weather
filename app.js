let currentCity = localStorage.getItem("currentCity") || 'Тюмень';

const getWheather = async () => {
    let temperature = document.querySelector(".temperature");

    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${currentCity}&appid=85d9877a19499d8c389f1fb40ddcbdb4`);
    
    let wheather;

    if(response.ok){
        wheather = await response.json();
    }

    let currentTemperature = (wheather.main.temp -273.15).toFixed(1);

    temperature.innerText = getTemperature(currentTemperature);

}

const getTemperature = (temperature) => {
    if(temperature === 0){
        return 0;
    }else if(temperature > 0){
        return "+" + temperature + "°C"
    }else{
        return "-" + temperature + "°C"
    }
}

getWheather()