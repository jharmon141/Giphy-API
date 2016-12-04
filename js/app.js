$(document).ready(function() {

    var buttonList = ["cat", "dog", "rabbit", "squirrel", "raccoon", "goldfish", "goat", "turtle", "parrot", "hamster", "hedgehog", "hermit crab", "frog", "pig", "penguin", "deer", "bear", "manatee", "mouse", "crab"];
    var animal = $(this).attr("data-name");
    var numLimit = 10;
    var limit = "&limit=" + numLimit;
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
        animal + "&api_key=dc6zaTOxFJmzC" + limit;

    function initGifs() {
        console.log(queryURL);
        $("#gifs").empty();
        for (var i = 0; i < results.length; i++) {
            console.log(results.length);
            var gifDiv = $("<div class='gif'>");

            var rating = results[i].rating;

            var p = $("<p>").text("Rating: " + rating);

            var animalImage = $("<img>");
            animalImage.attr("src", results[i].images.fixed_height_still.url);
            animalImage.attr("data-state", "still");
            animalImage.attr("data-still", results[i].images.fixed_height_still.url);
            animalImage.attr("data-animate", results[i].images.fixed_height.url);

            gifDiv.append(p);
            gifDiv.append(animalImage);

            $("#gifs").append(gifDiv);
        }
    }

    renderButtons();
    $("#loadBtn").hide();

    // Function for displaying buttons
    function renderButtons() {

        $("#buttons").empty();

        // Looping through the array of animals
        for (var i = 0; i < buttonList.length; i++) {

            // Then dynamicaly generating buttons for each animal in the array
            var a = $("<button>");
            // Adding a class
            a.addClass("btn btn-default animal-btn");
            // Added a data-attribute
            a.attr("data-name", buttonList[i]);
            // Provided the initial button text
            a.text(buttonList[i]);
            // Added the button to the HTML
            $("#buttons").append(a);
        }
    }

    // Add animal button
    $("#add-animal").on("click", function(event) {
        event.preventDefault();

        // This line grabs the input from the textbox
        var input = $("#animal-input").val().trim();

        // The movie from the textbox is then added to our array
        buttonList.push(input);

        // Calling renderButtons which handles the processing of our movie array
        renderButtons();

        $("form").trigger("reset");
    });


    //click the animal button and render images
    $(document).on("click", ".animal-btn", function() {

        event.preventDefault();
        $("#gifs").empty();

        animal = $(this).attr("data-name");
        numLimit = 10;
        limit = "&limit=" + numLimit;
        queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
            animal + "&api_key=dc6zaTOxFJmzC" + limit;

        $.ajax({
                url: queryURL,
                method: "GET"
            })
            .done(function(response) {

                var results = response.data;

                //show load 10 more button
                $("#loadBtn").show();
                initGifs();


                function initGifs() {
                    console.log(queryURL);
                    $("#gifs").empty();
                    for (var i = 0; i < results.length; i++) {
                        console.log(results.length);
                        var gifDiv = $("<div class='gif'>");

                        var rating = results[i].rating;

                        var p = $("<p>").text("Rating: " + rating);

                        var animalImage = $("<img>");
                        animalImage.attr("src", results[i].images.fixed_height_still.url);
                        animalImage.attr("data-state", "still");
                        animalImage.attr("data-still", results[i].images.fixed_height_still.url);
                        animalImage.attr("data-animate", results[i].images.fixed_height.url);

                        gifDiv.append(p);
                        gifDiv.append(animalImage);

                        $("#gifs").append(gifDiv);
                    }
                }

            });


    });

    //click load more button
    $(document).on("click", "#loadBtn", function() {
        numLimit += 10;
        console.log(numLimit);
        limit = "&limit=" + numLimit;
        queryURL = "http://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=dc6zaTOxFJmzC" + limit;
        $.ajax({
                url: queryURL,
                method: "GET"
            })
            .done(function(response) {
                results = response.data;
                initGifs();


            });

        //reset limit of images displayed
        $("document").on("click", ".animal-btn", function() {
            numLimit = 10;
        });

    });

    //click the gifs to play and stop
    $(document).on("click", "img", function() {

        var state = $(this).attr("data-state");

        if (state == "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }

    });

});
