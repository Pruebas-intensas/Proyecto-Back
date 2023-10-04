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
        console.log(data)
        res.status(200).json(data);
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error interno" });
      }
});

module.exports = routerAdmin;