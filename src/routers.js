const { Router } = require('express');
const api = require('./controllers/api');
const multer = require("multer");
const {imageFolder} = require("./config")
const { generateId } = require('../src/utils/generateId');
// routes for /api

const apiRouter = new Router();

apiRouter.get('/image/:id', api.getImage);
apiRouter.delete('/image/:id', api.deleteImage);
apiRouter.get('/list', api.list);
apiRouter.get('/merge', api.merge);

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, imageFolder);
    },
    filename: function (req, file, cb) {
        cb(null, generateId()+'.jpg');
    }
});
    
var upload = multer({ storage: storage });
apiRouter.use("/upload", upload.single("image"), api.uploadImage);


exports.apiRouter = apiRouter;