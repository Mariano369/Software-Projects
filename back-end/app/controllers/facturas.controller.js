const Facturas = require('../models/facturas.model.js')
const fs = require('fs')
const paginate = require('../paginate')
const errors = require('../services/errors.service')

// Create and Save a new Factura
exports.create = async (options) => {
  const data = options.req ? options.req.body : options.data
  const updatedData = {}

  if (typeof data.Codigo !== 'undefined') updatedData['Codigo'] = data.Codigo
  if (typeof data.Cliente !== 'undefined') updatedData['Cliente'] = data.Cliente
  if (typeof data.TotalFacturaSinIva !== 'undefined') updatedData['TotalFacturaSinIva'] = data.TotalFacturaSinIva
  if (typeof data.Iva !== 'undefined') updatedData['Iva'] = data.Iva
  if (typeof data.Total !== 'undefined') updatedData['Total'] = data.Total
  // Create a Factura
  const Factura = new Facturas(updatedData)

  // Save Factura in the database
  Factura.save()
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

    if (typeof data.Codigo !== 'undefined') updatedData['Codigo'] = data.Codigo
    if (typeof data.Cliente !== 'undefined') updatedData['Cliente'] = data.Cliente
    if (typeof data.TotalFacturaSinIva !== 'undefined') updatedData['TotalFacturaSinIva'] = data.TotalFacturaSinIva
    if (typeof data.Iva !== 'undefined') updatedData['Iva'] = data.Iva
    if (typeof data.Total !== 'undefined') updatedData['Total'] = data.Total
    // Create a Factura
    const Factura = new Facturas(updatedData)

    // Save Factura in the database
    Factura.save()
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

// Retrieve and return all Facturas from the database.
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

  Facturas.find(findString)
    .sort(query.sort && { [query.sort.field]: query.sort.method === 'desc' ? -1 : 1 })
    .collation({ locale: query.sortLanguage, strength: 1 })

    .populate(
      (query.populate === 'true' || query.populate?.indexOf('ArticulosEnFactura') > -1) && {
        strictPopulate: false,
        path: 'ArticulosEnFactura',
      }
    )

    .then((facturas) => {
      options.res.json(paginate.paginate(facturas, { page: query.page, limit: query.limit || 10 }))
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
      if (Facturas.schema.path(query.searchField)?.instance === 'Boolean') {
        findString = { [query.searchField]: JSON.parse(query.searchString) }
      } else if (Facturas.schema.path(query.searchField)?.instance === 'Date') {
        findString = { $expr: { $eq: [query.searchString, { $dateToString: { date: `$${query.searchField}`, format: '%Y-%m-%d' } }] } }
      } else {
        if (query.exactMatch) {
          findString = { [query.searchField]: query.searchString }
        } else {
          findString = { [query.searchField]: { $regex: new RegExp(query.searchString, 'i') } }
        }
      }

      if (Facturas.schema.path(query.searchField)?.instance === 'ObjectId' || Facturas.schema.path(query.searchField)?.instance === 'Array') {
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

    Facturas.find(findString)
      .sort(query.sort && { [query.sort.field]: query.sort.method === 'desc' ? -1 : 1 })
      .collation({ locale: query.sortLanguage, strength: 1 })

      .populate(
        (query.populate === 'true' || query.populate?.indexOf('ArticulosEnFactura') > -1) && {
          strictPopulate: false,
          path: 'ArticulosEnFactura',
        }
      )

      .then((factura) => {
        resolve(paginate.paginate(factura, { page: query.page, limit: query.limit || 10 }))
      })
      .catch((err) => {
        options.res.status(500).send({
          message: err.message || 'Some error occurred while retrieving records.',
        })
      })
  })
}

// Find a single Factura with a ID
exports.findOne = (options) => {
  return new Promise((resolve, reject) => {
    const query = { populate: 'true' }
    const id = options.req ? options.req.params.ID : options.ID
    Facturas.findById(id)

      .populate(
        (query.populate === 'true' || query.populate?.indexOf('ArticulosEnFactura') > -1) && {
          strictPopulate: false,
          path: 'ArticulosEnFactura',
        }
      )

      .then((factura) => {
        if (!factura) {
          return options.res.status(404).send({
            message: 'Factura not found with id ' + id,
          })
        }
        resolve(paginate.paginate([factura]))
      })
      .catch((err) => {
        if (err.kind === 'ObjectId') {
          return options.res.status(404).send({
            message: 'Factura not found with id ' + id,
          })
        }
        return options.res.status(500).send({
          message: 'Error retrieving Factura with id ' + id,
        })
      })
  })
}

// Update a factura identified by the ID in the request
exports.update = (options) => {
  return new Promise(async (resolve, reject) => {
    const id = options.req ? options.req.params.ID : options.ID
    const data = options.req ? options.req.body : options.data
    const updatedData = {}

    if (typeof data.Codigo !== 'undefined') updatedData['Codigo'] = data.Codigo
    if (typeof data.Cliente !== 'undefined') updatedData['Cliente'] = data.Cliente
    if (typeof data.TotalFacturaSinIva !== 'undefined') updatedData['TotalFacturaSinIva'] = data.TotalFacturaSinIva
    if (typeof data.Iva !== 'undefined') updatedData['Iva'] = data.Iva
    if (typeof data.Total !== 'undefined') updatedData['Total'] = data.Total
    // Find Factura and update it with the request body
    const query = { populate: 'true' }
    Facturas.findByIdAndUpdate(id, updatedData, { new: true })

      .populate(
        (query.populate === 'true' || query.populate?.indexOf('ArticulosEnFactura') > -1) && {
          strictPopulate: false,
          path: 'ArticulosEnFactura',
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

// Delete a factura with the specified ID in the request
exports.delete = (options) => {
  return new Promise((resolve, reject) => {
    const params = options.req ? options.req.params : options
    let theFilter = { _id: params.ID }

    if (options.queryString && options.queryField) {
      theFilter = { [options.queryField]: options.queryString }
    }
    Facturas.deleteMany(theFilter)
      .then((result) => {
        resolve(result)
      })
      .catch((e) => {
        reject(e)
      })
  })
}
