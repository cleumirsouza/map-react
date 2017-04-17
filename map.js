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


	addMarkerPins(map, lat, long){
		var markerOptions = {
	        icon: tomtom.L.icon({
	            iconUrl: "tomtom/images/marker.png",
	            iconSize: [30, 34],
	            iconAnchor: [15, 34]
	        })
  	  	};
		tomtom.L.marker([lat, long], markerOptions).addTo(map);
	}//end function
	

	initMap(mapobject){
   		var	mymap = tomtom.L.map('mapid', {key:"OoB0oTRra3j9NWlkE9pncBVFRVAjlYwp"});
		
		// this.currentLocation().then(function (res){
		// 	mymap.setView([39, -97.5], 4);
		// });	

		mymap.setView([39, -97.5], 4);
		mymap._container.focus();
    	
		return mymap;
	};//end function


	componentDidMount(){
		var map = this.initMap();
		this.addMarkerPins(map, 43.26456, -71.5702);
		this.addMarkerPins(map, 39.73845, -104.98485);
		this.addMarkerPins(map, 34.05224, -118.24334);
	
	}
	
	render(){

		return (
			<div id='container' >
				<div id='mapid'></div>
			</div>
		)


	}
}

ReactDOM.render(<MapRender/>, document.querySelector("#myapplicationmap"));