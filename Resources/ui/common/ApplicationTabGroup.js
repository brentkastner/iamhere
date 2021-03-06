function ApplicationTabGroup(Window) {
	
	var SettingsWindow = require('ui/common/SettingsWindow');
	var HomeWindow = require('ui/common/HomeWindow');
	//create module instance
	var self = Ti.UI.createTabGroup();
	
	//Workaround to set tabgroup to be used in other areas of the application
	//Titanium.UI.currentTabGroup = self; 
	
		//create app tabs
	var win1 = new HomeWindow();
	
	var win2 = new SettingsWindow();
	
	var tab1 = Ti.UI.createTab({
		title: "Ping Ya",
		icon: 'pinLocation.png',
		window: win1
	});
	win1.containingTab = tab1;
	
	var tab2 = Ti.UI.createTab({
		title: "Settings",
		icon: 'KS_nav_ui.png',
		window: win2
	});
	win2.containingTab = tab2;
	
	self.addTab(tab1);
	self.addTab(tab2);
	
	return self;

};

module.exports = ApplicationTabGroup;