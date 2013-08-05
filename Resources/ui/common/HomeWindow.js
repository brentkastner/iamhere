function HomeWindow() {
	
	var self = Ti.UI.createWindow({
		title:'PingYa',
    	backgroundColor:'#000000'
	});
	
	var latitude = '';
	var longitude = '';
	var accuracy = '';
		
	
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
	
	var emergencyButton = Titanium.UI.createButton({
		title: 'Quick Send',
		top: 200,
		width: 200,
		height: 100,
		color: 'black',
		backgroundColor: 'red',
		borderRadius: 15,
		borderWidth: 1,
		borderColor: '#9CC1E6',
		backgroundImage: 'NONE'
		
	});
	
	self.add(emergencyButton);
	
	
	button.addEventListener('click', function(e)
	{
		Titanium.API.info("Send Button Click");
		
		Ti.API.info('Longitude: ' + self.longitude);
		Ti.API.info('Latitude: ' + self.latitude);
		Ti.API.info('Accuracy: ' + self.accuracy);
		
		Titanium.Contacts.showContacts({
			selectedProperty: function(e) {
				Ti.API.info("Mobile Number: " + e.value);
			}
		})

	});
	
	emergencyButton.addEventListener('click', function(e) {
		Titanium.API.info("Emergency Button Click");
		var quickSend = Ti.App.Properties.getList('quickSend', []);
		
		if (quickSend.length > 0) {
			alert('We\'ve got records! ' + quickSend.length);
		} else {
			alert('Use settings to configure presets!');
		}
		
	});
	
	
	return self;
	
}

module.exports = HomeWindow;