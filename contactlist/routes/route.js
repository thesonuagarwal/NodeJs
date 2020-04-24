const express = require('express');
const router = express.Router();
const Contact = require('../models/contacts');

// retrieving contacts
router.get('/contacts',(req,res,next)=>{
    Contact.find( function(err,contacts){
        //res.send('Retrieving the contact list from database');
        res.json(contacts);
    });
   
})


// add contact
router.post('/contact',(req,res,next)=>{
    //console.log(req.body);
    let newContact = new Contact({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        phone: req.body.phone
    });


    // logic to add contact
    newContact.save((err,contact)=>{
        //res.send('add contact logic goes here');
        if(err){
            res.json({msg:'Failed to add contact'});
        }else{
            res.json({msg:'Contact added successfully'});
        }
    });
    
})


// delete contact
router.delete('/contact/:id',(req,res,next)=>{
    // logic to add contact
    //res.send('delete contact logic goes here');
    Contact.remove({_id:req.params.id},function(err,result){
        if(err){
            res.json(err);
        }else{
            res.json(result);
        }
    })
})

module.exports = router; 