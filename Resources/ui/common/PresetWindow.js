function PresetWindow(_args) {
	
	var self = Ti.UI.createWindow({
		title: 'Preset Contacts',
    	backgroundColor:'#fff'
	});
	
	var addBtn = Titanium.UI.createButton({
		systemButton:Titanium.UI.iPhone.SystemButton.ADD
	});
	
	self.setRightNavButton(addBtn);
	
	addBtn.addEventListener('click', function(e) {
		
		var list = Ti.App.Properties.getList('quickSend', []);
		if (list.length == 3) {
			alert('A max of 3 presets please.');
		} else {
			
			Titanium.Contacts.showContacts({
			selectedProperty: function(e) {
			Ti.API.info("Selected Number: " + e.value);
			
			list.push(e.value);
			Ti.App.Properties.setList('quickSend', list);
			
			Ti.API.info('list length now: ' + list.length);
			//refresh tableview
			
			tableData = [];
			
				for (i=0; i<list.length; i++) {
					tableData.push({title: list[i]});
				};
			
			table.setData([]);
			table.setData(tableData);
	
			}
		})
		}
		

		
	});
	
	var quickSend = Ti.App.Properties.getList('quickSend', []);
	tableData = [];
	
	for (i=0; i<quickSend.length; i++) {
		tableData.push({title: quickSend[i]});
	};
	
	var table = Ti.UI.createTableView({
		data: tableData,
		editable: true
	});
	
	table.addEventListener('delete', function(e) {
		var currentList = Ti.App.Properties.getList('quickSend', []);
		Ti.API.info('Delete position: ' + e.index);
		
		currentList.splice(e.index,1);
		Ti.App.Properties.setList('quickSend', currentList);
		
		tableData = [];
		
		for (i=0; i<currentList.length; i++) {
			tableData.push({title: currentList[i]});
		};
		
		table.setData([]);
		table.setData(tableData);
		
	});

		
	Ti.API.info('List Length: ' + quickSend.length);
	

	self.add(table);
	
	
	return self;
}

module.exports = PresetWindow
