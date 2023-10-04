export { };

const { usuario } = require('../../models');
const { Router } = require('express');
const routerUsuario = new Router();


var bodyParser = require('body-parser');
const jsonParser = bodyParser.json();


routerUsuario.get('', jsonParser, async (req: any, res: any) => {
    try {
        if (!("id" in req.query)) {
          res.status(406).json({ message: "Se requiere ingresar id" });
          return;
        }
        const data = await usuario.findOne({
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

routerUsuario.get('/all', jsonParser, async (req: any, res: any) => {
  try {
      const data = await usuario.findAll();
      console.log(data)
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error interno" });
    }
});

routerUsuario.post('', jsonParser, async (req: any, res: any) => {
    try {
        const data = await usuario.create(req.body);
        res.status(201).json(data);
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error interno" });
      }
});

routerUsuario.put('', jsonParser, async (req: any, res: any) => {
    try {
        if (!("id" in req.query)) {
          res.status(406).json({ message: "Se requiere ingresar id" });
          return;
        }
        const data = await usuario.update(req.body, {
          where: {
            id: req.query.id
          }
        });
        res.status(200).json(data);
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error interno" });
      }
});

routerUsuario.delete('', jsonParser, async (req: any, res: any) => {
    try {
        if (!("id" in req.query)) {
          res.status(406).json({ message: "Se requiere ingresar id" });
          return;
        }
        const data = await usuario.destroy({
          where: {
            id: req.query.id
          }
        });
        res.status(200).json(data);
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error interno" });
      }
});

routerUsuario.post('/login', jsonParser, async (req: any, res: any) => {
    const { email, password } = req.body

    try {
        const resultados = await usuario.findOne({
            where: { correo: email }
        })
        if (!resultados) {
            return res.status(400).json({ message: 'Usuario no encontrado' });
        }
      //console.log(resultados)
       if (resultados.password == password) {
            return res.status(200).json({ message: 'Login exitoso' });
        } else {
            return res.status(400).json({ message: 'Contraseña incorrecta' });
        }
    } catch (error) {
        //console.log(error);
        res.status(500).json({ message: "Error interno" });
    }
})

module.exports = routerUsuario;