//content scripts

$(document).ready(function(){
	var current_tab;
	chrome.tabs.getSelected(null,function(tab) {
		//gets current tab url
		current_tab = tab.url;
		console.log(current_tab);
		//break up url 
		var url_split = current_tab.split('/');
		//is the domain
		var store_url = url_split[2];
		console.log(url_split);
		var myobject;
		var themeobject;
		//Go To Admin Function
		$('#go_to_admin').click(function(){
	 		jQuery.getJSON(current_tab + '.json', function(myobject) {
	 			function GoToAdmin(adminpath, adminId){
	 				console.log(adminId);
			  		chrome.tabs.create({ url: 'http://' + store_url + adminpath + adminId });
	 			}
	 			var productPath = '/admin/products/';
				var collectionPath = '/admin/collections/';
				//decide where to go
				if (url_split[3] === "products") {
					GoToAdmin(productPath, myobject.id);
				} else if (url_split[3] === "collections") {
					GoToAdmin(collectionPath, myobject.collection.id);
				} 
			}); //json call for go to admin end
		}); //Go To Admin Funcion End
		//Go to themes click
		$('#go_to_themes').click(function(){
			//go to themes get json
			jQuery.getJSON('https://' + store_url + '/admin/themes.json', function(themeobject) {
				var themeName, themeID, themeUpdate;
				console.log(themeobject);
				console.log(themeobject.themes.length);
				console.log(themeobject.themes[1]);

				for (var i = themeobject.themes.length - 1; i >= 0; i--) {
					themeobject.themes[i];
					$('#themes_table').append('<tr>' + '<td>' + themeobject.themes[i].name + '</td>' + '<td>' + themeobject.themes[i].updated_at + '</td>' + '<td><a class="go-to-code" href="https://' +  store_url + '/admin/themes/' + themeobject.themes[i].id + '">Go</a>' + '</td>'+ '<td><a class="go-to-preview" href="https://' + store_url + '/?preview_theme_id=' + themeobject.themes[i].id + '">Go</a>' + '</td>' + '</tr>');
				}

			});
		});	//go to themes end	

		//themes table create new tabs

		$('.go-to-code').on('click', function(){
			console.log('go to code clicked!');
		});

	});	//chrome tabs end
	//show themes panel
	$('#go_to_themes').click(function(){
		$('#go_to_options').hide();
		$('#themes_panel').show();
	});

	//show product details
	$('#product_info').click(function(){
		$('#go_to_options').hide();
		$('#product_info_panel').show();
	});

	
}); //document ready end

