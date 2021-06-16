/**
 *  path: api/searches
 */

const {Router} = require('express');
const route = Router();

const {searchesCollecAndProducts} = require('../Controllers/searches');

route.get('/:Collection/:Info', searchesCollecAndProducts);

module.exports = route;