//content scripts

$(document).ready(function(){
	var current_tab;
	chrome.tabs.getSelected(null,function(tab) {
		//gets current tab url
		current_tab = tab.url;
		console.log(current_tab);
		//break up url 
		var url_split = current_tab.split('/');
		var store_url = url_split[2];
		console.log(url_split);
		var myobject;
		
		
 		jQuery.getJSON(current_tab + '.json', function(myobject) {
 			function GoToAdmin(adminpath, adminId){
 				console.log(adminId);
		  		chrome.tabs.create({ url: 'http://' + store_url + adminpath + adminId });
 			}
 			var productPath = '/admin/products/';
			var collectionPath = '/admin/collections/';
			//decide where to go
			if (url_split[3] === "products") {
				//GoToAdmin(productPath, myobject.id);
			} else if (url_split[3] === "collections") {
				//GoToAdmin(collectionPath, myobject.collection.id);
			} 
		});
	});	
});

