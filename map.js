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
		this.state = {map: null, enable: false, currentLocation : []};
		// this.setLocation = this.setLocation.bind(this);
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
		var location = new L.LatLng(lat, long);
		var marker = new L.marker(location, {title: title, opacity: 0.5});
		map.addLayer(marker);
	};//end function

	// setLocation(location){
	// 	this.setState({currentLocation: location});
	// }

	initMap(mapobject){
   		var	mymap = tomtom.L.map('mapid', {key:"OoB0oTRra3j9NWlkE9pncBVFRVAjlYwp"});
		var markers = tomtom.L.markerClusterGroup();

		this.currentLocation().then(function (res){
			//markerLocation
	  	  	var userLocation = new L.LatLng(res.coords.latitude, res.coords.longitude);
	  	  	var marker = new L.marker(userLocation, {title:"mylocation", opacity: 1});
	  	  	mymap.addLayer(marker);
	  	  	// 
	  	  	
	  	  	//set a point to init map - my current location
			mymap.setView([res.coords.latitude, res.coords.longitude], 18);
	  		var point = L.latLng(res.coords.latitude, res.coords.longitude);

	  		// this.setState({currentLocation: [res.coords.latitude, res.coords.longitude]});
	  		// console.log("point",point.distanceTo([-3.00614, -60.02575]));
	  		//return the distance bet two points
			// console.log(mymap.distance([res.coords.latitude, res.coords.longitude], [-3.00614, -60.02575]));
		
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
		this.flyingToLocation();
		var map = this.state.map;
		if(this.state.enable == false){
			map.keyboard.disable();

		} else {
			map.keyboard.enable();
			map._container.focus();
		}
	};


	flyingToLocation(){
		var map = this.state.map;
		var zoomOptions = {
			animate: true,
			duration: 2
		}
		map.flyTo([-3.01205, -60.01592], 18, zoomOptions);
	};//end funciton

	componentDidMount(){
		var map = this.initMap();
		
		this.addMarkerPins(map, -3.01205, -60.01592, "Sao Chico");
		this.addMarkerPins(map,-3.02776, -60.01493, "Novo Israel");
		this.addMarkerPins(map, -3.00317, -59.99174, "Monte das Oliveiras");
		this.addMarkerPins(map, -2.98956, -60.04288, "Taruma");

		// console.log("closest",L.LineUtil.closestPointOnSegment(map, [-3.01205, -60.01592], [-3.02776, -60.01493]));
		var latlngs = [[-3.01816, -60.02757],[-3.01881, -60.02784],[-3.01809, -60.02699],[-3.01744, -60.02748]];
		var polygon = L.polygon(latlngs, {color: 'blue'}).addTo(map);
		// zoom the map to the polygon
		map.fitBounds(polygon.getBounds());

		console.log("center poligon",polygon.getCenter())

		// var latlngs = [
		// 	[-3.01904, -60.02693],
		// 	[-3.01938, -60.02739],
		// 	[-3.0194, -60.02667]
		// ];
		// var polyline = L.polyline(latlngs, {
		// 	color: 'red'
		// }).addTo(map);
		// map.fitBounds(polyline.getBounds());

		var bounds = [
			[-3.01904, -60.02693],
			[-3.01938, -60.02739],
		];
		L.rectangle(bounds, {
			color: "#ff7800",
			weight: 1
		}).addTo(map);
		
		var southWest = L.latLng(-3.01904, -60.02693),
		northEast = L.latLng(-3.01938, -60.02739),
		bounds = L.latLngBounds(southWest, northEast);
		console.log("bounds", bounds.getNorth());
		console.log("contain", bounds.contains(-3.0189, -60.02589))

		// console.log("layers", map._layers);
		// console.log(map);


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