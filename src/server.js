const path = require('path');
const fs = require("fs");
const express = require('express');
const { PORT, imageFolder } = require('./config');
const { apiRouter } = require('./routers');
 
const app = express();

app.use(express.json());

app.use('/', apiRouter);

// app.get('/image/:id', (req, res) => {
//     const imageId = req.params.id;    
//     res.sendFile(path.resolve(imageFolder, imageId+".jpg"))
// });

// app.delete('/image/:id', async (req, res) => {
//     const imageId = req.params.id;
  
//     const id = await db.remove(imageId);
  
//     return res.json({ id });
// });

// app.get('/list', (req, res) => {
//   const allImages = db.find().map((image) => image.toPublicJSON());

//   console.log(res)

//   return res.json(allImages);
// });

// app.get("/merge", (req, res) => {
//     const mergeUrl = url.parse(req.url, true).query;

//     const frontImage = fs.createReadStream(
//         path.resolve(imageFolder, `./${mergeUrl.front}.jpg`)
//     );
  
//     const backImage = fs.createReadStream(
//         path.resolve(imageFolder, `./${mergeUrl.back}.jpg`)
//     );

//     const color = [...(mergeUrl.color || "0,0,0").split(",")].map(elem => parseInt(elem));
//     replaceBackground(frontImage, backImage, color, (mergeUrl.threshold || 0)).then(
//         (readableStream) => { 
//             var writableStream = fs.createWriteStream(
//                 path.resolve(imageFolder, "merge.jpg")
//             );
//             readableStream.pipe(writableStream);
//             res.set({ 'content-type': 'image/jpeg' });
//             res.attachment("merge.jpg");
//             readableStream.pipe(res);
//         }, 
//     );
// }); 
//c005b394-ab09-42a8-90a6-80fb081e7187  05270199-981d-4890-9580-7bf321ce9b02


app.listen(PORT, () => {
    console.log("ok");
});

