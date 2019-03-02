var friendsData = require("../data/friends");

module.exports = function(app) {
  app.get("/api/friends", function(req, res) {
    res.json(friendsData);
  });

  app.post("/api/friends", function(req, res) {
    console.log("Currently in API POST route.  Begin calculation of differential values:");
    var profileDifferences = [];
    for (var i = 0; i < friendsData.length; i++) {
      var currentDifference = 0;
      for (var j = 0; j < friendsData[i].scores.length; j++) {
        var currentProfileValueComparison = friendsData[i].scores[j];
        var userValueComparison = req.body.scores[j];
        var currentProfileValue = parseInt(currentProfileValueComparison);
        var userValue = parseInt(userValueComparison);
        currentDifference += Math.abs(currentProfileValue - userValue);
      }
      profileDifferences.push(currentDifference);
      console.log("Current list of profile differentials: ");
      console.log(profileDifferences);
    }
    var closestDifferential = Math.min(...profileDifferences);
    var matchIndex = profileDifferences.indexOf(closestDifferential);
    console.log("Match found.  Matching profile data is:");
    console.log(friendsData[matchIndex]);
    res.json(friendsData[matchIndex]);
    friendsData.push(req.body);
  });
}