$(document).ready(function () {

	// Global Variables
	var songKickKey = "1GlKTntzLGzcOL9Q";
	var artistEventArr = [];
	var cityEventArr = [];
	
	// This uses the texbox input to search for an aritst by name
	getArtist = () => {
		var artistName = $("#search").val();      
	
		$.ajax({
			url: "https://api.songkick.com/api/3.0/search/artists.json?apikey="+songKickKey+"&query="+artistName,
			method: "GET",
		}).then(function(responseArtist) {
			console.log(responseArtist);

			// This pulls the artist's ID number from the returned object.
			var artistID = responseArtist.resultsPage.results.artist[0].id;

			// This calls the function to find events using the artist's ID.
			getArtistEvents(artistID);

		});
	
	}

	// This uses the artist's ID to search for the artist's concert calendar.
	getArtistEvents = (id) => {
		$.ajax({
			url: "https://api.songkick.com/api/3.0/artists/"+id+"/calendar.json?apikey="+songKickKey,
			method: "GET"
		}).then(function(responseArtistCalendar) {
			console.log(responseArtistCalendar);

			// This puts the artist's events into an array.
			artistEventArr = responseArtistCalendar.resultsPage.results.event;

			// This puts the event's latitutude location into a variable.
			var eventLat = responseArtistCalendar.resultsPage.results.event[0].location.lat;
			
			// This puts the event's longitude location into a variable.
			var eventLng = responseArtistCalendar.resultsPage.results.event[0].location.lng;
			
			// This puts the event's name into a variable.
			var eventName = responseArtistCalendar.resultsPage.results.event[0].displayName;

			// This is an empty variable that will hold a specific event the user chooses.			
			var artistList;
			
			
			// For loop to cycle through the array of events.
			for (var i = 0; i < artistEventArr.length; i++){


				// This finds the artist's ID for each event in the loop.
				var eventArtist = responseArtistCalendar.resultsPage.results.event[i].performance[0].artist.id;
				
				
				// This sets each event to a variable.
				artistList = artistEventArr[i].displayName;
				
				// This dynamically sets each event to a separate div in the HTML.
				$(`<div><h1>${artistList}</h1><br><img src="http://images.sk-static.com/images/media/profile_images/artists/${eventArtist}/huge_avatar" height="100px" width="100px"><button class="eventBtn" data-event="0">Click Here</button></div>`).appendTo(".list-group");
			}

		});
	}

	// This uses the texbox input to search for an city by name. 
	getCity = () => {
		var cityName = $("#search").val();      
	
		$.ajax({
			url: "https://api.songkick.com/api/3.0/search/locations.json?query="+cityName+"&apikey="+songKickKey,
			method: "GET",
		}).then(function (responseCity) {
			console.log(responseCity);

			// This pulls the city's ID number from the returned object.
			var cityID = responseCity.resultsPage.results.location[0].metroArea.id;

			getCityEvents(cityID);

		});
	}
	
	// This uses the city's ID to search for the city's event calendar.
	getCityEvents = (id) => {
		$.ajax({
			url: "https://api.songkick.com/api/3.0/metro_areas/"+id+"/calendar.json?apikey="+songKickKey,
			method: "GET"
		}).then(function(responseCityCalendar) {
			console.log(responseCityCalendar);

			// This puts the city's events array into a variable.
			cityEventArr = responseCityCalendar.resultsPage.results.event;

			// This puts an events latitude into a variable.
			var eventLat = responseCityCalendar.resultsPage.results.event[0].location.lat;
			
			// This puts an events longitude into a variable.
			var eventLng = responseCityCalendar.resultsPage.results.event[0].location.lng;
			
			// This puts an events name into a variable.
			var eventName = responseCityCalendar.resultsPage.results.event[0].displayName;

			// This is an empty variable that will hold a specific event from the array.			
			var cityList;
			
			// For loop to cycle through the array of events.
			for (var i = 0; i < cityEventArr.length; i++){

				// This finds the artist's ID for each event in the loop.
				var eventArtist = responseCityCalendar.resultsPage.results.event[i].performance[0].artist.id;

				// This sets each event to a variable.
				cityList = cityEventArr[i].displayName;

				// This dynamically sets each event to a separate div in the HTML.
				$(`<div><h1>${cityList}</h1><br><img src="http://images.sk-static.com/images/media/profile_images/artists/${eventArtist}/huge_avatar" height="100px" width="100px"><button class="eventBtn" data-event="0">Click Here</button></div>`).appendTo(".list-group");
			}


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
