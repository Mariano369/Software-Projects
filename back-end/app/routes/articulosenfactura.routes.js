module.exports = (app) => {
  const articulosenfactura = require('../controllers/articulosenfactura.controller.js')

  // Get all records
  app.get('/api/articulosenfactura', async (req, res) => {
    articulosenfactura.findAll({ req, res })
  })

  // Search records
  app.get('/api/articulosenfactura/search', async (req, res) => {
    articulosenfactura.find({ req, res }).then((result) => {
      res.send(result)
    })
  })

  // Retrieve a single record
  app.get('/api/articulosenfactura/:ID', async (req, res) => {
    articulosenfactura.findOne({ req, res }).then((result) => {
      res.send(result)
    })
  })

  // Add a record
  app.post('/api/articulosenfactura', async (req, res) => {
    articulosenfactura
      .createAsPromise({ req, res })
      .then((result) => {
        res.send(result)
      })
      .catch((e) => {
        res.status(e.code || 500).send(e)
      })
  })

  // Update a record
  app.put('/api/articulosenfactura/:ID', async (req, res) => {
    articulosenfactura
      .update({ req, res })
      .then((result) => {
        res.send(result)
      })
      .catch((e) => {
        res.status(500).send(e)
      })
  })

  // Delete a record
  app.delete('/api/articulosenfactura/:ID', async (req, res) => {
    articulosenfactura
      .delete({ req, res })
      .then((result) => {
        res.send(result)
      })
      .catch((e) => {
        res.status(500).send(e)
      })
  })
}
