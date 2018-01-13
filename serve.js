/**
 * Created by Vivek on 07-01-2018.
 */
var express = require('express')
var cors = require('cors')
var bodyParser = require('body-parser')
var User = require('./models/User.js')
var Post = require('./models/Post.js')

var jwt = require('jwt-simple')
var app = express();
var mongoose = require('mongoose')
var bcrypt = require('bcrypt-nodejs')

var posts = [
    {message: '1st message changed'},
    {message: '2nd message'}
]

app.use(cors());
app.use(bodyParser.json());


mongoose.connect('mongodb://test:test@ds241677.mlab.com:41677/node-user-app',
    //{userMongoClient:true},
    //{uri_decode_auth:true},
    (err)=>{
    if(!err){
        console.log('connected to mongo db')
    }

})


function checkAuthenticated(req,res,next){
    if(!req.header('authorization')){
        return res.status(401).send({message:'No authorization header'});
    }
    var token = req.header('authorization').split(' ')[1]
    if(!token){
        return res.status(401).send({message:'No authorization header'});
    }
    console.log('token ' + token);
    var payload = jwt.decode(token,'123')
    console.log('payload '+ payload);
    if(!payload){
        return res.status(401).send({message:'invalid user'});
    }
    req.userId= payload.sub;
    next()
}

app.post('/register',(req,res) => {
    var userData=req.body;
    console.log(userData);
    var user = new User(userData);
    user.save((err,newUser)=>{
            if(err)
                console.log(err);

        var payload={sub:newUser._id}
        var token=jwt.encode(payload,'123')
        console.log(token)
        res.status(200).send({token})
    });
})

/** get all the posts of selected user **/
app.get('/posts/:id',async(req, res)=> {
    console.log(req.params.id)
    var author=req.params.id;
    var posts = await Post.find({author},'-password -__v')
    console.log('posts:: ' + posts)
    res.status(200).send(posts)

})


/** save a new post with login in user id as author id **/
app.post('/posts',checkAuthenticated,(req,res) => {
    var postData=req.body;
    var userId=req.userId;
    postData.author=userId;
    console.log(postData);
    var post = new Post(postData);

    post.save((err,result)=>{
        if(err)
            console.log(err);
    });

        res.status(200)
})

app.post('/login',async(req,res) => {
    var userData = req.body;
    console.log(userData);
    var user = await User.findOne({email:userData.email})

    if(!user){
        return res.status(401).send("message:invalid email");
    }

    bcrypt.compare(userData.password,user.password,(err,res)=>{
        if(!res){
            return res.status(401).send("message:invalid password");
        }
    })

    var payload={sub:user._id}

    var token=jwt.encode(payload,'123')
    console.log(token)
    return res.status(200).send({token});

});




app.get('/users',async(req, res)=> {
    //try{
        console.log(req.userId);
        var users = await User.find({},'-password -__v')
        console.log(users)
        res.send(users)
        res.sendStatus(200)
    /*}catch(error){

    }*/

})

app.get('/profile/:id',async(req, res)=> {
    //try{
    console.log(req.params.id)
    var user = await User.findById(req.params.id,'-password -__v')
    res.send(user)
    res.sendStatus(200)
/*}catch(error){

 }*/

})


app.listen(3000)
