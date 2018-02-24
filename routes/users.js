let express = require('express');
let router = express.Router();
let bodyParser=require('body-parser');
let mongoose=require('mongoose');
const path = require('path');
let search=require('./filter.js');
let {initialspace,endspace,findname}= require('./search.js');
let admission=require('../models/Admission');

router.post('/form', function(req, res, next) {

    let newUser=new admission(req.body);
    newUser.save(req.body);

    res.redirect('/admissionPage_user');
});

router.get('/alladmissions', function(req, res){
    admission.find({}, function (err, data) {
        if(err){
            console.log(err);
        }else{
            //console.log(data);
            res.render('alladmissions_user.ejs', {data: data});
        }
    });
});
router.post('/search',function(req,res){
    console.log('reached');
    let search = req.body.search;
    admission.find({},function(err,data){
        if(err)
            throw err;
        initialspace(search,function(search1){
            endspace(search1,function(search2){
                findname(search2,data,function(data){
                    res.render('alladmissions_user.ejs',{data: data});
                });
            });
        });

    });
});

router.post('/filter', function(req,res){
    let body = req.body;
    let filter ={};
    if(body.from&&body.to) {
        let from = Number(body.from);
        let to = Number(body.to);
        filter.age = {
            from: from,
            to: to
        };
    }
    else{
        filter.age = {
            from: 0,
            to: 100
        };
    }
    if(body.enrollment){
        filter.enrollment= {
            enrollment:body.enrollment
        }
    }
    if(body.aadhar){
        filter.enrollment= {
            enrollment:body.aadhar
        }
    }
    if(body.gender){
        filter.gender= {
            gender:body.gender
        }
    }
    admission.find({},function(err,data){
        search (filter,data, function(data1){
            res.render('alladmission',{data:data1});
        });
    });
});

module.exports = router;