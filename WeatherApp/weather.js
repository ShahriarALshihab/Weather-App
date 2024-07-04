let cityName=document.querySelector(".container .search-box input"); 
let weather_img=document.querySelector(".container .weather-img img"); 

let weatherMain=document.querySelector(".container .weather_main_1"); 
let weatherDetails=document.querySelector(".container .weather-descrip"); 
let temp=document.querySelector(".container .temp"); 
let otherDetails=document.querySelector(".container .other-details"); 

let searchBtn=document.querySelector(".container .search-box button"); 

let weatherLocation=document.querySelector(".container .weather-location"); 

//To create this weather app we will use OpenWeatherMap api 

let apiKey="f79708fcce2e97dfd4e604efa94bf29f"; 


let getWeatherDetails=()=>{
    let city=cityName.value; 
    let url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`; 

    fetch(url).then((res)=>
    res.json())
    .then((data)=>{
       console.log(data); 
        if(data.cod==200){
        weather_img.src=`https://openweathermap.org/img/wn/${data.weather[0].icon}.png`; 

        weatherMain.innerHTML=data.weather[0].main; 
        weatherDetails.innerHTML=data.weather[0].description; 
        weatherLocation.innerHTML=`<i class="fa-solid fa-location-dot"></i>${data.name}`; 

        temp.innerHTML=`${data.main.temp}&#176;`; 
        otherDetails.innerHTML=`
            <div>
                <span>Feels Like</span>
                <p>${data.main.feels_like}&#176;</p>
            </div>
            <div>
                <span>Min Temp</span>
                <p>${data.main.temp_min}&#176;</p>
            </div>
            <div>
                <span>Humidity</span>
                <p>${data.main.humidity}%</p>
            </div>
            <div>
                <span>Wind Speed</span>
                <p>${data.wind.speed} km/h</p>
            </div>
            <div>
                <span>Max Temp</span>
                <p>${data.main.temp_max}&#176;</p>
            </div>
            <div>
                <span>Pressure</span>
                <p>${data.main.pressure} mbar</p>
            </div>`; 
        }else{
            console.error("Error fetching weather data:", data.message); 
            weatherMain.innerHTML="city not found"; 
            weatherDetails.innerHTML=""; 
            weatherLocation.innerHTML=""; 
            temp.innerHTML=""; 
            otherDetails.innerHTML=""; 

        }


    }).catch((error)=>{
        console.error("Error fetching weather data:", error); 
        weatherMain.innerHTML="Error fetching weather data"; 
            weatherDetails.innerHTML=""; 
            weatherLocation.innerHTML=""; 
            temp.innerHTML=""; 
            otherDetails.innerHTML=""; 
    }); 
}
searchBtn.addEventListener("click",()=>{
    if(cityName.value !=""){
        getWeatherDetails(); 
    }
})