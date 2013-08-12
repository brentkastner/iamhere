function MessageWindow(_args) {
	
	var defaultMessage = Ti.App.Properties.getString('defaultMessage', 'I\'m sending you my location from PingYa, click the link!  ');
	
	var self = Ti.UI.createWindow({
		title: 'Message Default',
    	backgroundColor:'#fff'
	});
	
	var messageWindow = Ti.UI.createTextArea({
		borderRadius: 15,
		borderColor: '9CC1E6',
		borderWidth: 1,
		color: '#000000',
		top: 30,
		width: 200,
		height: 60,
		value: defaultMessage
	});
	
	self.add(messageWindow);
	
	var saveButton = Ti.UI.createButton({
		title: 'Save',
		top: 110,
		left: 95
	});
	
	self.add(saveButton);
	
	var clearButton = Ti.UI.createButton({
		title: 'Clear',
		top: 110,
		left: 170
	});
	
	self.add(clearButton);
	
	clearButton.addEventListener('click', function(e) {
		messageWindow.setValue('');
	});
	
	saveButton.addEventListener('click', function(e) {
		var newMessage = messageWindow.getValue();
		
		Ti.App.Properties.setString('defaultMessage', newMessage);
		
	});
	
	return self;
}

module.exports = MessageWindow;
