export { };

const { oferta } = require('../../models');
const { Router } = require('express');
const routerOferta = new Router();


var bodyParser = require('body-parser');
const jsonParser = bodyParser.json();


routerOferta.get('', jsonParser, async (req: any, res: any) => {
    try {
        if (!("id" in req.query)) {
          res.status(406).json({ message: "Se requiere ingresar id" });
          return;
        }
        const data = await oferta.findOne({
          where: {
            id: req.query.id
          }
        });
        if(data == null){
          res.status(404).json({ message: "Oferta no encontrada" });
          return;
        }
        //console.log(data)
        res.status(200).json(data);
      } catch (error) {
        //console.log(error);
        res.status(500).json({ message: "Error interno" });
      }
});

routerOferta.get('/all', jsonParser, async (req: any, res: any) => {
  try {
      const data = await oferta.findAll();
      //console.log(data)
      res.status(200).json(data);
    } catch (error) {
      //console.log(error);
      res.status(500).json({ message: "Error interno" });
    }
});

routerOferta.post('', jsonParser, async (req: any, res: any) => {
    try {
        const data = await oferta.create(req.body);
        res.status(201).json(data);
      } catch (error) {
        //console.log(error);
        res.status(500).json({ message: "Error interno" });
      }
});

routerOferta.put('', jsonParser, async (req: any, res: any) => {
    try {
        if (!("id" in req.query)) {
          res.status(406).json({ message: "Se requiere ingresar id" });
          return;
        }
        const data = await oferta.update(req.body, {
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

routerOferta.delete('', jsonParser, async (req: any, res: any) => {
    try {
        if (!("id" in req.query)) {
          res.status(406).json({ message: "Se requiere ingresar id" });
          return;
        }
        const data = await oferta.destroy({
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

module.exports = routerOferta;