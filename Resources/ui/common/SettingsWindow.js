function SettingsWindow() {
	
	var self = Ti.UI.createWindow({
		title:'Settings',
    	backgroundColor:'#fff'
	});
	


	var generalDataSet = [
    	{ title: 'Map Engine', hasChild:true, link:'ui/common/MapWindow'},
    	{ title: 'Preset Contacts', hasChild:true, link:'ui/common/PresetWindow'},
	];
	
	var tableView = Ti.UI.createTableView({ 
		
		data: generalDataSet,
		
		});

	
	self.add(tableView);

	tableView.addEventListener('click', function(e){
		
		if (e.rowData.link) {
			newWindow = require(e.rowData.link);
			Ti.API.info('link: ' + e.rowData.link);
			
			win = new newWindow({title:e.rowData.title,containingTab:self.containingTab,tabGroup:self.tabGroup});
			
		}
		self.containingTab.open(win,{animated:true});
		
	});
		
	return self;
	
	
}

module.exports = SettingsWindow;
