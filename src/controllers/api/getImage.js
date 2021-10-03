const db = require('../../entities/Database');
const path = require("path")
const {imageFolder} = require("../../config")
module.exports = (req, res) => {
    const imageId = req.params.id;    
    res.sendFile(path.resolve(imageFolder, imageId+".jpg"));
}