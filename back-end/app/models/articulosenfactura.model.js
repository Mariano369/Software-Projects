const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const ArticulosEnFacturaSchema = mongoose.Schema(
  {
    Factura: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Facturas',
      autopopulate: true,
    },
    ArticuloNombre: {
      type: String,
    },

    ArticuloCantidad: {
      type: Number,
    },

    ArticuloPrecio: {
      type: Number,
    },

    Descuento: {
      type: Number,
    },

    PrecioTotal: {
      type: Number,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
)

ArticulosEnFacturaSchema.plugin(mongoosePaginate)
ArticulosEnFacturaSchema.index({
  Factura: 'text',
  ArticuloNombre: 'text',
  ArticuloCantidad: 'text',
  ArticuloPrecio: 'text',
  Descuento: 'text',
  PrecioTotal: 'text',
})

const myModel = (module.exports = mongoose.model('ArticulosEnFactura', ArticulosEnFacturaSchema, 'articulosenfactura'))
myModel.schema = ArticulosEnFacturaSchema
