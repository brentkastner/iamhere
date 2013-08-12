function HomeWindow() {
	var module = require('com.omorandi');
	var smsDialog = module.createSMSDialog();
	
	var defaultMessage = Ti.App.Properties.getString('defaultMessage', 'I\'m sending you my location from PingYa, click the link!  ');
	
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
		top: 50,
		width: 200,
		height: 50
	});
	
	self.add(button);
	
	var emergencyButton = Titanium.UI.createButton({
		title: 'Quick Send',
		top: 150,
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
		
		
		Ti.API.info('Longitude: ' + self.longitude);
		Ti.API.info('Latitude: ' + self.latitude);
		Ti.API.info('Accuracy: ' + self.accuracy);
		var iMessage = defaultMessage  + ' maps.google.com\/maps?q=' + self.latitude + ',' + self.longitude;
		Ti.API.info('message: ' + iMessage);
		Titanium.Contacts.showContacts({
			selectedProperty: function(e) {
				Ti.API.info("Mobile Number: " + e.value);
				
			sleepMyThread(777);
			
				if (smsDialog.isSupported() == true) {
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
		var quicksend = [];
		smsDialog.recipients = [];
		quickSend = Ti.App.Properties.getList('quickSend', []);
		
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
		
		var iMessage = defaultMessage  + ' maps.google.com\/maps?q=' + self.latitude + ',' + self.longitude;
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