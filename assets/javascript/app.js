//MOVIE MONSTERS!

//GLOBAL VARIABLES

var topics = ["Dracula", "Frankenstein", "Wolfman", "The Thing", "Brundlefly", "The Mummy", "Predator", "Rancor", "Freddy Kreuger", "Pale Man", "King Kong", "Babadook", "Xenomorph", "Godzilla", "Nosferatu", "Mothra", "Pinhead", "Medusa", "Jason Voorhees", "Gremlin", "Jaws"];

var apikey = "JXO4iEGPO0SUcoMaAxl4GwMPUdSZgGOy";

//FUNCTIONS

//Generates buttons from the topics array
function makeButtons() {
  $("#topic-buttons").empty();
  for (i = 0; i < topics.length; i++) {
    var topicButton = $("<button>");
    //adds Bootstrap classes and data-name attribute
    topicButton.addClass("btn btn-danger m-1 font-weight-bold");
    topicButton.attr("id", "call-button");
    topicButton.attr("data-name", topics[i]);
    topicButton.text(topics[i]);
    $("#topic-buttons").append(topicButton);
  }
}

//Takes user topic, adds to array, and re-renders buttons
function addUserButton() {
  var userTopic = $("#user-topic").val().trim();
  topics.push(userTopic);
  makeButtons();
  $("#user-topic").val("");
}

//MAIN PROCESS
window.onload = function() {
      
  //Renders default buttons on refresh
  makeButtons();

  //Click event for adding new button
  $("#submit-topic").on("click", function(event) {
    event.preventDefault();
    addUserButton();
  })

  //Event listener for topic buttons
  $(document).on("click", "#call-button", function(event) {
    //grabs search term from button attribute
    var topic = $(this).attr("data-name");
    //constructs search URL
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    topic + "&api_key=" + apikey + "&limit=10";
    //AJAX request
    $.ajax({
      url: queryURL,
      method: "GET"
    })
    //after the data comes back from the API
    .then(function(response) {
      //stores results as array
      var results = response.data;
      console.log(results);
      //empties current GIF gallery
      $("#gif-gallery").empty();
      //loops through results array
      for (var i = 0; i < results.length; i++) {
        //Creates div with GIF and caption
        var gifDiv = $("<div>");
        gifDiv.addClass("gif-div float-left m-1");
        var rating = results[i].rating;
        var caption = $("<figcaption>").text("Rating: " + rating);
        caption.addClass("m-1 font-weight-light");
        var gifImage = $("<img>");
        gifImage.addClass("gif rounded")
        //adds attributes used for play/pause function
        gifImage.attr("src", results[i].images.fixed_height_still.url);
        gifImage.attr("data-still", results[i].images.fixed_height_still.url);
        gifImage.attr("data-animate", results[i].images.fixed_height.url);
        gifImage.attr("data-state", "still");
        gifDiv.append(gifImage);
        gifDiv.append(caption);
        //puts GIF div on page
        $("#gif-gallery").prepend(gifDiv);
      }
      $("#gif-gallery").prepend("<p>Click GIFs to animate or pause!</p>")
    });
  });

  //Event listener for GIF pause/play
  $(document).on("click", ".gif", function() {
    var state = $(this).attr("data-state");
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  });

};

