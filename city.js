$(document).ready(function () {

	// SongKick Key
    var songKickKey = "1GlKTntzLGzcOL9Q";
    var eventArr = [];

    
    getCity = () => {
		var cityName = $("#search").val();      
	
		$.ajax({
			url: "https://api.songkick.com/api/3.0/search/locations.json?query="+cityName+"&apikey="+songKickKey,
			method: "GET",
		}).then(function (responseCity) {
			console.log(responseCity);

			var cityID = responseCity.resultsPage.results.location[0].metroArea.id;

			//console.log(cityID);

			getCityEvents(cityID);

	});
	
	}
	
	getCityEvents = (id) => {
		$.ajax({
			url: "https://api.songkick.com/api/3.0/metro_areas/"+id+"/calendar.json?apikey="+songKickKey,
			method: "GET"
		}).then(function(responseCityCalendar) {
			console.log(responseCityCalendar);

			eventArr = responseCityCalendar.resultsPage.results.event;
			//var eventLat = responseCityCalendar.resultsPage.results.event[0].location.lat;
			//var eventLng = responseCityCalendar.resultsPage.results.event[0].location.lng;
			var eventName = responseCityCalendar.resultsPage.results.event[0].displayName;

			//for loop

			$(`<div><h1>${eventName}</h1><button class="eventBtn" data-event="0">Click Here</button></div>`).appendTo(".list-group");
	});
	}

	$("#searchBtn").on("click", getCity);
	$(document).on('click', '.eventBtn', function() {
		//console.log(eventArr[$(this).attr("data-event")])
	})
});
