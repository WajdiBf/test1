const express = require('express');
const mongoose = require('mongoose');
const passport=require('passport')
const morgan = require('morgan')
// const bodyparser = require('body-parser')

const users = require('./routes/API/users');
const posts = require('./routes/API/posts');
const profile = require('./routes/API/profile');
const app = express();
app.use(express.json())
app.use(express.urlencoded());
app.use(morgan('tiny'))
// app.use(bodyparser.urlencoded({extended:false}))
//db config
const db = require('./config/key').mongoURL



//connect to mongodb
mongoose
.connect(db,{useNewUrlParser:true})
.then(()=> console.log('MongoDB connect ...'))
.catch(err => console.log('Error:',err.message))
//////////PASSPORT  
app.use(passport.initialize())
///////////PASSPORT Config
require('./config/passport')(passport);




app.get('/',(req,res)=>{ res.send('hello')})
////Use Routes
app.use('/api/users',users)
app.use('/api/profile',profile)
app.use('/api/posts',posts)


port = process.env.port || 5000;

app.listen(port,console.log(`now we are connected on PORT:${port}`))