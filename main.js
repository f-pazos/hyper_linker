// Felipe Pazos, 5/27/2018. 
// hyper_linker javascript file. 

'use strict';

var imgs = []; 

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

    //Whenever the link input loses focus, check to see if the text leads to a valid image link. 
    $("#link_input").blur( function(){
	    var fr = new FileReader();
	    var link = $("#link_input").val();

	    img_exists( link, function (url){
		    console.log( url );

		    //Create the image. 
		    $("#img_display").append("<img id=\"" + image_index + "\" src=\"" + url + "\"hidden></img>");

		    $("#"+image_index).on("load",  function () { 
			    var w = this.width;
			    var h = this.height;

			    var new_h = 100;
			    var new_w = w*new_h/h;

			    $(this).height(new_h).width(new_w).show();

			    $("#link_input").val("");
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


