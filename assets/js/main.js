// ~ HTML Elements 
const todayWeather = document.querySelector('#todayWeather');
const upcomingDaysWeather = document.querySelector('#upcomingDaysWeather');
const cityInput = document.querySelector('#cityInput');
const searchBtn = document.querySelector('#searchBtn');

// ^ App inputs
const apiKey = "a650d7f4ed2a4ff9af151315251911";


searchBtn.addEventListener('click', ()=> {
    const city = cityInput.value.trim();
    if(city != '') {
        getWeather(city);
    }
});

// & Functions
async function getWeather(city) {
    const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=4`;
    const res = await fetch(url);
    const data = await res.json();
    console.log(data);
    displayTodayWeather(data);
    displayUpcomingDaysWeather(data.forecast.forecastday.slice(1));
}

function displayTodayWeather(data) {
    todayWeather.innerHTML = `
        <h2> ${data.location.name}, ${data.location.country} </h2>
        <img src="https:${data.current.condition.icon}" class="weatherIcon">
        <h1> ${data.current.temp_c}°C </h1>
          <p class="fs-4"> ${data.current.condition.text} </p>
          <div class="row mt-4">
              <div class="col">
                  <p> <i class="fa-solid fa-tornado"></i> ${data.current.feelslike_c}°C </p>
              </div>
              <div class="col">
                  <p> <i class="fa-solid fa-water"></i> ${data.current.humidity}% </p>
              </div>
              <div class="col">
                  <p> <i class="fa-solid fa-wind"></i> ${data.current.wind_kph}km/h</p>
              </div>
          </div>
    `;
}

function displayUpcomingDaysWeather(days) {
    upcomingDaysWeather.innerHTML = '';

    days.forEach(day => {
        const date = new Date(day.date);
        const dayName = date.toLocaleDateString("en-US", {weekday: "long"});
        upcomingDaysWeather.innerHTML += `
            <div class="col-auto"> 
                <div class="upcomingDayCard shadow-sm">
                    <h5> ${dayName} </h5>
                    <h6> ${day.date} </h6>
                    <img src="https:${day.day.condition.icon}" class="smallIcon">
                    <h6> ${day.day.condition.text} </h6>
                    <p class="mt-2">
                        <span class="fw-bolder"> ${day.day.maxtemp_c}° </span> / ${day.day.mintemp_c}°
                    </p>
                </div>
            </div>
        `;
    });
}