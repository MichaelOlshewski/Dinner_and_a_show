$(document).ready(function () {

	// SongKick Key
	var songKickKey = "1GlKTntzLGzcOL9Q";
	var artistEventArr = [];
	var cityEventArr = [];
	

	getArtist = () => {
		var artistName = $("#search").val();      
	
		$.ajax({
			url: "https://api.songkick.com/api/3.0/search/artists.json?apikey="+songKickKey+"&query="+artistName,
			method: "GET",
		}).then(function(responseArtist) {
			console.log(responseArtist);

			var artistID = responseArtist.resultsPage.results.artist[0].id;

			//console.log(artistID);

			getArtistEvents(artistID);

	});
	
	}
	
	getArtistEvents = (id) => {
		$.ajax({
			url: "https://api.songkick.com/api/3.0/artists/"+id+"/calendar.json?apikey="+songKickKey,
			method: "GET"
		}).then(function(responseArtistCalendar) {
			console.log(responseArtistCalendar);

			artistEventArr = responseArtistCalendar.resultsPage.results.event;
			//var eventLat = responseArtistCalendar.resultsPage.results.event[0].location.lat;
			//var eventLng = responseArtistCalendar.resultsPage.results.event[0].location.lng;
			//var eventName = responseArtistCalendar.resultsPage.results.event[0].displayName;
			//var artistList;
		//	for (var i = 0;i<=artistEventArr.length;i++){
		//	artistList += artistEventArr[i];
		//}

		//	$(`<div><h1>${artistList}</h1><button class="eventBtn" data-event="0">Click Here</button></div>`).appendTo(".list-group");
	});
	}

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

			cityEventArr = responseCityCalendar.resultsPage.results.event;
			//var eventLat = responseCityCalendar.resultsPage.results.event[0].location.lat;
			//var eventLng = responseCityCalendar.resultsPage.results.event[0].location.lng;
			//var eventName = responseCityCalendar.resultsPage.results.event[0].displayName;
			var cityList;

			for (var i = 0;i<cityEventArr.length;i++){
				cityList += cityEventArr[i].displayName;
			}

			$(`<div><h1>${cityList}</h1><button class="eventBtn" data-event="0">Click Here</button></div>`).appendTo(".list-group");

			console.log(cityEventArr);
	});
	}

	$("#searchBtn").on("click", function() {
		getCity();
		getArtist();
	});

	//$(document).on('click', '.eventBtn', function() {
		//console.log(eventArr[$(this).attr("data-event")])
	//})
});
