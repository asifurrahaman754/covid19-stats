"use strict";

//select the elements
var countryName = document.querySelector('.name');
var totalValue = document.querySelector('.total-cases .value');
var totalNewValue = document.querySelector('.total-cases .new-value');
var RecoverValue = document.querySelector('.recovered .value');
var RecoverNewValue = document.querySelector('.recovered .new-value');
var deathValue = document.querySelector('.deaths .value');
var deathNewValue = document.querySelector('.deaths .new-value');
var chart = document.querySelector('#axes_line_chart'); //app data variables
//get users country code

var country_name = geoplugin_countryName();
var user_country;
country_list.forEach(function (country) {
  if (country.name == country_name) {
    user_country = country_name;
  }
}); //fetch the info

function fetchData(user_country) {
  fetch("https://coronavirus-monitor.p.rapidapi.com/coronavirus/latest_stat_by_country.php?country=".concat(user_country), {
    "method": "GET",
    "headers": {
      "x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
      "x-rapidapi-key": "05d95540c6msh43efa3bb2625c36p1c26e2jsnb60207d8c0c3"
    }
  }).then(function (res) {
    return res.json();
  }).then(function (data) {
    var all_data = data.latest_stat_by_country[0];
    updateUI(data, all_data); //axexLinearChart();
  })["catch"](function (err) {
    console.log(err);
  });
}

fetchData(user_country); //update the info to the UI

function updateUI(mainData, all_data) {
  if (all_data.new_cases == "") {
    all_data.new_cases = 0;
  }

  if (all_data.new_deaths == "") {
    all_data.new_deaths = 0;
  }

  if (all_data.active_cases == "") {
    all_data.active_cases = 0;
  }

  countryName.innerHTML = mainData.country;
  totalValue.innerHTML = all_data.total_cases;
  totalNewValue.innerHTML = "+ ".concat(all_data.new_cases);
  RecoverValue.innerHTML = all_data.total_recovered;
  RecoverNewValue.innerHTML = "+ ".concat(all_data.active_cases);
  deathValue.innerHTML = all_data.total_deaths;
  deathNewValue.innerHTML = "+ ".concat(all_data.new_deaths);
} //creating the chart

/*let my_chart;
function axexLinearChart(){
	 my_chart = new Chart(chart, {
		type: 'line',
		data: {
			datasets: [{
				label: 'First dataset',
				data: parseInt(totalValue),
				fill: false,
				borderColor: "#fff",
			}],
			labels: ['January', 'February', 'March', 'April']
		},
		options: {
			responsive: true,
			maintainAspectRatio: false
		}
	});
} */