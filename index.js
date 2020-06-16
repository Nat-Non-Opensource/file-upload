const express = require("express");
const fileUpload = require("express-fileupload");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const _ = require("lodash");
var http = require("http");

var cors = require("cors");
var app = express();

app.use(cors());
// enable files upload
app.use(fileUpload({
  createParentPath: true,
  limits: {
    fileSize: 2 * 1024 * 1024 * 1024 //2MB max file(s) size
  }
}));

//add other middleware
app.use(express.static("public"));
app.use(express.static("uploads"));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.post("/upload", function(req, res) {
  if (!req.files) {
    res.send({
      status: false,
      message: "No file uploaded"
    });
  } else {
    let fname = `${new Date().getTime()}`;
    let fpath = `./uploads/${fname}.wav`;
    req.files.filedata.mv(fpath);
    //avatar.mv("./uploads/" + avatar.name);
    console.log(req.files.filedata);
    console.log(fpath);
    let u = `https://demo.humanist.cc/${fname}`;
    let t = 2;
    let lat = "18.7833491";
    let lng = "98.986756";
    //res.send(req.files);
    let url = ``;

    var options = {
      host: "us-central1-vuemap-1.cloudfunctions.net",
      path: `sample?url=${u}&lat=${lat}&lng=${lng}&type=${t}`
    };

    callback = function(response) {
      var str = "";

      //another chunk of data has been received, so append it to `str`
      response.on("data", function(chunk) {
        str += chunk;
      });

      //the whole response has been received, so we just print it out here
      response.on("end", function() {
        console.log(str);
        res.status(200).send(fname);
      });
    };

    http.request(options, callback).end();
    //res.send("hello world");
  }
  //console.log(req.files); // the uploaded file object
});

// upoad single file

//make uploads directory static
//app.use(express.static('uploads'));

//start app
const port = process.env.PORT || 3000;

app.listen(port, () =>
  console.log(`App is listening on port ${port}.`)
);
