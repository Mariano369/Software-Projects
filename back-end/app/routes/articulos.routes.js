module.exports = (app) => {
  const articulos = require('../controllers/articulos.controller.js')

  // Get all records
  app.get('/api/articulos', async (req, res) => {
    articulos.findAll({ req, res })
  })

  // Search records
  app.get('/api/articulos/search', async (req, res) => {
    articulos.find({ req, res }).then((result) => {
      res.send(result)
    })
  })

  // Retrieve a single record
  app.get('/api/articulos/:ID', async (req, res) => {
    articulos.findOne({ req, res }).then((result) => {
      res.send(result)
    })
  })

  // Add a record
  app.post('/api/articulos', async (req, res) => {
    articulos
      .createAsPromise({ req, res })
      .then((result) => {
        res.send(result)
      })
      .catch((e) => {
        res.status(e.code || 500).send(e)
      })
  })

  // Update a record
  app.put('/api/articulos/:ID', async (req, res) => {
    articulos
      .update({ req, res })
      .then((result) => {
        res.send(result)
      })
      .catch((e) => {
        res.status(500).send(e)
      })
  })

  // Delete a record
  app.delete('/api/articulos/:ID', async (req, res) => {
    articulos
      .delete({ req, res })
      .then((result) => {
        res.send(result)
      })
      .catch((e) => {
        res.status(500).send(e)
      })
  })
}
