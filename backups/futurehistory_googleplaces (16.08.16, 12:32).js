(function($) {
  Drupal.futurehistoryGeolocation = Drupal.futurehistoryGeolocation || {};

 // var place = '';
  Drupal.futurehistoryGeolocation.getFHbounds = function(place) {
    if (place == '' ){
     alert('bitte eine Ort auswaehlen')
    } else {     
      var fh_cookie = {};      
      if (place.geometry.viewport) {
        fh_cookie = {viewport:1, bounds:place.geometry.viewport, point:place.geometry.location } ;
        window.location.href = "/de/fh-entdecken-map";
        // now Forward to map with viewport in session or request
      } else {
        fh_cookie = {viewport:0, bounds:0, point:place.geometry.location} ;
        window.location.href = "/de/fh-entdecken-map";
        // ok we are in our fallback position - but we can also handle that (:
      }
      $.cookie('fh_geolocation_cookie', JSON.stringify(fh_cookie), {path: '/'});
      
    }
  }; //End getFHbounds Function
 

  Drupal.behaviors.futurehistoryGeolocation = {
    attach: function (context, settings) {

      $('.places-autocomplete', context).each(function() {
        var $this = $(this);
        var placesId = this.id;

        Drupal.futurehistoryGeolocation[placesId] = {};     
        Drupal.futurehistoryGeolocation[placesId].autocomplete = new google.maps.places.Autocomplete(
          (document.getElementById(placesId)),
          {types: ['geocode']}
        );
        
        if (placesId == 'places-autocomplete-page') {
          Drupal.futurehistoryGeolocation[placesId].autocomplete.addListener('place_changed', function() {
            fh_place = Drupal.futurehistoryGeolocation[placesId].autocomplete.getPlace();
            Drupal.futurehistoryGeolocation.getFHbounds(fh_place);
          });
        } else {         
          $('.places_box_startseite_button').click(function(){
            var fh_place = Drupal.futurehistoryGeolocation[placesId].autocomplete.getPlace();
            Drupal.futurehistoryGeolocation.getFHbounds(fh_place);
          });
        }

      }); // End EACH Funktion
    } // End Attach
  }; // End Behaviors

})(jQuery);
