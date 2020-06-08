const Turno = require("../models/Turno");
const { validationResult } = require("express-validator");
const moment = require("moment");

exports.crearTurno = async (req, res) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(422).json({ errores: errores.array() });
  }

  const { fecha, hora } = req.body;

  try {
    let turno = await Turno.findOne({ fecha, hora });
    if (turno) {
      return res
        .status(403)
        .json({ msg: "Elija una fecha y un horario que este disponible." });
    }
    turno = new Turno(req.body);
    turno.dueño = req.usuario.id;
    await turno.save();

    res.json({ msg: "Turno creado correctamente" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Hubo un error." });
  }
};

//obtener
exports.obtenerHorariosDisponibles = async (req, res) => {
  let hdisp = [
    "9:00",
    "9:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00",
    "18:30",
    "19:00",
  ];
  try {
    let turno = await Turno.find({ fecha: req.params.fecha });
    res.json({ turno });
    if (turno) {
      hdisp.filter((horario) => horario !== turno.hora);
    }
  } catch (error) {
    res.status(500).json({ msg: "Hubo un error." });
  }
};

//obtener turnos
exports.obtenerTurnos = async (req, res) => {
  try {
    const turnos = await Turno.find({});
    res.json(turnos);
  } catch (error) {
    res.status(500).json({ msg: "Hubo un error." });
  }
};
//obtener todos los turnos de un usuario en especifico
exports.obtenerTurnosUsuario = async (req, res) => {
  try {
    const turnos = await Turno.find({ dueño: req.params.id });
    res.json({ turnos });
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};

//eliminar turnos de la bd
exports.eliminarTurno = async (req, res) => {
  try {
    let turno = await Turno.findById(req.params.id);
    if (!turno) {
      res.status(404).json({ msg: "Turno no encontrado." });
    }
    //lo elimino
    await Turno.findByIdAndRemove({ _id: req.params.id });
    res.json({ msg: "Turno eliminado correctamente." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Hubo un error." });
  }
};
