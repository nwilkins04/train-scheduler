console.log("train js linked")

// Initialize Firebase
var config = {
    apiKey: "AIzaSyBu1C3g8VKhZYYmKF-qfXHwUgRDQl30CrQ",
    authDomain: "train-time-table-7fb1e.firebaseapp.com",
    databaseURL: "https://train-time-table-7fb1e.firebaseio.com",
    projectId: "train-time-table-7fb1e",
    storageBucket: "",
    messagingSenderId: "7651867092"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  //button for adding new train
  $("#add-train-btn").on("click", function(event){
      event.preventDefault();

      //grabs user input
      var trainName = $("#train-input").val().trim();
      var trainDestination = $("#destination-input").val().trim();
      var firstTrainTime = $("#first-train-input").val().trim();
      var trainFrequency = $("#frequency-input").val().trim();

      //local "temporary" object for holding train data
      var newTrain = {
          name: trainName,
          destination: trainDestination,
          time: firstTrainTime,
          frequency: trainFrequency
      };

      //uploads train data to database
      database.ref().push(newTrain);

      //clears all text boxes
      $("#train-input").val("");
      $("#destintion-input").val("");
      $("#first-train-input").val("");
      $("#frequency-input").val("");
});

//firebase event for adding employees to database
database.ref().on("child_added", function(childShapshot) {

    //store into variable
    var trainName = childShapshot.val().name;
    var trainDestination = childShapshot.val().destination;
    var firstTrainTime = childShapshot.val().time;
    var trainFrequency = childShapshot.val().frequency;

    //create new row
    var newRow = ("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(trainDestination),
        $("<td>").text(firstTrainTime),
        $("<td>").text(trainFrequency),
    );

    //append new row to table
    $("#train-table > tbody").append(newRow);
});