function SettingsWindow() {
	
	var self = Ti.UI.createWindow({
		title:'Settings',
    	backgroundColor:'#fff'
	});
	
	//need to grab app settings from the Ti.App local store
	var mapEngineIndex = Ti.App.Properties.getInt('mapEngine');
	Ti.API.info("mapEngineIndex: " + mapEngineIndex);
	
	var mapEngine = Titanium.UI.createTabbedBar({
    	labels:['Apple', 'Google', 'Bing'],
    	backgroundColor:'#336699',
    	top:30,
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
	
	return self;
	
	
}

module.exports = SettingsWindow;
