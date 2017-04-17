class MapRender extends React.Component{

	// oldFunct(){
		// console.log(mymap);
			// L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token='+token+'', {
			// maxZoom: 18,
			// attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
			// 	'<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
			// 	'Imagery © <a href="http://mapbox.com">Mapbox</a>',
			// id: 'mapbox.streets'
			// }).addTo(mymap);

			// console.log("map", mymap);
			// console.log("L", L);
			// window.location.href = "#mapid";	

			// mymap.attributionControl;
			// L.marker([res.coords.latitude, res.coords.longitude]).addTo(mymap)
			// 	.bindPopup("<b>Hello world!</b><br />I am a popup.").openPopup();

			// L.circle([51.508, -0.11], 500, {
			// 	color: 'red',
			// 	fillColor: '#f03',
			// 	fillOpacity: 0.5
			// }).addTo(mymap).bindPopup("I am a circle.");

			// L.polygon([
			// 	[51.509, -0.08],
			// 	[51.503, -0.06],
			// 	[51.51, -0.047]
			// ]).addTo(mymap).bindPopup("I am a polygon.");


			// var popup = L.popup();

			// function onMapClick(e) {
			// 	popup
			// 		.setLatLng(e.latlng)
			// 		.setContent("You clicked the map at " + e.latlng.toString())
			// 		.openOn(mymap);
			// }

			// mymap.on('click', onMapClick);
	// }

	constructor(){
		super();
		this.addMarkerPins = this.addMarkerPins.bind(this);
		this.currentLocation = this.currentLocation.bind(this);
		this.initMap = this.initMap.bind(this);
		this.setkeyBoad = this.setkeyBoad.bind(this);
		this.state = {map: null, enable: false};
		// this.cauculateDistance = this.cauculateDistance.bind(this.currentLocation);
	}

	currentLocation (){
		return new Promise(function (result, reject){
			window.navigator.geolocation.getCurrentPosition(function (res){
				result(res);
			}, function (err){
				reject(err);
			});
		});
	};//end function


	addMarkerPins(map, lat, long, title = null){
		var markerOptions = {
	        icon: tomtom.L.icon({
	            iconUrl: "tomtom/images/marker.png",
	            iconSize: [30, 34],
	            iconAnchor: [15, 34]
	        })
  	  	};
		tomtom.L.marker([lat, long], markerOptions).addTo(map).bindPopup(title + " => " + lat +" || " + long);
	};//end function



	initMap(mapobject){
   		var	mymap = tomtom.L.map('mapid', {key:"OoB0oTRra3j9NWlkE9pncBVFRVAjlYwp"});
		var markers = tomtom.L.markerClusterGroup();

		this.currentLocation().then(function (res){
			
			var markerOptions = {
		        icon: tomtom.L.icon({
		            iconUrl: "tomtom/images/locate_me_btn.png",
		            iconSize: [30, 30],
		            iconAnchor: [15, 15]
		        })
	  	  	};

			var marker = tomtom.L.marker([res.coords.latitude, res.coords.longitude], markerOptions).addTo(mymap);
			
			marker.bindPopup("My Posistion: "+ res.coords.latitude + " || "+ res.coords.longitude);

			mymap.setView([res.coords.latitude, res.coords.longitude], 14);

	  		var point = L.latLng(res.coords.latitude, res.coords.longitude);

	  		console.log("point",point.distanceTo([-3.00614, -60.02575]));
	  		//return the distance bet two points
			console.log(mymap.distance([res.coords.latitude, res.coords.longitude], [-3.00614, -60.02575]));
		
		});	


		mymap.on('click', function (e){
			 tomtom.L.popup().setLatLng(e.latlng).setContent(e.latlng.toString()).openOn(mymap);
		});

		
		mymap._container.focus();
		this.setState({map: mymap});
		return mymap;
	};//end function

	setkeyBoad(){
		 this.setState(prevState => ({
      		enable: !prevState.enable
    	}));
		
		var map = this.state.map;
		if(this.state.enable == false){
			map.keyboard.disable();
			
		}else{
			map.keyboard.enable();
			map._container.focus();
		}
		// console.log("teste", map);
	}

	componentDidMount(){
		var map = this.initMap();
		// console.log(map.keyboard);
		// map.keyboard.disable();
		// console.log("state",this.state.map);
		
		this.addMarkerPins(map, -3.01205, -60.01592, "Sao Chico");
		this.addMarkerPins(map,-3.02776, -60.01493, "Novo Israel");
		this.addMarkerPins(map, -3.00317, -59.99174, "Monte das Oliveiras");

	};
	
	render(){

		return (
			<div id='container' >
				<div id='mapid'></div>
				<button onClick={this.setkeyBoad}>{this.state.enable == true ? "Enable": "Disable"}</button>
			</div>

		)


	}
}

ReactDOM.render(<MapRender/>, document.querySelector("#myapplicationmap"));