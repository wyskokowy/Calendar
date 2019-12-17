/* Modal inputs & btn */
const cityInput = document.querySelector("#city");
const countryInput = document.querySelector("#country");
const saveLocationBtn = document.querySelector("#saveLocationBtn");

const weatherLocation = {
  city: "Liverpool",
  country: "UK"
};

/* Change weather location */
saveLocationBtn.addEventListener("click", async () => {
  /* Countries info API - alpha2Code needed - get by country name */
  const response = await fetch("https://restcountries.eu/rest/v2/all");
  if (response.ok) {
    const data = await response.json();
    /* Some country names are official - user can use alternative names */
    if (
      countryInput.value === "United Kingdom" ||
      countryInput.value === "Great Britain" ||
      countryInput.value === "Scotland" ||
      countryInput.value === "England" ||
      countryInput.value === "Wales" ||
      countryInput.value === "Northern Ireland"
    ) {
      countryInput.value =
        "United Kingdom of Great Britain and Northern Ireland";
    }
    /* Find country by name */
    const countryData = await data.find(c => c.name === countryInput.value);
    if (countryData === undefined) {
      alert("Please write full country name.");
    }
    /* Change city */

    weatherLocation.city = await cityInput.value;
    /* Change country pushing alpha2Code to Weather API */
    weatherLocation.country = await countryData.alpha2Code;
    $("#locationModal").modal("hide");
    getWeather();
  } else {
    throw new Error(response.status);
  }
});

async function getWeather() {
  /* Weather API with 'weatherLocation' object data */
  let response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${weatherLocation.city},${weatherLocation.country}&units=metric&appid=cbdc72861980f26997ea4e5b9c98c849`
  );

  if (response.ok) {
    const data = await response.json();
    /* Select div & create UI */
    const weather = document.querySelector("#weather");
    weather.innerHTML = `
        <img src="http://openweathermap.org/img/wn/${
          data.weather[0].icon
        }@2x.png">
        <div class="h3">
            <span class="txt-shad h5 text-uppercase">${data.name}</span>
            <sup>
                <i id="changeLocBtn" class="txt-shad btn btn-sm text-primary fas fa-edit" data-toggle="modal" data-target="#locationModal"></i>          
            </sup>
        </div>
        <h2 class="txt-shad h5">${parseFloat(data.main.temp.toFixed(1))}&deg;C</h2>
        `;
  } else {
    throw new Error(response.status);
  }
}

getWeather();
