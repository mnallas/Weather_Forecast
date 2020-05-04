$(document).ready(function () {
  var apiKey = "a5eba74b4f1ac7f8bc5b0e9bfa0ae606";
  var userInput = "";
  //   var current = moment().format("MMMM Do YYYY, h:mm:ss a");
  //   $("body").append(`<h1>${current}</h1>`);
  $(document).on("click", function (e) {
    e.preventDefault();
    userInput = $("#userInput").val();
    $("#userInput").val("");
    $.ajax({
      type: "GET",
      url: `https://api.openweathermap.org/data/2.5/forecast?units=imperial&q=${userInput}&appid=${apiKey}`,
      dataType: "json",
    }).then(function (response) {
      console.log(response);
      displayInfo(0);
      displayForecast();
    });
  });

  function displayInfo(num) {
    $.ajax({
      type: "GET",
      url: `https://api.openweathermap.org/data/2.5/forecast?units=imperial&q=${userInput}&appid=${apiKey}`,
      dataType: "json",
    }).then(function (response) {
      $("#info").remove();
      $("#mainDisplay").prepend(`<div id="info">
        <p>${response.list[num].dt_txt}</p>
        <p>${response.city.name}</p>
        <p>Sunrise: ${unixConverter(response.city.sunrise)}</p>
        <p>Sunset: ${unixConverter(response.city.sunset)}</p>
        <p>${response.list[num].main.temp}°F</p>
        <p>${response.list[num].main.temp_min}°F</p>
        <p>${response.list[num].main.temp_max}°F</p>
        <p>Humidity: ${response.list[num].main.humidity}</p>
        <p>Weather: ${response.list[num].weather[0].description}</p>
        <label for="customRange2">Time(on every 3 hours): </label>
        <input
          type="range"
          class="custom-range"
          min="0"
          max="8"
          id="customRange2"
        />
      </div>`);
    });
  }

  function displayForecast() {
    for (let i = 0; i < 5; i++) {
      $("#forecast").prepend(`    <div class="card" style="width: 14rem;">
    <div class="card-body">
      <h5 class="card-title">Special title treatment</h5>
      <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
      <p class="btn btn-primary">Look</p>
    </div>
  </div>`);
    }
  }

  function unixConverter(timestamp) {
    let unix_timestamp = timestamp;
    var date = new Date(unix_timestamp * 1000);
    var hours = date.getHours();
    var minutes = "0" + date.getMinutes();
    var seconds = "0" + date.getSeconds();
    var formattedTime =
      hours + ":" + minutes.substr(-2) + ":" + seconds.substr(-2);
    return formattedTime;
  }
});
