export { };

const { producto } = require('../../models');
const { Router } = require('express');
const routerProducto = new Router();


var bodyParser = require('body-parser');
const jsonParser = bodyParser.json();


routerProducto.get('', jsonParser, async (req: any, res: any) => {
    try {
        if (!("id" in req.query)) {
          res.status(406).json({ message: "Se requiere ingresar id" });
          return;
        }
        const data = await producto.findOne({
          where: {
            id: req.query.id
          }
        });
        console.log(data)
        res.status(200).json(data);
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error interno" });
      }
});

routerProducto.get('/all', jsonParser, async (req: any, res: any) => {
  try {
      const data = await producto.findAll();
      console.log(data)
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error interno" });
    }
});

routerProducto.post('', jsonParser, async (req: any, res: any) => {
    try {
        const data = await producto.create(req.body);
        res.status(201).json(data);
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error interno" });
      }
});

routerProducto.put('', jsonParser, async (req: any, res: any) => {
    try {
        if (!("id" in req.query)) {
          res.status(406).json({ message: "Se requiere ingresar id" });
          return;
        }
        const data = await producto.update(req.body, {
          where: {
            id: req.query.id
          }
        });
        res.status(200).json(data);
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error interno" });
      }
}
);

routerProducto.delete('', jsonParser, async (req: any, res: any) => {
    try {
        if (!("id" in req.query)) {
          res.status(406).json({ message: "Se requiere ingresar id" });
          return;
        }
        const data = await producto.destroy({
          where: {
            id: req.query.id
          }
        });
        res.status(200).json(data);
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error interno" });
      }
}
);

module.exports = routerProducto;