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
	
	return self;
};

module.exports = MapWindow;
