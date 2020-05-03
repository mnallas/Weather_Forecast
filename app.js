$(document).ready(function () {
  var apiKey = "a5eba74b4f1ac7f8bc5b0e9bfa0ae606";
  var cityName = "";

  $.ajax({
    type: "GET",
    url: `api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}`,
    dataType: "json",
  }).then(function (response) {
    console.log(response);
  });
});
