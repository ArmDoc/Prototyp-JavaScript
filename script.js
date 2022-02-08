document.addEventListener("keypress",(enter) => {
	if(enter.which === 13) {
		var w = new Weather(
			document.querySelector(".inputCity").value,
			".blog" + document.querySelector(".inputId").value
		);
	}
});

document.querySelector(".button").addEventListener("click",function() {
	var w = new Weather(
		document.querySelector(".inputCity").value,
		".blog" + document.querySelector(".inputId").value
	);
});

function Weather(city, element) {
	this.city = city;
	this.element = element;
	this.draw();
}

 Weather.prototype.draw = function() {
	var self = this;
	var box = document.querySelector(self.element);
	box.innerHTML = '';
	$.ajax({
		url:'https://api.openweathermap.org/data/2.5/forecast?q='+ self.city +'&appid=a22e97f1e4e872aabcdf1d0a4726c22d&units=metric',
		success: function (respons) {
			let item = respons.list[0]
			box.innerHTML = `
				<div class="item">
					<div class=item_name>`+self.city+`</div>
					<div class="item_main-temp">` + Math.round(item.main.temp) + " ℃ " + `</div>
					<div class="item_dt-txt">` + item.dt_txt + `</div>
					<button class="itemButton">Refresh</button>
				</div>`;

			box.querySelector(".itemButton").addEventListener("click", function(element){
				self.draw(element)
			})
		} 
	});
}