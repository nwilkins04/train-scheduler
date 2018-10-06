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
      var firstTrainTime = $("#frequency-input").val().trim();
      var trainFrequency = $("#first-train-input").val().trim();

      //local "temporary" object for holding train data
      var newTrain = {
          name: trainName,
          destination: trainDestination,
          time: firstTrainTime,
          frequency: trainFrequency,
      };

      //uploads train data to database
      database.ref().push(newTrain);

      console.log(newTrain.name);
      console.log(newTrain.destination),
      console.log(newTrain.time),
      console.log(newTrain.frequency),

      //clears all text boxes
      $("#train-input").val("");
      $("#destination-input").val("");
      $("#first-train-input").val("");
      $("#frequency-input").val("");
});

//firebase event for adding employees to database
database.ref().on("child_added", function(childShapshot) {

    //store into variable
    var trainName = childShapshot.val().name;
    var trainDestination = childShapshot.val().destination;
    var trainFrequency = childShapshot.val().frequency;
    var firstTrainTime = childShapshot.val().time;
   
    //train math
    var timeConverted = moment(trainFrequency, "HH:mm").subtract(1, "years");
    console.log(timeConverted);
    
    var diffTime = moment().diff(moment(timeConverted), "minutes");
    console.log("difference in time: " + diffTime);
    
    var tRemainder = diffTime % firstTrainTime;
    console.log(tRemainder);
    
    var tMinutesTillTrain = firstTrainTime - tRemainder;
    console.log("minutes till train: " + tMinutesTillTrain);
    
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("arrival time: " + moment(nextTrain).format("hh:mm"));

    //create new row
    var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(trainDestination),
        $("<td>").text(trainFrequency),
        $("<td>").text(firstTrainTime),
        $("<td>").text(moment(nextTrain).format("hh:mm")),
    );

    //append new row to table
    $("#train-table > tbody").append(newRow);
    });