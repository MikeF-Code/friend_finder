// Setup framework for userProfile object to be added to array of objects in friends.js via '/api/friends' POST route.  Put userProfile in global scope so it can be read by other .js files (namely apiRoutes)
var userProfile = {
    "name":"",
    "photo":"",
    "scores":[]
};

// Hide cards for survey questions.
$("#q1, #q2, #q3, #q4, #q5, #q6, #q7, #q8, #q9, #q10, #results").hide();


$(document).ready(function() {

    // Initialize Materialize components.
    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems);

    // Grab values from various steps and put them into userProfile object.
    $(".submit").on("click", function(event) {
        event.preventDefault();
        if ($(this).attr("id") === "profileSubmit") {
            var name = $("#yourName").val().trim();
            var photoURL = $("#yourPic").val();
            userProfile.name = name;
            userProfile.photo = photoURL;
            $("#profile").hide();
            $("#q1").show();
            console.log("--------------------------");
            console.log("Profile ID info set.  Getting values for matching");
            console.log("Name: " + userProfile.name);
            console.log("Photo URL: " + userProfile.photo);
        } else {
        var answerKeyString = $(this).attr("id");
        var answerKey = answerKeyString.split("");
        console.log("Value of 'answerKey' is:");
        console.log(answerKey);
        switch(answerKey.pop()) {
            case "1":
                var value = $("#question1 option:selected").val();
                console.log("value for Q1 is:");
                console.log(value);
                userProfile.scores.push(value);
                console.log("--------------------------");
                console.log("Answer submitted.  Current scores:");
                console.log(userProfile.scores);
                $("#q1").hide();
                $("#q2").show();
                break;
            case "2":
                var value = $("#answer2").val();
                userProfile.scores.push(value);
                $("#q2").hide();
                $("#q3").show();
                console.log("--------------------------");
                console.log("Answer submitted.  Current scores:");
                console.log(userProfile.scores);
                break;
            case "3":
                var value = $("#answer3").val();
                userProfile.scores.push(value);
                $("#q3").hide();
                $("#q4").show();
                console.log("--------------------------");
                console.log("Answer submitted.  Current scores:");
                console.log(userProfile.scores);
                break;
            case "4":
                var value = $("#answer4").val();
                userProfile.scores.push(value);
                $("#q4").hide();
                $("#q5").show();
                console.log("--------------------------");
                console.log("Answer submitted.  Current scores:");
                console.log(userProfile.scores);
                break;
            case "5":
                var value = $("#answer5").val();
                userProfile.scores.push(value);
                $("#q5").hide();
                $("#q6").show();
                console.log("--------------------------");
                console.log("Answer submitted.  Current scores:");
                console.log(userProfile.scores);
                break;
            case "6":
                var value = $("#answer6").val();
                userProfile.scores.push(value);
                $("#q6").hide();
                $("#q7").show();
                console.log("--------------------------");
                console.log("Answer submitted.  Current scores:");
                console.log(userProfile.scores);
                break;
            case "7":
                var value = $("#answer7").val();
                userProfile.scores.push(value);
                $("#q7").hide();
                $("#q8").show();
                console.log("--------------------------");
                console.log("Answer submitted.  Current scores:");
                console.log(userProfile.scores);
                break;
            case "8":
                var value = $("#answer8").val();
                userProfile.scores.push(value);
                $("#q8").hide();
                $("#q9").show();
                console.log("--------------------------");
                console.log("Answer submitted.  Current scores:");
                console.log(userProfile.scores);
                break;
            case "9":
                var value = $("#answer9").val();
                userProfile.scores.push(value);
                $("#q9").hide();
                $("#q10").show();
                console.log("--------------------------");
                console.log("Answer submitted.  Current scores:");
                console.log(userProfile.scores);
                break;
            case "0":
                var value = $("#answer10").val();
                userProfile.scores.push(value);
                $("#q10").hide();
                console.log("--------------------------");
                console.log("Answer submitted.  Current scores:");
                console.log(userProfile.scores);
                console.log("Answers complete.  Calculating and Displaying results!");
                $.ajax({
                    url: "/api/friends",
                    method: "POST",
                    data: userProfile
                }).then(function(matchData) {
                    console.log("--------------------------");
                    console.log("Matching complete.  Displaying results!");
                    console.log("(Value of 'matchData' result of ajax POST to API:");
                    console.log(matchData);
                    var matchingImage = $("<img>");
                    matchingImage.attr("src", matchData.photo);
                    $("#matchImage").append(matchingImage);
                    $("#matchName").text(matchData.name);
                    $("#results").show();
                });
                break;
            default:
                break;
            }
        }
    });

});