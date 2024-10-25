const express= require('express');
const {generatenewshortURL , getAnalytics} = require('../controller/url.js');

const router = express.Router();

router.post('/', generatenewshortURL);

router.get('/analytics/:shortId',getAnalytics);


module.exports = router;