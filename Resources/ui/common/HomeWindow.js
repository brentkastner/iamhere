function HomeWindow() {
	
	var self = Ti.UI.createWindow({
		title:'Home',
    	backgroundColor:'#fff'
	});
	
	var latitude = '';
	var longitude = '';
	var accuracy = '';
		
	//create component instance
	var self = Ti.UI.createWindow({
		backgroundColor:'#000000'
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
				self.latitude = e.coords.latitude;
				self.longitude = e.coords.longitude;
				self.accuracy = e.coords.accuracy;

			}
		});
		
		
	} else {
		alert('Please enable location services!');
	}
		
	
	var button = Titanium.UI.createButton({
		title: 'Send Location',
		top: 100,
		width: 200,
		height: 50
	});
	
	self.add(button);
	
	
	button.addEventListener('click', function(e)
	{
		Titanium.API.info("Button click");
		
		Ti.API.info('Longitude: ' + self.longitude);
		Ti.API.info('Latitude: ' + self.latitude);
		Ti.API.info('Accuracy: ' + self.accuracy);
		
		Titanium.Contacts.showContacts({
			selectedProperty: function(e) {
				Ti.API.info("Mobile Number: " + e.value);
			}
		})

	});
	
	
	return self;
	
}

module.exports = HomeWindow;