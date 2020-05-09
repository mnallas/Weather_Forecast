$(document).ready(function () {
  var apiKey = "a5eba74b4f1ac7f8bc5b0e9bfa0ae606";
  var userInput = "";
  var searchNum = 0;
  var arrSearch = JSON.parse(localStorage.getItem(`search`)) || [];
  console.log(arrSearch);
  var searchList = [];
  // var inputArray = [];
  //   var current = moment().format("MMMM Do YYYY, h:mm:ss a");
  //   $("body").append(`<h1>${current}</h1>`);
  $(document).on("click", "#submitBtn", function (e) {
    e.preventDefault();
    userInput = $("#userInput").val();
    arrSearch.push(userInput);
    renderSearch(arrSearch);

    localStorage.setItem("search", JSON.stringify(arrSearch));
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

  $(document).on("slide", function (event, ui) {
    console.log(ui.value);
  });

  function renderSearch(arr) {
    $("#list").empty();
    for (let i = 0; i < arr.length; i++) {
      $("#list").prepend(`<li class="list-group-item">${arr[i]}</li>`);
    }
  }

  function displayInfo(num) {
    $.ajax({
      type: "GET",
      url: `https://api.openweathermap.org/data/2.5/forecast?units=imperial&q=${userInput}&appid=${apiKey}`,
      dataType: "json",
    }).then(function (response) {
      $("#info").remove();
      $("#mainDisplay").prepend(`<div id="info">
        <p>${response.list[num].dt_txt}</p>
        <img src="http://openweathermap.org/img/wn/${
          response.list[num].weather[0].icon
        }@2x.png" alt="WeatherIcon">
        <p>${response.city.name}</p>
        <p>Sunrise: ${unixConverter(response.city.sunrise)}</p>
        <p>Sunset: ${unixConverter(response.city.sunset)}</p>
        <p>${response.list[num].main.temp}°F</p>
        <p>Humidity: ${response.list[num].main.humidity}%</p>
        <p>Weather: ${response.list[num].weather[0].description}</p>
        <label for="customRange2">Time(on every 3 hours): </label>
        <input
          type="range"
          class="custom-range"
          min="0"
          max="7"
          id="customRange"
        />
      </div>`);
    });
  }

  function displayForecast() {
    $("#forecast").empty();
    $.ajax({
      type: "GET",
      url: `https://api.openweathermap.org/data/2.5/forecast?units=imperial&q=${userInput}&appid=${apiKey}`,
      dataType: "json",
    }).then(function (response) {
      for (let i = 0; i < 5; i++) {
        $("#forecast")
          .append(`    <div class="card mr-2 mb-2" style="width: 14rem;">
    <div class="card-body">
       <h5 class="card-title">${response.list[8 * i].dt_txt}</h5>
       <img src="http://openweathermap.org/img/wn/${
         response.list[8 * i].weather[0].icon
       }.png" alt="WeatherIcon">
      <p class="card-text">Temp: ${response.list[8 * i].main.temp}°F</p>
      <p class="card-text">Humidity: ${response.list[8 * i].main.humidity}%</p>
    </div>
  </div>`);
      }
    });
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
