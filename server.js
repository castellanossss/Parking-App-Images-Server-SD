const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const port = process.env.PORT || 3008;


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname))
    }
});

const upload = multer({ storage: storage });

app.post('/upload', upload.single('image'), (req, res) => {
    if (req.file) {
        res.json({
            success: true,
            message: 'Imagen subida con éxito',
            imageUrl: `http://${req.headers.host}/images/${req.file.filename}`
        });
    } else {
        res.status(400).json({ success: false, message: 'No se pudo subir la imagen' });
    }
});

app.use('/images', express.static('uploads'));

app.listen(port, () => {
    console.log(`Servidor de imágenes corriendo en el puerto ${port}`);
});