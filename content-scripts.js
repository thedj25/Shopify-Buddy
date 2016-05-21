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
		//test for querys
		console.log(url_split[4].split('?')[0]);
		url_split
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
			$('#go_to_options').hide();
			$('#themes_panel').show();
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

			}).fail(function() { alert('please login to Shopify before using Go To Theme Functionality'); });//json get themes end
		});	//go to themes end	
		//themes table create new tabs
		$('#themes_panel').on("click", ".go-to-code", function(){
			var theme_link = $(this).attr("href");
			chrome.tabs.create({ url: theme_link });
		});

		$('#themes_panel').on("click", ".go-to-preview", function(){
			var theme_link = $(this).attr("href");
			chrome.tabs.create({ url: theme_link });
		});

		//Get product info/product info tab
		$('#product_info').click(function(){
			$('#go_to_options').hide();
			$('#product_info_panel').show();
			$.getJSON(current_tab.split('?')[0] + '.json', function(product_object) {
				function output_product_info() {
					console.log(product_object.product);
					$('#product_title').text(product_object.product.title);
					$('#product_id').text(product_object.product.id);
					$('#product_handle').text(product_object.product.handle);
					$('#product_type').text(product_object.product.product_type);
					var template = product_object.product.template_suffix;
					if (template ==="") {
						$('#product_template').text('product');
					} else {
					$('#product_template').text(product_object.product.template_suffix);
					}
					var product_tags =  product_object.product.tags.split(',');
					console.log(product_tags[1]);
					for (var i = 0; i < product_tags.length; i++) {
						$('#product_tags').append('<li>' + product_tags[i] + '</li>');
					}
					//go to product template button
					var product_theme_template = product_object.product.template_suffix;
					$('#go_to_template').click(function(){
						jQuery.getJSON('https://' + store_url + '/admin/themes.json', function(themeobject) {
							// need to find published theme inside of theme object. 
							// when we know the punlished theme we can go to the correct produc template for the live theme. 
						})
					});

				}//output product info end

				if (url_split[3].split('?')[0] === "products") {
					output_product_info();
				} else if (url_split[5].split('?')[0] === "products") {
					output_product_info();
				} else {
					console.log('you are on a product pge not');
				}
				
			}).fail(function() { alert('please go to a product page to use this')});
		});//product panel end




	});	//chrome tabs end

	
}); //document ready end

