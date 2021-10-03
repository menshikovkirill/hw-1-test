const Image = require('../../entities/Image');
const {imageFolder} = require("../../config")
const db = require('../../entities/Database');
module.exports = (req, res) => {
    const image = new Image(req.file.filename.split('.')[0], req.file.size);
    db.insert(image); 

    res.send({id: image.id});
};
