export { };

const { admin } = require('../../models');
const { Router } = require('express');
const routerAdmin = new Router();


var bodyParser = require('body-parser');
const jsonParser = bodyParser.json();


routerAdmin.get('', jsonParser, async (req: any, res: any) => {
    try {
        if (!("id" in req.query)) {
          res.status(406).json({ message: "Se requiere ingresar id" });
          return;
        }
        const data = await admin.findOne({
          where: {
            id: req.query.id
          }
        });
        if(data == null){
          res.status(404).json({ message: "Admin no encontrado" });
          return;
        }
        //console.log(data)
        res.status(200).json(data);
      } catch (error) {
        //console.log(error);
        res.status(500).json({ message: "Error interno" });
      }
});

routerAdmin.get('/all', jsonParser, async (req: any, res: any) => {
  try {
      const data = await admin.findAll();
      //console.log(data)
      res.status(200).json(data);
    } catch (error) {
      //console.log(error);
      res.status(500).json({ message: "Error interno" });
    }
});

routerAdmin.post('', jsonParser, async (req: any, res: any) => {
    try {
        const data = await admin.create(req.body);
        res.status(201).json(data);
      } catch (error) {
        //console.log(error);
        res.status(500).json({ message: "Error interno" });
      }
});

routerAdmin.put('', jsonParser, async (req: any, res: any) => {
    try {
        if (!("id" in req.query)) {
          res.status(406).json({ message: "Se requiere ingresar id" });
          return;
        }
        const data = await admin.update(req.body, {
          where: {
            id: req.query.id
          }
        });
        res.status(200).json(data);
      } catch (error) {
        //console.log(error);
        res.status(500).json({ message: "Error interno" });
      }
}
);

routerAdmin.delete('', jsonParser, async (req: any, res: any) => {
    try {
        if (!("id" in req.query)) {
          res.status(406).json({ message: "Se requiere ingresar id" });
          return;
        }
        const data = await admin.destroy({
          where: {
            id: req.query.id
          }
        });
        res.status(200).json(data);
      } catch (error) {
        //console.log(error);
        res.status(500).json({ message: "Error interno" });
      }
}
);

module.exports = routerAdmin;