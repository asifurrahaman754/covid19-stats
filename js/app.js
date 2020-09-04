
//select the elements
const countryName = document.querySelector('.name');
const totalValue = document.querySelector('.total-cases .value');
const totalNewValue = document.querySelector('.total-cases .new-value');
const RecoverValue = document.querySelector('.recovered .value');
const RecoverNewValue = document.querySelector('.recovered .new-value');
const deathValue = document.querySelector('.deaths .value');
const deathNewValue = document.querySelector('.deaths .new-value');
//const chart = document.querySelector('#axes_line_chart');

let country_name, user_country;

country_name = "Bangladesh";
 country_list.forEach(country => {
	 if(country.name == country_name ){
		 user_country = country_name;
		 
	 }
 });

//fetch the info
function fetchData(user_country){

	fetch(`https://coronavirus-monitor.p.rapidapi.com/coronavirus/latest_stat_by_country.php?country=${user_country}`, {
		"method": "GET",
		"headers": {
			"x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
			"x-rapidapi-key": "05d95540c6msh43efa3bb2625c36p1c26e2jsnb60207d8c0c3"
		}
	})
	.then(res => {
		return res.json();
	})
	.then(data => {
		let all_data = data.latest_stat_by_country[0];
		updateUI(data,all_data);
		//axexLinearChart();
	})
	.catch(err => {
		console.log(err)
	})

	//when user selects a counry the box hide itself
	search_country.classList.add('hide');
}
fetchData(user_country)

//update the info to the UI
function updateUI(mainData, all_data){
	if(all_data.new_cases == ""){
		all_data.new_cases = 0;
	}
	if(all_data.new_deaths == ""){
		all_data.new_deaths = 0;
	}
	if(all_data.active_cases == ""){
		all_data.active_cases = 0;
	}

	countryName.innerHTML = mainData.country;
	totalValue.innerHTML = all_data.total_cases;
	totalNewValue.innerHTML = `+ ${all_data.new_cases}`;
	RecoverValue.innerHTML = all_data.total_recovered;
	RecoverNewValue.innerHTML = `+ ${all_data.active_cases}`;
	deathValue.innerHTML = all_data.total_deaths;
	deathNewValue.innerHTML = `+ ${all_data.new_deaths}`;
}

//creating the chart
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