//aplicacion que va ser que funcione importar expreess
const express = require('express');
const bodyParser = require("body-parser");
const Post = require('./models/post');
const User = require('./models/user');
const mongoose = require("mongoose");

const postsRouters = require('./routes/posts');
const path = require('path');
const path1 = require('path');

//User
const usersRouters = require('./routes/users');

const app = express();
const user = express();

//Conectamos a nuestra base de datos
//mongoose.connect("mongodb+srv://lrs20110814:Garcis95@cluster0.lcbkv1z.mongodb.net/node-angular")
mongoose.connect("mongodb+srv://antonio:Prueba123@compusales.ztpvvnk.mongodb.net/node-angular")
//comprobacion de que todo esta bien la conexion
.then(()=>{
    console.log('Base de datos conectada');
})
.catch(()=>{
    console.log('Conexion fallida');
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use("/images", express.static(path.join("backend/images")));
app.use((req , res, next)=>{
    // Permisos
res.setHeader("Access-Control-Allow-Origin", "*")
res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
res.setHeader("Access-Control-Allow-Methods","GET, POST, PATCH,PUT,  DELETE, OPTIONS");
  next();
});


//USER
user.use(bodyParser.json());
user.use(bodyParser.urlencoded({extended: false}));
user.use("/images", express.static(path1.join("backend/images")));
user.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept")
    res.setHeader("Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS");
    next();

});

app.use("/api/posts", postsRouters);
user.use("/api/users", usersRouters)


//module.exports = user;
module.exports = { app, user}



/*
//User
user.use(bodyParser.json());
user.use(bodyParser.urlencoded({extended: false}));

user.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept")
    res.setHeader("Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS, PUT");
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


module.exports = { app, user};
*/
