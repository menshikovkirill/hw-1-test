const path = require('path');
const fs = require("fs");
const express = require('express');
const { PORT, imageFolder } = require('./config');
const db = require('./entities/Database');
const Image = require('./entities/Image');
const url = require('url');
const { replaceBackground } = require("backrem");
var multer  = require('multer');
const { generateId } = require('./utils/generateId');
 
const app = express();

app.use(express.json());

app.get('/image/:id', (req, res) => {
    const imageId = req.params.id;
  
    return res.json(db.findOne(imageId).toPublicJSON());
});

app.delete('/image/:id', async (req, res) => {
    const imageId = req.params.id;
  
    const id = await db.remove(imageId);
  
    return res.json({ id });
});

app.get('/list', (req, res) => {
  const allImages = db.find().map((image) => image.toPublicJSON());

  console.log(res)

  return res.json(allImages);
});

app.get("/merge", (req, res) => {
    const mergeUrl = url.parse(req.url, true).query;

    const frontImage = fs.createReadStream(
        path.resolve(imageFolder, `./${mergeUrl.front}.jpg`)
    );
  
    const backImage = fs.createReadStream(
        path.resolve(imageFolder, `./${mergeUrl.back}.jpg`)
    );

    const color = [...(mergeUrl.color || "0,0,0").split(",")].map(elem => parseInt(elem));
    let writableStream = fs.createWriteStream(
        imageFolder+'/merge.jpg'
    );
    writableStream.on("end", () => console.log("end"))
    replaceBackground(frontImage, backImage, color, (mergeUrl.threshold || 0)).then(
        (readableStream) => { 
            readableStream.pipe(writableStream);
            readableStream.on("end", () => res.sendFile( imageFolder+'/merge.jpg'))
        }, 
		(readableStream) => {
			res.send(500);
		}
    ).catch((err) => console.log(err));
}); 
//c005b394-ab09-42a8-90a6-80fb081e7187  05270199-981d-4890-9580-7bf321ce9b02
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, imageFolder);
    },
    filename: function (req, file, cb) {
      cb(null, generateId()+'.jpg');
    }
});

var upload = multer({ storage: storage });

app.post("/upload", upload.single("image"), function (req, res) {
    const image = new Image(req.file.filename.split('.')[0], req.file.size);
    db.insert(image); 

    res.send(JSON.stringify({id: image.id}));
});

app.listen(PORT);

