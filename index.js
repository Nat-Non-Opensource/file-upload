const express = require("express");
const fileUpload = require("express-fileupload");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const _ = require("lodash");

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
  }

  req.files.filedata.mv(`./uploads/${new Date().getTime()}.wav`);
  //avatar.mv("./uploads/" + avatar.name);
  console.log(req.files.filedata);
  //res.send(req.files);
  //console.log(req.files); // the uploaded file object
});

// upoad single file

app.post("/upload", function(req, res) {
  res.send(req.files);
});

//make uploads directory static
//app.use(express.static('uploads'));

//start app
const port = process.env.PORT || 3000;

app.listen(port, () =>
  console.log(`App is listening on port ${port}.`)
);
