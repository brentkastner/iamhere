function HomeWindow() {
	var module = require('com.omorandi');
	var smsDialog = module.createSMSDialog();
	var latitude;
	var longitude;
	var coords = true;
	var address;

	var defaultMessage = Ti.App.Properties.getString('defaultMessage', 'I\'m sending you my location from PingYa, click the link!  ');
	
	var self = Ti.UI.createWindow({
		title:'Ping Ya',
    	backgroundColor:'#000000'
	});
	
		
	
	if (Ti.Geolocation.locationServicesEnabled) {
		//do stuff
		Ti.Geolocation.purpose = 'Get Current Location';
		Ti.Geolocation.accuracy = Ti.Geolocation.ACCURACY_BEST;
		Ti.preferredProvider = Ti.Geolocation.PROVIDER_GPS;
		
		var mapView = Titanium.Map.createView({
			mapType: Titanium.Map.STANDARD_TYPE,
			region: {latitude: latitude, longitude: longitude, latitudeDelta: .1, longitudeDelta: .1},
			animate:true,
			regionFit:true,
			userLocation:true,
			top: 2,
			height: 300,
			width: 300,
			borderRadius: 15,
			borderColor: '9CC1E6',
			borderWidth: 1
		});
		self.add(mapView);
		
		var locationLabel = Ti.UI.createLabel({
			top: 5,
			width: 295,
			height: 50,
			color: 'blue',
  			font: { fontSize:14 },
  			backgroundColor: 'white',
  			borderColor: '9CC1E6',
  			borderRadius: 15,
  			borderWidth: 1,
  			backgroundPaddingLeft: 10,
  			opacity: .8,
  			visible: false
		});
		
		self.add(locationLabel);
		
		locationLabel.addEventListener('click', function(e){
			if (coords == true) {
				var label = 'Swtiching to address mode';
				locationLabel.text = label;
				coords = false;
			} else {
				var label = 'Switching to coordinates mode';
				locationLabel.text = label;
				coords = true;
			}
		});
		
		Ti.Geolocation.addEventListener('location', function(e) {
			if (e.error) {
				alert('Error: ' + e.error);
			} else {
				latitude = e.coords.latitude;
				longitude = e.coords.longitude;
				Ti.API.info('longitude: ' + longitude);
				Ti.API.info('latitude: ' + latitude);
				mapView.region = {latitude: latitude, longitude: longitude, latitudeDelta: .06, longitudeDelta: .06};
				
				if (coords == true) {
					var labelText = '  Latitude: ' + latitude + '\n  Longitude: ' + longitude;
					locationLabel.text = labelText;
					locationLabel.visible = true;
				} else {
					Titanium.Geolocation.reverseGeocoder(latitude, longitude, function(evt){
						if (evt.success) {
							
							if (evt.places[0].displayAddress != undefined) {
								address = evt.places[0].displayAddress;
							} else {
								var street = evt.places[0].street;
								var city = evt.places[0].city;
								var zip = evt.places[0].postalCode;
								
								address = street + ', ' + city;
								//address = evt.places[0].address;
							}

						} else {
							address = "  No Address Found";
						}
					});
					var labelText = '  Address: Searching...';
					
					if (address != undefined) {
						labelText = '  Address: ' + address;
					}
					locationLabel.text = labelText;
					locationLabel.visible = true;
				}
			}
		});
		

		
	} else {
		alert('Please enable location services!');
	}
		
	
	var button = Titanium.UI.createButton({
		title: 'Send Location',
		top: 310,
		width: 125,
		height: 50,
		left: 20,
	});
	
	self.add(button);
	
	var emergencyButton = Titanium.UI.createButton({
		title: 'Quick Send',
		top: 310,
		width: 125,
		right: 20,
		height: 50,
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
		Ti.API.info('latitude: ' + latitude);
		Ti.API.info('longitude: ' + longitude);
		defaultMessage = Ti.App.Properties.getString('defaultMessage', 'I\'m sending you my location from PingYa, click the link!  ');
			Titanium.Contacts.showContacts({
				selectedProperty: function(e) {
				Ti.API.info("Mobile Number: " + e.value);
				
				sleepMyThread(777);
			
				if (smsDialog.isSupported() == true) {
					var iMessage = defaultMessage;
					
					if (coords == true) {
						iMessage = iMessage + ' maps.google.com\/maps?q=' + latitude + ',' + longitude;
					} else {
						iMessage = iMessage + ' ' + address;
					}
					
					
					Ti.API.info('message: ' + iMessage);
					smsDialog.recipients = [e.value];

					smsDialog.messageBody = iMessage;
					smsDialog.barColor = 'blue';
			
					smsDialog.open({animated: true});
				} else {
					alert('SMS is not supported on this device');
				}

				}
			})


	});
	
	emergencyButton.addEventListener('click', function(e) {
		Titanium.API.info("Emergency Button Click");
		Ti.API.info('latitude: ' + latitude);
		Ti.API.info('longitude: ' + longitude);
		var quicksend = [];
		smsDialog.recipients = [];
		quickSend = Ti.App.Properties.getList('quickSend', []);
		defaultMessage = Ti.App.Properties.getString('defaultMessage', 'I\'m sending you my location from PingYa, click the link!  ');

					
		var iMessage = defaultMessage;
		
		if (coords == true) {
			iMessage = iMessage + ' maps.google.com\/maps?q=' + latitude + ',' + longitude;
		} else {
			iMessage = iMessage + ' ' + address;
		}
		
		 
		if (smsDialog.isSupported() == true) {
			if (quickSend.length > 0) {
			
				for (i=0; i<quickSend.length; i++) {
					smsDialog.addRecipient(quickSend[i]);
				
				};
				
			smsDialog.messageBody = iMessage;
			smsDialog.barColor = 'red';
			smsDialog.open({animated: true});
			
			} else {
				alert('Use settings to configure presets!');
			}
		} else {
			alert('SMS is not supported on this device!');
		}


	});
	
	smsDialog.addEventListener('complete', function(e){
        Ti.API.info("Result: " + e.resultMessage);

        if (e.result == smsDialog.SENT)
        {
            //do something
        }
        else if (e.result == smsDialog.FAILED)
        {
           alert('Location Send Failed!  Try again!');
        }
        else if (e.result == smsDialog.CANCELLED)
        {
           //don't bother
        } 
    });
	
	function sleepMyThread(milliseconds)
	{
    	var startTime = new Date().getTime();

    	while((new Date().getTime() - startTime) < milliseconds)
    	{
    	}
	}
	
	return self;
	
}

module.exports = HomeWindow;