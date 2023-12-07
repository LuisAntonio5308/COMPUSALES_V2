

const express = require("express");
const User = require('../models/user')
const multer = require("multer");
const router = express.Router();
//Auth
const nodemailer = require("nodemailer");
const jwt = require('jsonwebtoken');

email = '';

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

//MENSAJE NORMAL
router.post('/send-email', (req, res) => {
  const { subject, body, to } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'tuccorreo',
      pass: 'rucu fdvv vdtfsefef',
    }
  });

  const mailOptions = {
    from: 'tucorreo',
    to: to,
    subject: subject,
    text: body
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error al enviar el correo:', error);
      res.status(500).json({ message: 'Error al enviar el correo' });
    } else {
      console.log('Correo enviado:', info.response);
      res.status(200).json({ message: 'Correo enviado exitosamente' });
    }
  });
});

//AQUI TERMINA MENSAJE NORMAL



router.post("", multer({storage: storage}).single("image"), async (req, res, next)=>{
    try{
        const url = req.protocol + '://' + req.get("host");

    const user = new User({
        name: req.body.name,
        password: req.body.password,
        role: req.body.role,
        email: req.body.email,
        isVerified: req.body.isVerified,
        //computadoras: req.body.computadoras, Computadoras
        imagePath: url + "/images/" + req.file.filename
    });

    // const post = req.body;
    user.save().then(createdUser =>{// me traigo el id para manejarlo
        res.status(200).json({
            message: 'User Added Succesfully',
            //post:createdPost
            //se tien los valores con oo que se estara llenando la base de datos
            user:{
                ...createdUser,
                id: createdUser._id
            }
        });
    });


    // Generar token de verificación
  const verificationToken = jwt.sign({ email: req.body.email}, 'tu_secreto', { expiresIn: '5h' });

  console.log(req.body._id)

   // Configurar el transporte de correo
   const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'tucorreo', //TU CORREO ELECTRONICO
      pass: 'rucu ', //AQUI VA EL PASSWORD QUE GUARDASTE
    },
  });


   // Enviar correo de verificación
   const mailOptions = {
    from: 'tucorreo',
    to: req.body.email,
    subject: 'Verificación de cuenta',
    text: `From COMPUSALES S.A. de C.V. Por favor, haga clic en el siguiente enlace para verificar su cuenta: http://localhost:5000/api/users/verificar/${verificationToken}` +
    '  -> Token Caducara despues de 5 Horas.',
  };


  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).json({ mensaje: 'Error al enviar el correo de verificación' });
    } else {
      console.log('Correo de verificación enviado: ' + info.response);
      res.status(201).json({ mensaje: 'Usuario registrado exitosamente. Se ha enviado un correo de verificación.' });
    }
  });

  //catch
    }catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error en el servidor' });
      }

});
//aquui
//auth

router.get('/verificar/:token', async (req, res) => {
  const token = req.params.token;
  try {
    const decoded = jwt.verify(token, 'tu_secreto');
    const userEmail = decoded.email;
    this.email = userEmail;

    // Verificar si el token ha expirado
   /* if (Date.now() > decoded.exp * 1000) {
        // El token ha expirado, eliminar el usuario
        //await User.deleteOne({ email: userEmail });
        console.log(ver);
        return res.status(401).json({ mensaje: 'Token ha expirado.' });
      }*/


    //console.log(this.isVerified=true);

    // Marcar el usuario como verificado en la base de datos
   await User.updateOne({ email: userEmail }, { $set: { isVerified: true } });

    // verificacion
    res.status(200).json({ mensaje: 'Cuenta verificada exitosamente' });

  
} catch (error) {
  //console.error(error);

  // Si el error es debido a la expiración del token, ya lo manejamos arriba
  if (error.name === 'TokenExpiredError') {
    /*await User.updateOne({ email: this.email }, { $set: { isVerified: false } });
    console.log(this.email)

    await User.deleteOne({ email: this.email });*/
    
    return res.status(401).json({ mensaje: 'Token ha expirado.' });
  }


  res.status(500).json({ mensaje: 'Error al verificar la cuenta' });
}
    
   
/*
    res.status(200).json({ mensaje: 'Cuenta verificada exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al verificar la cuenta' });
  }*/


});
//


router.put("/:id", multer({storage: storage}).single("image"), (req, res, next) =>{
    let imagePath = req.body.imagePath;
    if(req.file){
        const url = req.protocol + '://' + req.get('host');
        imagePath = url + "/images/" + req.file.filename
    }
    
    const user = new User({
        _id: req.body.id,
        name: req.body.name,
        password: req.body.password,
        role: req.body.role,
        email: req.body.email,
        isVerified: req.body.isVerified,
        imagePath: imagePath
    });

    User.updateOne({_id: req.params.id}, user).then(result =>{
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
router.get('',(req, res, next)=>{
    User.find().then(documents =>{
        res.status(200).json({
            message: 'Publicaciones expuestas con exito',
            users: documents
    });
    });
});

// Ruta para poblar los campos cuando se carguen a la pagina al momento de estar editando 
router.get("/:id", (req, res , next)=>{
    User.findById(req.params.id).then(user =>{
        if(user){
            res.status(200).json(user);
        }else{
            res.status(404).json({message: "Usuario no encontrado"});
        }
    });
});

router.delete("/:id",(req, res, next)=>{
    User.deleteOne({_id: req.params.id
    }).then(result=>{
    console.log(result);
    res.status(200).json({message: 'Publicacion Eliminada'});
    })
    // console.log(req.params.id);
    
});


module.exports = router;