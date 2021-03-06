const express = require("express");
const router = express.Router();
const productoController = require("../controllers/productoController");
const { check } = require("express-validator");
const auth = require("../middleware/auth");
const authrol = require("../middleware/authrol");
router.post(
  "/altaproducto",
  auth,
  authrol,
  [
    check("nombre", "El nombre del producto es obligatorio.").notEmpty(),
    check(
      "descripcion",
      "La descripcion del producto es obligatoria."
    ).notEmpty(),
    check("precio", "El precio del producto es obligatorio.").notEmpty(),
    check("imagen", "La imagen del producto es obligatoria.").notEmpty(),
    check("tipoproducto", "El tipo de producto es obligatorio.").notEmpty(),
    check("disponibilidad", "Obligatorio.").notEmpty(),
    check("tipoproducto", "Obligatorio.").notEmpty(),


  ],
  productoController.crearProducto
);
//actualizar producto
router.put("/update/:id", auth, authrol, productoController.updateProducto);
//obtener TODOS los productos
router.get("/listado", productoController.obtenerProductos);
router.get("/producto/:id", productoController.obtenerProducto);
router.get("/productosfiltrados", productoController.ObtenerProductoFiltrado);
router.delete("/delete/:id",auth, authrol, productoController.eliminarProducto)
module.exports = router;
