document.addEventListener("keypress",(enter) => {
	if(enter.which === 13) {
		createWidget();
	}
});

var blogs = document.querySelector(".blogs")

document.querySelector(".button").addEventListener("click",function(event) {
	createWidget();
});

function createWidget() {
	var cityName = document.querySelector(".inputCity").value;
	var elementName = document.querySelector(".inputId").value;

	if(elementName && cityName){
		var newDiv = document.createElement("div");
		newDiv.classList.add(elementName);
		blogs.append(newDiv);

		{var w = new Weather(
			cityName,
			newDiv,
		)}
	}

	else {
		alert("!!! City name and zip code not defined !!!")
	}
}
function Weather(city, element) {
	this.city = city;
	this.element = element;
	this.get();
}

Weather.prototype.get = function() {
	var self = this;
	self.element.innerHTML ='<div class="item">Loading...</div>'

	var xhr = new XMLHttpRequest;
	xhr.onloadend = function(e) {
		let response = JSON.parse(e.target.response);
		let item = response.list[0];
		self.draw(item);
	}

	xhr.open('GET', 'https://api.openweathermap.org/data/2.5/forecast?q='+ self.city +'&appid=a22e97f1e4e872aabcdf1d0a4726c22d&units=metric');
	xhr.send();
}

 Weather.prototype.draw = function(item) {
	var self = this;
	self.element.innerHTML = `
		<div class="item">
			<div class=item_name>`+self.city+`</div>
			<div class="item_main-temp">` + Math.round(item.main.temp) + " ℃ " + `</div>
			<div class="item_dt-txt">` + item.dt_txt + `</div>
			<button class="itemButton">Refresh</button>
		</div>`;

	self.element.querySelector(".itemButton").addEventListener("click", function(element){
		self.get()
	})
}