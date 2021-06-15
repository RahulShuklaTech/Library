const express = require('express');
const router= express.Router();
const {showAllCategories} =  require('../controllers/categoryController');


router
      .route('/')
      .get(async(req,res) => {
          let data = await showAllCategories();
          res.send
      })
