/**
 *  path:/api/uploads
 */

const {Router} = require('express');
const route = Router();

const { controllersUploads  } = require('../Controllers/uploads');
const {middlewaresUploads} = require('../Middlewares/uploads')
const {validFile} = require('../Middlewares/uploads/helpers')

route.post('/', validFile ,controllersUploads.UploadFile);

route.put('/:collecion/:id',[
    ...middlewaresUploads.putFiles
],controllersUploads.putFile)

module.exports = route;