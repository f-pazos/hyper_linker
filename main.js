// Felipe Pazos, 5/27/2018. 
// hyper_linker javascript file. 

'use strict';

var img_info = new Map(); 

// Note, [image_index] always points to the next spot in imgs. 
var image_index = 0; 

// Checks whether or not an image exists at [url]. If yes, calls [f]. 
function img_exists ( url , f){
	var img = new Image();

	img.onload = function() { f(url) };
	img.onerror = function() { };

	img.src = url;
}



$(document).ready(function() {

    //Whenever the link input changes, check to see if the text leads to a valid image link. 
    $("#link_input").bind("input", function(){
	    var fr = new FileReader();
	    var link = $("#link_input").val();

	    //Whenever we have a link that exists, add it to the images we have. 
	    img_exists( link, function (url){

		    //Create a div and add an image. 
		    $("#img_display").append("<div class=\"im_box\" id=\"box_" + image_index + 
			    "\"></div>");
		    $("#box_"+image_index).append("<img class=\"im_box\" id=\"img_" + image_index + "\" src=\"" + url + "\"hidden></img>");

		    //TODO: Make resizing more flexible. 
		    //Whenever that image loads, go ahead and resize it. 
		    //Currently, resizes so that height is always 100.  
		    $("#img_"+image_index).on("load",  function () { 
			    var w = this.width;
			    var h = this.height;

			    var new_h = 100;
			    var new_w = w*new_h/h;

			    // Resize the box and show the image. 
			    $("#box_" + image_index).height(new_h).width(new_w).show();
			    $("#img_" + image_index).show();

			    //Clear the text field.
			    $("#link_input").val("");


			    //Object to maintain important info about each image box. 
			    var inf = {
				    //DOM elements associated with this image. 
				    box: $("box_" + image_index),
				    img: $("img_" + image_index),

				    //Dimensions
				    width: w,
				    height: h,
				    icon_w: new_w,
				    icon_h: new_h,

				    //The URL to the image itself. 
				    url: url};
			    //Update the map so we have all the data we need. 
			    img_info.set( image_index, inf );

			    console.log( img_info );
			    image_index++;
		    });

		    
	    });


	    
    });


    //Whenever someone uploads a file, use it in links.
    $("#file_input").change( function(){
        if ( FileReader ){
		var fr = new FileReader();
		var uploaded = $("#file_input").get()[0].files;
		console.log( uploaded );

		for( var i = 0; i < uploaded.length; i++){
			if( uploaded[i] && uploaded[i].type.includes( "image" )){
				(uploaded[i] );	 
			}
		}

		console.log( imgs );
	}
	else {
		alert( "Sorry, file upload is not currently supported for this browser." );
	}
    });


});


