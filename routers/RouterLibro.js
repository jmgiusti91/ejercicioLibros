const Libro = require('../models/Libros');
const express = require('express');
const router = express.Router({mergeParams: true});

router.get('/', (req, res) => {
    Libro.find({}, (err, libros) => {
        let librosArr = [];
        if(err) {
            return res.status(500).send({message: err.message});
        }
        if(libros) {
            libros.forEach(l => {
                librosArr.push(l);
            });
        }
        res.send(librosArr);
    });
});

router.post('/', (req, res) => {
    Libro.findOne({
        nombre: req.body.nombre,
        autor: req.body.autor,
        editorial: req.body.editorial,
        edicion: req.body.edicion
    }, (err, libroExistente) => {
        if(err) {
            return res.status(500).send({message: err.message});
        }
        if(libroExistente) {
            return res.status(409).send({message: 'Ya existe ese libro'});
        }

        const libro = new Libro({
            nombre: req.body.nombre,
            editorial: req.body.editorial,
            autor: req.body.autor,
            edicion: req.body.edicion
        });

        libro.save((err) => {
            if(err) {
                return res.status(500).send({message: err.message});
            }
            res.send(libro);
        });
    });
});

router.delete('/:id', (req, res) => {
    Libro.findById(req.params.id, (err, libro) => {
        if(err) {
            return res.status(500).send({message: err.message});
        }
        if(!libro) {
            return res.status(500).send({message: 'Libro no encontrado'});
        }
        libro.remove(err => {
            if(err) {
                return res.status(500).send({message: err.message});
            }
            res.status(200).send({message: 'Libro eliminado satisfactoriamente'});
        });
    });
});

module.exports = router;