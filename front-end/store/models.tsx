export interface IFacturasItem {
  _id?: String
  createdAt: Date

  Codigo: string

  Cliente: string
  TotalFacturaSinIva: Number
  Iva: Number
  Total: Number
  // Facturas - ArticulosEnFactura - Factura - Facturas - Codigo
  ArticulosEnFactura: IArticulosenfacturaItem[]
}

export interface IpaginatedFacturas {
  docs: IFacturasItem[]
  totalDocs: number
  offset: number
  limit: number
  totalPages: number
  page: number
  pagingCounter: number
  hasPrevPage: boolean
  hasNextPage: boolean
  prevPage: number | null
  nextPage: number | null
}
export interface IArticulosenfacturaItem {
  _id?: String
  createdAt: Date
  Factura: IFacturasItem

  ArticuloNombre: string
  ArticuloCantidad: Number
  ArticuloPrecio: Number
  Descuento: Number

  PrecioTotal: string
}

export interface IpaginatedArticulosenfactura {
  docs: IArticulosenfacturaItem[]
  totalDocs: number
  offset: number
  limit: number
  totalPages: number
  page: number
  pagingCounter: number
  hasPrevPage: boolean
  hasNextPage: boolean
  prevPage: number | null
  nextPage: number | null
}
export interface IArticulosItem {
  _id?: String
  createdAt: Date

  Nombre: string
  Cantidad: Number
  Costo: Number
  Precio: Number

  Proveedores: string
}

export interface IpaginatedArticulos {
  docs: IArticulosItem[]
  totalDocs: number
  offset: number
  limit: number
  totalPages: number
  page: number
  pagingCounter: number
  hasPrevPage: boolean
  hasNextPage: boolean
  prevPage: number | null
  nextPage: number | null
}

export enum ApiStatus {
  NOTLOADED = 'notloaded',
  LOADING = 'loading',
  LOADED = 'loaded',
  FAILED = 'failed',
}
