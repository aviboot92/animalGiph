// alert("Connected");

var animals = ["Dog", "Guinea Pig", "Goat", "Alpacas", "Camels", "Cows", "Donkeys", "Ferrets", "Hedgehogs", "Horses", "Llamas", "Pigs", "Rabbits", "Red foxes", "Hamsters", "Water Buffaloes", "Yak", "Lion", "Tiger", "Leopard", "Fox" ];


//Function for generating buttons
		function renderButtons(){

			// Delete the content inside the giphy-btn-view div prior to adding new animal buttons
			// (this is necessary otherwise you will have repeat buttons)
			  $("#giphy-btn-view").empty();
			//Loop all in Animal array
			for (var i = 0; i < animals.length; i++) {
				console.log(animals[i]);
				var btn = $("<button>");
				btn.attr("data-name", animals[i]);
				btn.addClass("animal");
				btn.css("margin", "5px")
				btn.addClass("btn btn-primary");
				btn.text(animals[i]);
				$("#giphy-btn-view").append(btn);
			}
		}
//Function to alert Animal Name when their button is clicked
		function buttonAlertDis(){
			//$(this) is button element clicked at this paricular movement 
			console.log("$(this) is "+$(this));
			// Delete the content inside the giphy-appear-here div prior to adding new list of animal images and rating
			//******** (this is necessary otherwise you will have repeat results on every click)*******
			$("#gifs-appear-here").empty();

			// Transferring animal name to a variable
			var animal = $(this).attr("data-name");
			// Building query Url for the Ajax Call
			var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +animal+ "&api_key=dc6zaTOxFJmzC&limit=10";
			console.log("Animal clicked is "+animal);
			console.log("Url for this animal :"+queryURL);
			// Making the AJAX call
			$.ajax({
			        url: queryURL,
			        method: "GET"
			      }).then(function(response) {
			      	 console.log(response);
			      	 var promiseData = response.data;
			      	 console.log("Here is promiseData which is taken from response.data"+promiseData);
			      	 dataDisplay(promiseData);
			      });
		}

// <img src="https://media1.giphy.com/media/3o85xkQpyMlnBkpB9C/200_s.gif" data-still="https://media1.giphy.com/media/3o85xkQpyMlnBkpB9C/200_s.gif" 
// data-animate="https://media1.giphy.com/media/3o85xkQpyMlnBkpB9C/200.gif" data-state="still" class="gif">

//Function accessing and assigning data for results
		function dataDisplay(source){
			var row1 = $("<div>");
			row1.addClass("row");
			row1.attr("id", "rowA");

			var row2 = $("<div>");
			row2.addClass("row");
			row2.attr("id", "rowB");

			var row3 = $("<div>");
			row3.addClass("row");
			row3.attr("id", "rowC");


			$("#gifs-appear-here").append(row1);
			$("#gifs-appear-here").append(row2);
			$("#gifs-appear-here").append(row3);

			
			for (var i = 0; i < source.length; i++) {
				var animalDiv = $("<div>");
				animalDiv.addClass("animalResult");
				var img = $("<img>");
				var divCard = $("<div>");
				img.addClass("imgGif");
				// img.addClass("col-lg-3");
				console.log(source[i]);

					// ===========

				if (i<3) {
					animalDiv.addClass("row1");
					animalDiv.addClass("col-lg-3");
					$("#rowA").append(animalDiv);				
				} else if (i>=3 && i<6) {
					animalDiv.addClass("row2");
					animalDiv.addClass("col-lg-3");
					$("#rowC").append(animalDiv);
					
				}
				 else if (i>=6 && i<9) {
				 	animalDiv.addClass("row3");
				 	animalDiv.addClass("col-lg-3");
				 	$("#rowB").append(animalDiv);		
				}
					// ===========

					$(".row1")



				var imgSrc = source[i].images.fixed_height_still.url;
				var dataStill = source[i].images.fixed_height_still.url;
				img.attr("data-still", dataStill);
				console.log("Data Still added for image # "+i);
				var dataAnimate = source[i].images.fixed_height.url;
				img.attr("data-animate", dataAnimate);
				var dataState = "still";
				img.attr("data-state", dataState);
				img.attr("src", imgSrc);
				var rating = ("Rating: "+source[i].rating);
				var pOne = $("<p>");
				pOne.text(rating)
				animalDiv.prepend(img, pOne);				
			}
		}

// Function To accept data given BY the User
      $("#add-animal").on("click", function(event) {
        // event.preventDefault() prevents submit button from trying to send a form.
        // Using a submit button instead of a regular button allows the user to hit
        // "Enter" instead of clicking the button if desired
        event.preventDefault();

        // Write code to grab the text the user types into the input field
        var userIP = $("#giphy-input").val().trim();
        console.log("UserIP is "+userIP);
        // Write code to add the new animal into the animals array
        animals.push(userIP);
        var kaali = "";
        // It helps to clear text in input box after clicking search button.
        $("#giphy-input").val(kaali);
        // The renderButtons function is called, rendering the list of movie buttons
        renderButtons();
      });

// ================Calling the renderButtons function to display the initial list of movies
renderButtons();

// ================Calling function for all buttons in the document to display their respective data 
$(document).on("click", ".animal", buttonAlertDis);

// ============= Calling function for all images in document to play or pause Dynamically on every Click
$(document).on("click", ".imgGif", pauseAndPlay);


// Function for pausing Giphs
	 function pauseAndPlay() {
	      var state = $("img").attr("data-state");
	       console.log("function pauseAndPlay Called");
	      if (state === "still")  {
	        console.log($(this));
	        console.log("function Still Called");
	        var dataAnimate = $(this).attr("data-animate");
	        console.log(dataAnimate+" is data-animate value");
	        $(this).attr("src", dataAnimate);
	        $(this).attr("data-state", "animate");
	      }
	      else if (state === "animate")  {
	         $(this).attr("src", $(this).attr("data-still"));
	        $(this).attr("data-state", "still");
	        console.log("function animate Called");
	      }
	    }
