/*!
 * Start Bootstrap - Agency Bootstrap Theme (http://startbootstrap.com)
 * Code licensed under the Apache License v2.0.
 * For details, see http://www.apache.org/licenses/LICENSE-2.0.
 */

// jQuery for page scrolling feature - requires jQuery Easing plugin
$(function() {
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });
});

// Highlight the top nav as scrolling occurs
$('body').scrollspy({
    target: '.navbar-fixed-top'
})

// Closes the Responsive Menu on Menu Item Click
$('.navbar-collapse ul li a').click(function() {
    $('.navbar-toggle:visible').click();
});


	function initialize() {
        var mapOptions = {
		zoom: 18,
        scrollwheel: false,
        mapTypeControl: false,
        disableDefaultUI: true,
		center: new google.maps.LatLng(48.127465, 11.59797,17),
		styles: [
    {
        "featureType": "all",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "simplified"
            },
            {
                "invert_lightness": true
            },
            {
                "hue": "#000000"
            },
            {
                "saturation": -100
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [
            {
                "color": "#1a1a1a"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#474747"
            }
        ]
    },
    {
    featureType: "poi",
    stylers: [
      { visibility: "off" }
    ]   
  },        
    {
        "featureType": "administrative",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels.text",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "weight": 0.1
            }
        ]
    }
]						
	};

map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);

        
 var contentString = '<div id="mapContent">'+'<span>Lothringer 13 Halle</span><br>Lothringer Straße 13<br>81667 München'+'</div>';

  var infowindow = new google.maps.InfoWindow({
      content: contentString
  });

  var iconBase = 'http://felix-schneider.net/neu/img/marker.png';      
  var marker = new google.maps.Marker({
      position: new google.maps.LatLng(48.127465, 11.59797,17),
      map: map,
      title: 'Lothringer 13',
      icon: iconBase
  });
  google.maps.event.addListener(marker, 'click', function() {
    infowindow.open(map,marker);
  });
        
        
    
        
}



						