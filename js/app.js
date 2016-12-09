$(document).ready(function() {

    var topics = ["cats", "space", "tacos", "bowie", "90's cartoons", "goats", "80's movies", "twin peaks", "hamster", "star trek", "christmas", "futurama", "doge", "batman", "manatee"];
    var topic = $(this).attr("data-name");
    var numLimit = 10;
    var limit = "&limit=" + numLimit;
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        topic + "&api_key=dc6zaTOxFJmzC" + limit;

    function initGifs() {

        $("#gifs").empty();
        for (var i = 0; i < results.length; i++) {

            var gifDiv = $("<div class='gif'>");

            var rating = results[i].rating;

            var p = $("<p>").text("rating: " + rating);

            var topicImage = $("<img>");
            topicImage.attr("src", results[i].images.fixed_height_still.url);
            topicImage.attr("data-state", "still");
            topicImage.attr("data-still", results[i].images.fixed_height_still.url);
            topicImage.attr("data-animate", results[i].images.fixed_height.url);

            gifDiv.append(p);
            gifDiv.append(topicImage);

            $("#gifs").append(gifDiv);
        }
        
    }

    renderButtons();
    $("#loadBtn").hide();
    $("#back-to-top").hide();
    $("#clickText").hide();

    // Function for displaying buttons
    function renderButtons() {

        $("#buttons").empty();

        // Looping through the array of topics
        for (var i = 0; i < topics.length; i++) {

            // Then dynamicaly generating buttons for each topic in the array
            var a = $("<button>");
            // Adding a class
            a.addClass("btn btn-default topic-btn");
            // Added a data-attribute
            a.attr("data-name", topics[i]);
            // Provided the initial button text
            a.text(topics[i]);
            // Added the button to the HTML
            $("#buttons").append(a);
        }
    }

    // Add topic button
    $("#add-topic").on("click", function(event) {
        event.preventDefault();

        // This line grabs the input from the textbox
        var input = $("#topic-input").val().trim();

        // The movie from the textbox is then added to our array
        topics.push(input);

        // Calling renderButtons which handles the processing of our movie array
        renderButtons();

        $("form").trigger("reset");
    });


    //click the topic button and render images
    $(document).on("click", ".topic-btn", function() {

        event.preventDefault();
        $("#gifs").empty();

        topic = $(this).attr("data-name");
        numLimit = 10;
        limit = "&limit=" + numLimit;
        queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            topic + "&api_key=dc6zaTOxFJmzC" + limit;

        $.ajax({
                url: queryURL,
                method: "GET"
            })
            .done(function(response) {

                var results = response.data;

                //show load 10 more button
                $("#loadBtn").show();
                $("#back-to-top").show();
                $("#clickText").show();
                initGifs();

                function initGifs() {

                    $("#gifs").empty();
                    for (var i = 0; i < results.length; i++) {

                        var gifDiv = $("<div class='gif'>");

                        var rating = results[i].rating;

                        var p = $("<p>").text("rating: " + rating);

                        var topicImage = $("<img>");
                        topicImage.attr("src", results[i].images.fixed_height_still.url);
                        topicImage.attr("data-state", "still");
                        topicImage.attr("data-still", results[i].images.fixed_height_still.url);
                        topicImage.attr("data-animate", results[i].images.fixed_height.url);

                        gifDiv.append(p);
                        gifDiv.append(topicImage);

                        $("#gifs").append(gifDiv);
                    }
                }

            });
    });

    //click load more button
    $(document).on("click", "#loadBtn", function() {
        numLimit += 10;

        limit = "&limit=" + numLimit;
        queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=dc6zaTOxFJmzC" + limit;
        $.ajax({
                url: queryURL,
                method: "GET"
            })
            .done(function(response) {
                results = response.data;
                initGifs();
            });

        //reset limit of images displayed
        $("document").on("click", ".topic-btn", function() {
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

    //back to top button
    if ($('#back-to-top').length) {
        var scrollTrigger = 100, // px
            backToTop = function() {
                var scrollTop = $(window).scrollTop();
                if (scrollTop > scrollTrigger) {
                    $('#back-to-top').addClass('show');
                } else {
                    $('#back-to-top').removeClass('show');
                }
            };
        backToTop();
        $(window).on('scroll', function() {
            backToTop();
        });
        $('#back-to-top').on('click', function(e) {
            e.preventDefault();
            $('html,body').animate({
                scrollTop: 0
            }, 700);
        });
    }

    //sticky buttons bar
    function moveScroller() {
        var $anchor = $("#scroller-anchor");
        var $scroller = $('#scroller');

        var move = function() {
            var st = $(window).scrollTop();
            var ot = $anchor.offset().top;
            if (st > ot) {
                $scroller.css({
                    position: "fixed",
                    top: "0px"
                });
            } else {
                if (st <= ot) {
                    $scroller.css({
                        position: "relative",
                        top: ""
                    });
                }
            }
        };
        $(window).scroll(move);
        move();
    }

    $(function() {
        moveScroller();
    });
});
