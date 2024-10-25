module.exports = (app) => {
  const facturas = require('../controllers/facturas.controller.js')

  // Get all records
  app.get('/api/facturas', async (req, res) => {
    facturas.findAll({ req, res })
  })

  // Search records
  app.get('/api/facturas/search', async (req, res) => {
    facturas.find({ req, res }).then((result) => {
      res.send(result)
    })
  })

  // Retrieve a single record
  app.get('/api/facturas/:ID', async (req, res) => {
    facturas.findOne({ req, res }).then((result) => {
      res.send(result)
    })
  })

  // Add a record
  app.post('/api/facturas', async (req, res) => {
    facturas
      .createAsPromise({ req, res })
      .then((result) => {
        res.send(result)
      })
      .catch((e) => {
        res.status(e.code || 500).send(e)
      })
  })

  // Update a record
  app.put('/api/facturas/:ID', async (req, res) => {
    facturas
      .update({ req, res })
      .then((result) => {
        res.send(result)
      })
      .catch((e) => {
        res.status(500).send(e)
      })
  })

  // Delete a record
  app.delete('/api/facturas/:ID', async (req, res) => {
    facturas
      .delete({ req, res })
      .then((result) => {
        res.send(result)
      })
      .catch((e) => {
        res.status(500).send(e)
      })
  })
}
