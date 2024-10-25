const ArticulosEnFactura = require('../models/articulosenfactura.model.js')
const fs = require('fs')
const paginate = require('../paginate')
const errors = require('../services/errors.service')

// Create and Save a new ArticuloEnFactura
exports.create = async (options) => {
  const data = options.req ? options.req.body : options.data
  const updatedData = {}

  if (data.Factura === 'null') data.Factura = null
  updatedData['Factura'] = {}
  try {
    const Facturas = require('../models/facturas.model.js')
    let ReceivedFactura = typeof data.Factura === 'string' ? JSON.parse(data.Factura) : data.Factura
    Facturainfo = Array.isArray(ReceivedFactura) ? ReceivedFactura[0] : ReceivedFactura

    if (!Facturainfo._id) {
      const mongoose = require('mongoose')
      const FacturaID = new mongoose.Types.ObjectId()
      const Factura = new Facturas({ ...Facturainfo, _id: FacturaID })
      Factura.save()
      updatedData['Factura'] = FacturaID
    } else {
      updatedData['Factura'] = Facturainfo._id
    }
  } catch (e) {
    updatedData['Factura'] = data.Factura
  }

  if (typeof data.ArticuloNombre !== 'undefined') updatedData['ArticuloNombre'] = data.ArticuloNombre
  if (typeof data.ArticuloCantidad !== 'undefined') updatedData['ArticuloCantidad'] = data.ArticuloCantidad
  if (typeof data.ArticuloPrecio !== 'undefined') updatedData['ArticuloPrecio'] = data.ArticuloPrecio
  if (typeof data.Descuento !== 'undefined') updatedData['Descuento'] = data.Descuento
  updatedData['PrecioTotal'] = +data.ArticuloPrecio * +data.ArticuloCantidad - +data.Descuento

  // Create a ArticuloEnFactura
  const ArticuloEnFactura = new ArticulosEnFactura(updatedData)

  // Save ArticuloEnFactura in the database
  ArticuloEnFactura.save()
    .then((data) => {
      exports.findOne({ ID: data._id, res: options.res })
    })
    .catch((err) => {
      options.res.status(500).send({
        message: err.message || 'Some error occurred while saving the record.',
      })
    })
}

exports.createAsPromise = (options) => {
  return new Promise(async (resolve, reject) => {
    const data = options.req ? options.req.body : options.data
    const { errorMessages } = data
    const updatedData = {}
    if (data._id) updatedData._id = data._id

    if (data.Factura === 'null') data.Factura = null
    updatedData['Factura'] = {}
    try {
      const Facturas = require('../models/facturas.model.js')
      let ReceivedFactura = typeof data.Factura === 'string' ? JSON.parse(data.Factura) : data.Factura
      Facturainfo = Array.isArray(ReceivedFactura) ? ReceivedFactura[0] : ReceivedFactura

      if (!Facturainfo._id) {
        const mongoose = require('mongoose')
        const FacturaID = new mongoose.Types.ObjectId()
        const Factura = new Facturas({ ...Facturainfo, _id: FacturaID })
        Factura.save()
        updatedData['Factura'] = FacturaID
      } else {
        updatedData['Factura'] = Facturainfo._id
      }
    } catch (e) {
      updatedData['Factura'] = data.Factura
    }

    if (typeof data.ArticuloNombre !== 'undefined') updatedData['ArticuloNombre'] = data.ArticuloNombre
    if (typeof data.ArticuloCantidad !== 'undefined') updatedData['ArticuloCantidad'] = data.ArticuloCantidad
    if (typeof data.ArticuloPrecio !== 'undefined') updatedData['ArticuloPrecio'] = data.ArticuloPrecio
    if (typeof data.Descuento !== 'undefined') updatedData['Descuento'] = data.Descuento
    updatedData['PrecioTotal'] = +data.ArticuloPrecio * +data.ArticuloCantidad - +data.Descuento

    // Create a ArticuloEnFactura
    const ArticuloEnFactura = new ArticulosEnFactura(updatedData)

    // Save ArticuloEnFactura in the database
    ArticuloEnFactura.save()
      .then((result) => {
        if (options.skipfind) {
          resolve(result)
        } else {
          exports.findOne({ ID: result._id, res: options.res }).then((result) => {
            resolve(result)
          })
        }
      })
      .catch((err) => {
        reject(errors.prepareError(err, errorMessages))
      })
  })
}

// Retrieve and return all ArticulosEnFactura from the database.
exports.findAll = (options) => {
  const query = options.query ? options.query : options.req.query
  if (typeof query.populate === 'undefined') query.populate = 'true'
  const data = options.req ? options.req.body : options.data
  if (typeof query.sort === 'string') query.sort = JSON.parse(query.sort)
  if (!query.sortLanguage) query.sortLanguage = 'en'

  const findString = {}
  if (query.fixedSearch) {
    query.fixedSearch = JSON.parse(query.fixedSearch)
    findString[query.fixedSearch.field] = { $regex: new RegExp(query.fixedSearch.value, 'i') }
  }

  ArticulosEnFactura.find(findString)
    .sort(query.sort && { [query.sort.field]: query.sort.method === 'desc' ? -1 : 1 })
    .collation({ locale: query.sortLanguage, strength: 1 })

    .populate(
      (query.populate === 'true' || query.populate?.indexOf('Facturas') > -1) && {
        strictPopulate: false,
        model: 'Facturas',
        path: 'Factura',
      }
    )

    .then((articulosenfactura) => {
      options.res.json(paginate.paginate(articulosenfactura, { page: query.page, limit: query.limit || 10 }))
    })
    .catch((err) => {
      options.res.status(500).send({
        message: err.message || 'Some error occurred while retrieving records.',
      })
    })
}

exports.find = (options) => {
  return new Promise((resolve, reject) => {
    const query = options.query ? options.query : options.req.query
    const data = options.req ? options.req.body : options.data
    let findString = query.searchString ? { $text: { $search: query.searchString } } : {}
    if (query.searchField) {
      if (ArticulosEnFactura.schema.path(query.searchField)?.instance === 'Boolean') {
        findString = { [query.searchField]: JSON.parse(query.searchString) }
      } else if (ArticulosEnFactura.schema.path(query.searchField)?.instance === 'Date') {
        findString = { $expr: { $eq: [query.searchString, { $dateToString: { date: `$${query.searchField}`, format: '%Y-%m-%d' } }] } }
      } else {
        if (query.exactMatch) {
          findString = { [query.searchField]: query.searchString }
        } else {
          findString = { [query.searchField]: { $regex: new RegExp(query.searchString, 'i') } }
        }
      }

      if (
        ArticulosEnFactura.schema.path(query.searchField)?.instance === 'ObjectId' ||
        ArticulosEnFactura.schema.path(query.searchField)?.instance === 'Array'
      ) {
        const ObjectID = require('mongoose').Types.ObjectId
        findString = { [query.searchField]: query.searchString ? new ObjectID(query.searchString) : null }
      }
    } else if (query.filters) {
      query.filters.forEach((filter) => {
        const parsed = typeof filter === 'string' ? JSON.parse(filter) : filter
        findString[parsed.field] = parsed.value
      })
    }
    if (typeof query.sort === 'string') query.sort = JSON.parse(query.sort)
    if (!query.sortLanguage) query.sortLanguage = 'en'
    if (query.fixedSearch) {
      query.fixedSearch = JSON.parse(query.fixedSearch)
      findString[query.fixedSearch.field] = { $regex: new RegExp(query.fixedSearch.value, 'i') }
    }

    ArticulosEnFactura.find(findString)
      .sort(query.sort && { [query.sort.field]: query.sort.method === 'desc' ? -1 : 1 })
      .collation({ locale: query.sortLanguage, strength: 1 })

      .populate(
        (query.populate === 'true' || query.populate?.indexOf('Facturas') > -1) && {
          strictPopulate: false,
          model: 'Facturas',
          path: 'Factura',
        }
      )

      .then((articuloenfactura) => {
        resolve(paginate.paginate(articuloenfactura, { page: query.page, limit: query.limit || 10 }))
      })
      .catch((err) => {
        options.res.status(500).send({
          message: err.message || 'Some error occurred while retrieving records.',
        })
      })
  })
}

// Find a single ArticuloEnFactura with a ID
exports.findOne = (options) => {
  return new Promise((resolve, reject) => {
    const query = { populate: 'true' }
    const id = options.req ? options.req.params.ID : options.ID
    ArticulosEnFactura.findById(id)

      .populate(
        (query.populate === 'true' || query.populate?.indexOf('Facturas') > -1) && {
          strictPopulate: false,
          model: 'Facturas',
          path: 'Factura',
        }
      )

      .then((articuloenfactura) => {
        if (!articuloenfactura) {
          return options.res.status(404).send({
            message: 'ArticuloEnFactura not found with id ' + id,
          })
        }
        resolve(paginate.paginate([articuloenfactura]))
      })
      .catch((err) => {
        if (err.kind === 'ObjectId') {
          return options.res.status(404).send({
            message: 'ArticuloEnFactura not found with id ' + id,
          })
        }
        return options.res.status(500).send({
          message: 'Error retrieving ArticuloEnFactura with id ' + id,
        })
      })
  })
}

// Update a articuloenfactura identified by the ID in the request
exports.update = (options) => {
  return new Promise(async (resolve, reject) => {
    const id = options.req ? options.req.params.ID : options.ID
    const data = options.req ? options.req.body : options.data
    const updatedData = {}

    if (data.Factura === 'null') data.Factura = null
    updatedData['Factura'] = {}
    try {
      const Facturas = require('../models/facturas.model.js')
      let ReceivedFactura = typeof data.Factura === 'string' ? JSON.parse(data.Factura) : data.Factura
      Facturainfo = Array.isArray(ReceivedFactura) ? ReceivedFactura[0] : ReceivedFactura

      if (!Facturainfo._id) {
        const mongoose = require('mongoose')
        const FacturaID = new mongoose.Types.ObjectId()
        const Factura = new Facturas({ ...Facturainfo, _id: FacturaID })
        Factura.save()
        updatedData['Factura'] = FacturaID
      } else {
        updatedData['Factura'] = Facturainfo._id
      }
    } catch (e) {
      updatedData['Factura'] = data.Factura
    }

    if (typeof data.ArticuloNombre !== 'undefined') updatedData['ArticuloNombre'] = data.ArticuloNombre
    if (typeof data.ArticuloCantidad !== 'undefined') updatedData['ArticuloCantidad'] = data.ArticuloCantidad
    if (typeof data.ArticuloPrecio !== 'undefined') updatedData['ArticuloPrecio'] = data.ArticuloPrecio
    if (typeof data.Descuento !== 'undefined') updatedData['Descuento'] = data.Descuento
    updatedData['PrecioTotal'] = +data.ArticuloPrecio * +data.ArticuloCantidad - +data.Descuento

    // Find ArticuloEnFactura and update it with the request body
    const query = { populate: 'true' }
    ArticulosEnFactura.findByIdAndUpdate(id, updatedData, { new: true })

      .populate(
        (query.populate === 'true' || query.populate?.indexOf('Facturas') > -1) && {
          strictPopulate: false,
          model: 'Facturas',
          path: 'Factura',
        }
      )

      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

// Delete a articuloenfactura with the specified ID in the request
exports.delete = (options) => {
  return new Promise((resolve, reject) => {
    const params = options.req ? options.req.params : options
    let theFilter = { _id: params.ID }

    if (options.queryString && options.queryField) {
      theFilter = { [options.queryField]: options.queryString }
    }
    ArticulosEnFactura.deleteMany(theFilter)
      .then((result) => {
        resolve(result)
      })
      .catch((e) => {
        reject(e)
      })
  })
}
