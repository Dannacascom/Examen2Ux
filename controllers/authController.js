const admin = require('../firebase/firebase');
const User = require('../models/user');
const Post = require('../models/post');
const axios = require('axios');

exports.createUser = async (req, res) => {
  const { email, password, nombre, apellido } = req.body;

  try {
      const userRecord = await admin.auth().createUser({
      email,
      password
    });
    const nuevoUsuario = new User({
      email,
      nombre,
      apellido,
      firebaseId: userRecord.uid
    });

    await nuevoUsuario.save();

    res.status(201).json({
      mensaje: 'Usuario creado exitosamente en Firebase y MongoDB',
      idUsuarioMongo: nuevoUsuario._id,
      idUsuarioFirebase: userRecord.uid
    });

  } catch (error) {
    console.error('Error al crear el usuario:', error.message);
    res.status(500).json({ error: error.message });
  }
};

exports.logIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const response = await axios.post(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.FIREBASE_API_KEY}`,
      {
        email,
        password,
        returnSecureToken: true
      }
    );

    const { localId } = response.data;

    const user = await User.findOne({ firebaseId: localId });

    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado en MongoDB' });
    }

    const posts = await Post.find({ authorId: user.firebaseId });

    res.status(200).json({
      email: user.email,
      nombre: user.nombre,
      apellido: user.apellido,
      posts: posts
    });

  } catch (error) {
    console.error('Error en logIn:', error.message);
    res.status(401).json({ error: 'Credenciales inválidas o usuario no registrado' });
  }
};
