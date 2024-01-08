const express = require('express');
const connection = require('../../../connection');
const router = express.Router();

const jwt = require('jsonwebtoken'); //Library to generate the JWT Token
require('dotenv').config();

router.post('/login', (request, response) => {
    let user = request.body;
    query = "SELECT * FROM user WHERE email =?";
    connection.query(query, [user.email], (err, results)=> {
        if(!err){
            if(results.length <=0 || results[0].password != user.password){
                return response.status(401).json({message:"Username or password wrong."});
            }else if(results[0].status === 'false'){
                return response.status(401).json({message:"Wait for Admin approval"});
            }else if(results[0].password == user.password){

            }else{
                return response.status(400).json({message:"Something went wrong. Please try again later."});
            }
        }
        else{
            return response.status(500).json(err);
        }
    });

    
});

module.exports = router;