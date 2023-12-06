const express = require("express");
const Post = require('../models/post')
const multer = require("multer");
const router = express.Router();



const IMAGE_TYPE_MAP = {
    'image/png': 'png',
    'image/jpg': 'jpg',
    'image/jpeg':  'jpeg'
};

const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        const isValid = IMAGE_TYPE_MAP[file.mimetype];
        let error = new Error("Extension no valida");
        if(isValid){
            error = null;
        }
    cb(error, "backend/images");
    },
    filename: (req, file, cb) =>{
        const name = file.originalname.toLowerCase( ).split(' ').join('-');
        const ext = IMAGE_TYPE_MAP[file.mimetype];
        cb(null, name + '-' + Date.now() + '.' + ext);
    }
});



router.post("", multer({storage: storage}).single("image"), (req, res, next)=>{
    const url = req.protocol + '://' + req.get("host");
    
    const post = new Post({
        title: req.body.title,
        content: req.body.content,
        price: req.body.price,
        imagePath: url + "/images/" + req.file.filename
    });

    // const post = req.body;
    post.save().then(createdPost =>{// me traigo el id para manejarlo
        res.status(200).json({
            message: 'Post Added Succesfully',
            //post:createdPost
            //se tien los valores con oo que se estara llenando la base de datos
            post:{
                ...createdPost,
                id: createdPost._id
            }
        });
    });
});

router.put("/:id", multer({storage: storage}).single("image"), (req, res, next) =>{
    let imagePath = req.body.imagePath;
    if(req.file){
        const url = req.protocol + '://' + req.get('host');
        imagePath = url + "/images/" + req.file.filename
    }
    
    const post = new Post({
        _id: req.body.id,
        title: req.body.title,
        content: req.body.content,
        price: req.body.price,
        imagePath: imagePath
    });

    Post.updateOne({_id: req.params.id}, post).then(result =>{
       // console.log(result);
        res.status(200).json({message: "Actualizaciones exitosa :)"});
        console.log('Actualizacion exitosa segun');
    })
});


// app.use((req,res,next) =>{
//     console.log("Primer Middleware");
//     next();
// } )
//Este es para que los datos los mande y los encunetre 
router.get('',(req,res,next)=>{
    
    
    Post.find().then(documents =>{
        res.status(200).json({
            message: 'Publicaciones expuestas con exito',
            posts: documents
    });
    });
});
// Ruta para poblar los campos cuando se carguen a la pagina al momento de estar editando 
router.get("/:id", (req, res , next)=>{
    Post.findById(req.params.id).then(post =>{
        if(post){
            res.status(200).json(post);
        }else{
            res.status(404).json({message: "Post no encontrado"});
        }
    });
});
router.delete("/:id",(req, res, next)=>{
    Post.deleteOne({_id: req.params.id
    }).then(result=>{
    console.log(result);
    res.status(200).json({message: 'Publicacion Eliminada'});
    })
    // console.log(req.params.id);
    
});

module.exports = router;