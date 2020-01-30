const express = require('express');
const multer = require('multer');
const cors = require('cors');
const mkdirp = require('mkdirp');
const app = express();

const PORT = 5000;
const URL = `http://localhost:${PORT}/`;

/**
 * @see https://www.geeksforgeeks.org/how-to-add-sleep-wait-function-before-continuing-in-javascript/
 */
function sleep(milliseconds) {
  let timeStart = new Date().getTime();
  while (true) {
    let elapsedTime = new Date().getTime() - timeStart;
    if (elapsedTime > milliseconds) {
      break;
    }
  }
}

app.use(express.static('public'))

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = './public/files/uploads';
        mkdirp(dir, err => cb(err, dir))
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname)
    }
});

const upload = multer({ storage })

app.use(cors());

app.post('/upload', upload.single('image'), (req, res) => {
  console.log('<<<<< ' + new Date)
  sleep(1000) // Set one second pause from server response
  if (req.file) {
    res.json({fileUrl: `${URL}files/uploads/${req.file.filename}`, status: "OK"});
    res.status(200);
  } else {
    res.status("409").json("No Files to Upload.");
    res.json({fileUrl: "No Files to Upload.", status: "ERROR"});
  }
  console.log('>>>>> ' + new Date)
});

app.listen(PORT);
console.log('api runnging on port: ' + PORT);
