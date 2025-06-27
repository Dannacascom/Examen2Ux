const admin = require('../firebase/firebase');
const User = require('../models/user');

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
