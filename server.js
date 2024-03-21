const cors = require('cors');
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(cors());
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

app.post('/upload', upload.single('photo'), (req, res) => {
    console.log(`${new Date().toLocaleString()} - Request: Save car image.`);
    if (req.file) {
        res.json({
            success: true,
            message: 'Imagen subida con éxito',
            imageUrl: `http://${req.headers.host}/images/${req.file.filename}`
        });

        console.log(`${new Date().toLocaleString()} - Result: Car image saved successfully.`);
    } else {
        res.status(400).json({ success: false, message: 'No se pudo subir la imagen' });
    }
});

app.use('/images', express.static('uploads'));

app.delete('/delete/:filename', (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(__dirname, 'uploads', filename);

    fs.unlink(filePath, (err) => {
        if (err) {
            console.error(`Error deleting file: ${filename} - ${err}`);
            return res.status(500).json({ success: false, message: 'No se pudo eliminar la imagen' });
        }

        console.log(`File deleted: ${filename}`);
        res.json({ success: true, message: 'Imagen eliminada con éxito' });
    });
});

app.listen(port, () => {
    console.log(`Servidor de imágenes corriendo en el puerto ${port}`);
});