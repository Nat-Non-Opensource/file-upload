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
  } else {
    let fname = `${new Date().getTime()}`;
    let fpath = `./uploads/${fname}.wav`;
    req.files.filedata.mv(fpath);
    //avatar.mv("./uploads/" + avatar.name);
    console.log(req.files.filedata);
    console.log(fpath);
    res.send(req.files);
    //res.status(200).send(fpath);
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
