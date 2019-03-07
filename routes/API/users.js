const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken')
const User = require('../../models/User')
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs')
const key = require('../../config/key')
const passport = require('passport')

// Load Input Validation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');
////////////////////////////////////
/// @router  GET  /api/users/? ////
//////////////////////////////////
router.get('/test',(req,res)=>res.json({msg:"Users Works"}))

/// @router POST /api/users/? ////
/////////////////////////////////
router.post('/register',(req,res)=>
{      const { errors, isValid } = validateRegisterInput(req.body);

// Check Validation
if (!isValid) {
  return res.status(400).json(errors);
}


    User.findOne({email:req.body.email})
    .then(user => 
        {if (user){return res.json({res:'user does Exist'}) }    
                   ///// hash password
    else{
        const avatar = gravatar.url(req.body.email, {
            s:'2990',
            r:'pg',
            d:'m'
        })
       const user = new User ({
           name: req.body.name,
           email: req.body.email,
           password: req.body.password,
           avatar,
           
       });
       bcrypt.genSalt(10, (err, salt) =>{
        console.log('user 3 ',user)
        bcrypt.hash(user.password,salt,(err,hash)=>
        {    console.log('user 4 ',user)
             if(err) console.log(err) ;
            user.password = hash;
            user.save()
            .then(u => res.send(u))
            .catch(err => console.log(err.message))
        })
    })}
            
        })
 
})
/// @router Login Get /api/users/? ////
//////////////////////////////////////
router.post('/login',(req,res)=>
{   
    const { errors, isValid } = validateLoginInput(req.body);

    // Check Validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
       const email = req.body.email;
    const password = req.body.password;

    User.findOne({email})
    .then(user => {
        if (!user){return res.status(400).send('Wrrong password or Email')};

            ///check  password
            bcrypt.compare(password,user.password)
            .then(result => 
                {
                    if(result){
                        
const payload = {id:user.id,name:user.name,avatar: user.avatar};

jwt.sign(payload,key.secretOrKey, {expiresIn:3600},(err,token)=>
{
    res.json({
        sucess:true,
        token : 'Bearer ' + token 
    })
});

                    }
                    else {return res.status(400).send('Wrrong password or Email')}
                })
    })
})
///////@router GET API/USERS/CURRENT ////////////////////////////////////
router.get('/current',passport.authenticate('jwt',{session: false}),(req,res) =>
{
res.send(req.user)
})
//////////////////////////////////////////////////////////////////
module.exports = router;