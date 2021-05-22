const express = require("express");
const bcrypt = require("bcrypt");
const Usuario = require("../modelos/usuario");

const {
  verificaToken,
  verificaAdmin_role,
} = require("../middlewares/autenticacion");

const _ = require("underscore");
const app = express();

app.get("/usuarios", [verificaToken, verificaAdmin_role], function (req, res) {
  // res.json("GET usuarios");

  let desde = req.query.desde || 0;
  desde = Number(desde);

  let limite = req.query.limite || 5;
  limite = Number(limite);

  Usuario.find({ estado: true })
    .limit(limite)
    .skip(desde)
    .exec((err, usuarios) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          err,
        });
      }

      Usuario.countDocuments({ estado: true }, (err, conteo) => {
        res.json({
          ok: true,
          usuarios,
          cantidad: conteo,
        });
      });
    });
});
app.post("/usuarios", function (req, res) {
  // res.json('POST usuarios')

  let body = req.body;

  let usuario = new Usuario({
    nombre: body.nombre,
    email: body.email,
    password: bcrypt.hashSync(body.password, 10),
    role: body.role,
  });

  usuario.save((err, usuarioDB) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err,
      });
    }

    res.json({
      ok: true,
      usuario: usuarioDB,
    });
  });

  // if (body.usuario === undefined) {

  //     res.status(400).json({
  //         ok: false,
  //         message: 'El usuario es requerido'
  //     })
  // } else {

  //     res.json({
  //         body
  //     })
  // }
});
app.put(
  "/usuarios/:id",
  [verificaToken, verificaAdmin_role],
  function (req, res) {
    // res.json("PUT usuarios");
    let id = req.params.id;
    let body = _.pick(req.body, ["nombre", "img", "role", "estado"]);

    Usuario.findByIdAndUpdate(
      id,
      body,
      { new: true, runValidators: true },
      (err, usuarioDB) => {
        if (err) {
          return res.status(400).json({
            ok: false,
            err,
          });
        }
        res.json({
          ok: true,
          usuario: usuarioDB,
        });
      }
    );
  }
);

app.delete(
  "/usuarios/:id",
  [verificaToken, verificaAdmin_role],
  function (req, res) {
    let id = req.params.id;

    let estadoActualizado = {
      estado: false,
    };

    Usuario.findByIdAndUpdate(
      id,
      estadoActualizado,
      { new: true },
      (err, usuarioBorrado) => {
        if (err) {
          return res.status(400).json({
            ok: false,
            err,
          });
        }

        if (!usuarioBorrado) {
          return res.status(400).json({
            ok: false,
            err: {
              message: "Usuario no encontrado",
            },
          });
        }

        res.json({
          ok: true,
          usuario: usuarioBorrado,
        });
      }
    );
  }
);

module.exports = app;
