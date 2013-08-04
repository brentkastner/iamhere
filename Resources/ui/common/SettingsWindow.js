function SettingsWindow() {
	
	var self = Ti.UI.createWindow({
		title:'Settings',
    	backgroundColor:'#fff'
	});
	
	var label = Ti.UI.createLabel({
		color: '#000000',
		text: 'Settings Area',
		height: 'auto',
		width: 'auto'
	});
	
	self.add(label);
	
	label.addEventListener('click', function(e) {
		alert(e.source.text);
	});
	
	return self;
	
	
}

module.exports = SettingsWindow;
