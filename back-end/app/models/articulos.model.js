const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const ArticulosSchema = mongoose.Schema(
  {
    Nombre: {
      type: String,
    },

    Cantidad: {
      type: Number,
    },

    Costo: {
      type: Number,
    },

    Precio: {
      type: Number,
    },

    Proveedores: {
      type: String,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
)

ArticulosSchema.plugin(mongoosePaginate)
ArticulosSchema.index({
  Nombre: 'text',
  Cantidad: 'text',
  Costo: 'text',
  Precio: 'text',
  Proveedores: 'text',
})

const myModel = (module.exports = mongoose.model('Articulos', ArticulosSchema, 'articulos'))
myModel.schema = ArticulosSchema
