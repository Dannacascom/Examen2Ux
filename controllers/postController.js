const Post = require('../models/post');
const User = require('../models/user');

exports.createPost = async (req, res) => {
  const { title, content , authorId} = req.body;

   if (!title || !content || !authorId) {
    return res.status(400).json({
      Mensaje: 'Error al hacer al crear post',
    });
  }
  const autorExiste = await User.findOne({ firebaseId: authorId });
    if (!autorExiste) {
      return res.status(404).json({
        Mensaje: 'authorId no encontrado',
      });
    }

  try{
    const nuevoPost = new Post({
      title,
      content,
      authorId
    });

  const savedPost = await nuevoPost.save();

  res.status(201).json({
    Mensaje : 'Post creado exitosamente',
    postId : savedPost._id
  });
}catch (error) {
  console.error('Error al crear el post:', error.message);
  res.status(500).json({error: error.message});
}
};