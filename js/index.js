async function getTodayWeather() {
  let res = await fetch(
    `http://api.weatherapi.com/v1/current.json?key=d0a578530bb14561aef192413252506&q=Cairo`
  );
  var data = await res.json();

  console.log(data);
  today(data);
}

async function getSecondDayWeather() {
  let res = await fetch(
    `http://api.weatherapi.com/v1/forecast.json?key=d0a578530bb14561aef192413252506&q=Cairo&days=2`
  );
  var data = await res.json();

  console.log(data);
  secondDay(data);
}
async function getThirdDayWeather() {
  let res = await fetch(
    `http://api.weatherapi.com/v1/forecast.json?key=d0a578530bb14561aef192413252506&q=Cairo&days=3`
  );
  var data = await res.json();

  console.log(data);
  thirdDay(data);
}
getSecondDayWeather();
getTodayWeather();
getThirdDayWeather();

function today(data) {
  const date = new Date(data.location.localtime);
  const weekday = date.toLocaleDateString("en-US", { weekday: "long" });
  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "long" });

  let weather = `
    <div class="card text-white">
      <div class="card-header d-flex justify-content-between">
        <span>${weekday}</span>
        <span>${day} ${month}</span>
      </div>
      <div class="card-body">
        <h5 class="card-title">${data.location.name}</h5>
        <div class="d-flex align-items-start flex-column mb-3">
          <h2 class="me-3 degree">${data.current.temp_c}<sup>°C</sup></h2>
          <img
            src="https:${data.current.condition.icon}"
            width="100"
            alt="weather icon"
          />
        </div>
        <p class="mt-5 text-info fs-4">${data.current.condition.text}</p>
        <div class="d-flex justify-content-between">
          <span><img src="images/icon-umberella.png" alt="" /> ${data.current.humidity}%</span>
          <span><img src="images/icon-wind.png" alt="" /> ${data.current.wind_kph}km/h</span>
          <span><img src="images/icon-compass.png" alt="" /> East</span>
        </div>
      </div>
    </div>
  `;

  document.getElementById("today-card").innerHTML = weather;
}

function secondDay(data) {
  let day = data.forecast.forecastday[1];
  var weather = `

    <div class="card text-white h-100">
              <div class="card-header">
                <span>${new Date(day.date).toLocaleDateString("en-US", {
                  weekday: "long",
                })}</span>
              </div>
              <div  class="card-body pe-5 text-center">
                <div class="d-flex flex-column align-items-center mb-3">
                  <img
                    class="mb-4"
                    src="https:${day.day.condition.icon}"
                    width="48"
                    alt="weather icon"
                  />
                  <h2 class="me-3">${day.day.maxtemp_c}<sup>°C</sup></h2>
                </div>
                <small class="text-secondary fs-5"> ${
                  day.day.mintemp_c
                }<sup>°C</sup></small>
                                <p class="mb-1 pt-3 text-info">${
                                  day.day.condition.text
                                }</p>

              </div>
            </div>
`;
  document.getElementById("second-day").innerHTML = weather;
}

function thirdDay(data) {
  let day = data.forecast.forecastday[2];
  var weather = `

    <div class="card text-white h-100">
              <div class="card-header">
                <span>${new Date(day.date).toLocaleDateString("en-US", {
                  weekday: "long",
                })}</span>
              </div>
              <div class="card-body pe-5 text-center">
                <div class="d-flex flex-column align-items-center mb-3">
                  <img
                    class="mb-4"
                    src="https:${day.day.condition.icon}"
                    width="48"
                    alt="weather icon"
                  />
                  <h2 class="me-3">${day.day.maxtemp_c}<sup>°C</sup></h2>
                </div>
             
              <small class="text-secondary fs-5"> ${
                day.day.mintemp_c
              }<sup>°C</sup></small>
                                <p class="mb-1 pt-3 text-info">${
                                  day.day.condition.text
                                }</p>
              </div>
            </div>
`;
  document.getElementById("third-day").innerHTML = weather;
}

async function search() {
  let city = document.getElementById("searchInput").value.trim();
  if (city === "") return;

  try {
    let todayRes = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=d0a578530bb14561aef192413252506&q=${city}`
    );
    let todayData = await todayRes.json();
    today(todayData);

    let forecastRes = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=d0a578530bb14561aef192413252506&q=${city}&days=3`
    );
    let forecastData = await forecastRes.json();
    secondDay(forecastData);
    thirdDay(forecastData);
  } catch (error) {
    console.error("Error", error);
  }
}
