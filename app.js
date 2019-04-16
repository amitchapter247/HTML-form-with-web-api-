var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var mongo = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/";

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.resolve(__dirname, "public")));
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});
app.post("/post-feedback", function(req, res) {
  mongo.connect(url, function(err, db) {
    const dbo = db.db("your");
    delete req.body._id; // for safety reasons
    dbo.collection("feedbacks").insertOne(req.body);
  });
  res.send("Data received:\n" + JSON.stringify(req.body));
});

/*app.get("/view-feedbacks", function(req, res) {
  dbConn.then(function(db) {
    db
      .collection("feedbacks")
      .find({})
      .toArray()
      .then(function(feedbacks) {
        res.status(200).json(feedbacks);
      });
  });
});
*/
var server = app.listen(8080, function() {
  var host = server.address().address;
  var port = server.address().port;
  console.log("Example app listening at http://%s:%s", host, port);
});
