//!! This project is inspired by and uses code from kgarnier's NYT API demo: https://replit.com/@kgarnier/Class-11-NYT-API-Demo#index.html 


//API base url, more specific queries are added onto the base later ()
let endpoint = "https://api.nytimes.com/svc/movies/v2";

//making an array to hold the ratings
let ratings = ["SELECT", "PG", "PG-13", "R"];

//API Key for accessing NYT API.
let api_key = "xyyNXsZAH3hK8zmDt92jAB1etJzvGh8d";

//ready function
$(function () {
  //hide the #results container (we don't want to see this before the user makes a selection)
  $("#results").hide();

  //loop through sections array to generate a dropdown menu- creating <option values=..>s
  $.each(ratings, function (i, val) {
    //append each value from the array as an option
    $("#ratings").append("<option value='" + val + "'>" + val.toUpperCase() + "</option>");
  });

  //what happens when something is selected from the dropdown menu?
  $("#ratings").change(function () {
    //reveal the #articles container
    $("#results").show();
    //get value of selected section
    var selected = $("#ratings option:selected").val();
    console.log(selected);

    //construct a new query to the API based on the value selected
    var query = endpoint + "/reviews/all.json?api-key=" + api_key;

    //test query
    console.log(query);

    //use another JSON call to get the list of movies from selected source
    $.getJSON(query, function (data) {

      dataresults = data.results;

      //clear the previous results so new results dont just get added on 
      $("#results").html("");

      let filter = []
      //loop through array to get movie titles etc and append them to an unordered list
      $.each(dataresults, function (i, obj) {
        console.log(obj.mpaa_rating);
        if (selected == obj.mpaa_rating) {
          filter.push(obj);
          //console.log(obj);
        }    
      });

// this was my attempt at having a message pop up when a G rating was selected, since there were no G movies available. This solution didn't work, so I temporarily removed "G" as an option fomr the array.
      if (selected == 0) {
        document.getElementById("respond-1")
        .innerHTML = "Hello World";
        }


      let random = Math.floor(Math.random()*
         filter.length);

      console.log(random)

      console.log(filter[0]);

// looping through the array to get the desired data-- 1 random result appears thanks to the math.random above. 
      $("#results").append("<li><a href='" + filter[random].url + "' target='_blank'>"
        + filter[random].display_title + "<b> " + filter[random].mpaa_rating + "</b><div id='summary'>" + filter[random].summary_short + "</div><br><img src='"+filter[random].multimedia.src+"'/> </a></li>");
        //change the src of the #image img 
        $("#image").attr("src",filter[random].multimedia.src);
    });
    

  });
})
