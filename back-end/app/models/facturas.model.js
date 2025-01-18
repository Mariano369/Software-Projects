const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const FacturasSchema = mongoose.Schema(
  {
    Codigo: {
      type: String,
    },

    Cliente: {
      type: String,
    },

    TotalFacturaSinIva: {
      type: Number,
    },

    Iva: {
      type: Number,
    },

    Total: {
      type: Number,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
)

FacturasSchema.virtual('ArticulosEnFactura', {
  ref: 'ArticulosEnFactura',
  localField: '_id',
  foreignField: 'Factura',
  justOne: false,
  type: '',
})

FacturasSchema.plugin(mongoosePaginate)
FacturasSchema.index({
  Codigo: 'text',
  Cliente: 'text',
  TotalFacturaSinIva: 'text',
  Iva: 'text',
  Total: 'text',
})

const myModel = (module.exports = mongoose.model('Facturas', FacturasSchema, 'facturas'))
myModel.schema = FacturasSchema
