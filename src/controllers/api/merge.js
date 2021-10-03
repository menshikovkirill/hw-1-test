const { replaceBackground } = require("backrem");
const db = require('../../entities/Database');
const url = require("url");
const fs = require("fs");
const path = require("path");
const {imageFolder} = require("../../config")

module.exports =  (req, res) => {
    const mergeUrl = url.parse(req.url, true).query;

    const frontImage = fs.createReadStream(
        path.resolve(imageFolder, `./${mergeUrl.front}.jpg`)
    );
  
    const backImage = fs.createReadStream(
        path.resolve(imageFolder, `./${mergeUrl.back}.jpg`)
    );

    const color = [...(mergeUrl.color || "0,0,0").split(",")].map(elem => parseInt(elem));
    replaceBackground(frontImage, backImage, color, (mergeUrl.threshold || 0)).then(
        (readableStream) => { 
            var writableStream = fs.createWriteStream(
                path.resolve(imageFolder, "merge.jpg")
            );
            readableStream.pipe(writableStream);
            res.set({ 'content-type': 'image/jpeg' });
            res.attachment("merge.jpg");
            readableStream.pipe(res);
        }, 
    );
};