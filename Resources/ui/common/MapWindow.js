function MapWindow(_args) {
		
	//need to grab app settings from the Ti.App local store, set default to Apple if not set
	var mapEngineIndex = Ti.App.Properties.getInt('mapEngine', 0);
	Ti.API.info("mapEngineIndex: " + mapEngineIndex);
	
	var self = Ti.UI.createWindow({
		title: 'Map Engine',
    	backgroundColor:'#fff'
	});
	
	var mapLabel = Ti.UI.createLabel({
		text: "Select Map Provider",
		top: 20
	});
		
	
	self.add(mapLabel);
	
	var mapEngine = Titanium.UI.createTabbedBar({
    	labels:['Apple', 'Google', 'Bing'],
    	backgroundColor:'#336699',
    	top:50,
    	style:Titanium.UI.iPhone.SystemButtonStyle.BAR,
    	height:25,
    	width:200,
    	index:mapEngineIndex
	});
	
	self.add(mapEngine);
	
	mapEngine.addEventListener('click', function(e){
		//save button selection
		Ti.App.Properties.setInt('mapEngine', e.index);
		
		Ti.API.info("Value of button click: " + e.index);
	});

	
				
		if (Ti.Geolocation.locationServicesEnabled) {
		//do stuff
		Ti.Geolocation.purpose = 'Get Current Location';
		Ti.Geolocation.accuracy = Ti.Geolocation.ACCURACY_BEST;
		Ti.preferredProvider = Ti.Geolocation.PROVIDER_GPS;
		
		Ti.Geolocation.getCurrentPosition(function(e) {
			if (e.error) {
				alert('Error: ' + e.error);
			} else {
				Ti.API.info(e.coords);
				var latitude = e.coords.latitude;
				var longitude = e.coords.longitude;
				var accuracy = e.coords.accuracy;
				
				
				var mapView = Titanium.Map.createView({
				mapType: Titanium.Map.STANDARD_TYPE,
				region: {latitude: latitude, longitude: longitude, latitudeDelta: .1, longitudeDelta: .1},
				animate:true,
				regionFit:true,
				userLocation:true,
				top: 100,
				height: 300,
				width: 300,
				borderRadius: 15,
				borderColor: '9CC1E6',
				borderWidth: 1
				});
				self.add(mapView);

			}
		});
		
		
	} else {
		alert('Please enable location services!');
	}




	
	return self;
};

module.exports = MapWindow;
