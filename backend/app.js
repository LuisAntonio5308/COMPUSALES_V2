const express = require('express');
const bodyParser = require("body-parser");
const Post = require('./models/post');
const User = require('./models/user');
const mongoose = require("mongoose");


//mongodb+srv://Luis:<password>@proyecto-laov.ys4jzyc.mongodb.net/
//mongodb+srv://josuemonjaras03:Monjaras1303@cluster0.yyssmmf.mongodb.net/

const app = express();
const user = express();

//CAMBAR TU ESTA LINEA CON TU DIRECCION DE BASE DE DATOS DE MONGODB
mongoose.connect("mongodb+srv://antonio:Prueba123@compusales.ztpvvnk.mongodb.net/node-angular")
.then(()=>{
    console.log('Base de datos Conectada');
})
.catch(() => {
    console.log('Conexion Fallida');
})


//app
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept")
    res.setHeader("Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS");
    next();

});

//Metodo de Agregar Post
app.post("/api/posts", (req, res, next) => {
    const post = new Post({
        title: req.body.title,
        content: req.body.content,
        price: req.body.price
    });
    post.save();
    res.status(201).json({
        message: 'Post Added Succesfully'
    });
});

//Metodo de obtener Informacion
app.get('/api/posts', (req, res, next) => {
    Post.find().then(documents => {
        res.status(200).json({
            message: 'Publicaciones expuestas con exito',
            posts: documents
        });
    });
});

app.delete("/api/posts/:id", (req, res, next) =>{
    Post.deleteOne({_id: req.params.id})
    .then(result => {
        console.log(result);
    })
    res.status(200).json({message: 'Publicacion Eliminada'});
})



//User
user.use(bodyParser.json());
user.use(bodyParser.urlencoded({extended: false}));

user.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept")
    res.setHeader("Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS");
    next();

});

//Metodo de Agregar User
user.post("/api/users", (req, res, next) => {
    const post = new User({
        user: req.body.user,
        password: req.body.password,
        role: req.body.role
    });
    post.save();
    res.status(203).json({
        message: 'Post Added Succesfully'
    });
});

//Metodo de obtener Informacion
user.get('/api/users', (req, res, next) => {
    User.find().then(documents => {
        res.status(202).json({
            message: 'Publicaciones expuestas con exito',
            users: documents
        });
    });
});

user.delete("/api/users/:id", (req, res, next) =>{
    User.deleteOne({_id: req.params.id})
    .then(result => {
        console.log(result);
    })
    res.status(202).json({message: 'Publicacion Eliminada'});
})

/*
module.exports = app;
module.exports = user;
*/

module.exports = { app, user};
