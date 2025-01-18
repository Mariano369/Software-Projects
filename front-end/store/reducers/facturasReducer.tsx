import produce from 'immer'
import { FacturasAction, FacturasActionTypes } from '../actions/facturasActions'
import { ApiStatus, IFacturasItem } from '../models'

export const initialFacturasState: IFacturasState = {
  loadingStatus: ApiStatus.NOTLOADED,
  addingStatus: ApiStatus.NOTLOADED,
  searchingStatus: ApiStatus.NOTLOADED,
  searchString: '',
  facturas: [],
  foundfacturas: [],
  totalDocs: 0,
  errMessage: '',
  errStatus: null,
  errField: null,
}

export default function facturasReducer(state: IFacturasState = initialFacturasState, action: FacturasAction) {
  return produce(state, (draft) => {
    switch (action.type) {
      case FacturasActionTypes.SEARCH_FACTURAS:
        draft.searchString = action.searchOptions.searchString
        break
      case FacturasActionTypes.SEARCHING_FACTURAS:
        draft.searchingStatus = ApiStatus.LOADING
        draft.loadingStatus = ApiStatus.NOTLOADED
        draft.addingStatus = ApiStatus.NOTLOADED
        break

      case FacturasActionTypes.SEARCHING_FACTURAS_FAILED:
        draft.searchingStatus = ApiStatus.FAILED
        break

      case FacturasActionTypes.FOUND_FACTURAS:
        draft.searchingStatus = ApiStatus.LOADED
        action.keep ? draft.foundfacturas.push(...action.payload.facturas.docs) : (draft.foundfacturas = action.payload.facturas.docs)
        draft.totalDocs = action.payload.facturas.totalDocs
        break

      case FacturasActionTypes.LOAD_FACTURAS:
      case FacturasActionTypes.LOADING_FACTURAS:
        draft.loadingStatus = ApiStatus.LOADING
        draft.addingStatus = ApiStatus.NOTLOADED
        draft.searchingStatus = ApiStatus.NOTLOADED
        draft.foundfacturas = []
        break

      case FacturasActionTypes.LOADING_FACTURAS_FAILED:
        draft.loadingStatus = ApiStatus.FAILED
        break

      case FacturasActionTypes.LOADED_FACTURAS:
        draft.loadingStatus = ApiStatus.LOADED
        draft.facturas = action.payload.facturas.docs
        draft.totalDocs = action.payload.facturas.totalDocs
        break

      case FacturasActionTypes.ADD_FACTURAS:
      case FacturasActionTypes.ADDING_FACTURAS:
        draft.addingStatus = ApiStatus.LOADING
        draft.searchingStatus = ApiStatus.NOTLOADED
        draft.errMessage = ''
        draft.errStatus = null
        draft.errField = null
        break

      case FacturasActionTypes.ADDING_FACTURAS_FAILED:
        draft.addingStatus = ApiStatus.FAILED
        draft.errMessage = action.message
        draft.errStatus = action.status
        draft.errField = action.field
        break

      case FacturasActionTypes.ADDED_FACTURAS:
        draft.addingStatus = ApiStatus.LOADED
        draft.errStatus = 200
        draft.facturas.push(action.payload.facturas.docs[0])
        if (draft.searchString) draft.foundfacturas.push(action.payload.facturas.docs[0])
        break

      case FacturasActionTypes.REMOVE_FACTURA:
        draft.facturas.splice(
          draft.facturas.findIndex((factura) => factura._id === action.payload._id),
          1
        )
        break

      case FacturasActionTypes.EDIT_FACTURAS:
        draft.loadingStatus = ApiStatus.NOTLOADED
        draft.addingStatus = ApiStatus.LOADING
        draft.searchingStatus = ApiStatus.NOTLOADED
        break

      case FacturasActionTypes.EDITING_FACTURAS:
        draft.loadingStatus = ApiStatus.LOADING
        draft.addingStatus = ApiStatus.LOADING
        break

      case FacturasActionTypes.EDITED_FACTURAS:
        draft.addingStatus = ApiStatus.LOADED
        draft.facturas[draft.facturas.findIndex((factura) => factura._id === action.payload._id)] = action.payload
        draft.foundfacturas[draft.foundfacturas.findIndex((factura) => factura._id === action.payload._id)] = action.payload
        break

      case FacturasActionTypes.EDITING_FACTURAS_FAILED:
        draft.addingStatus = ApiStatus.FAILED
        draft.errMessage = action.message
        draft.errStatus = action.status
        draft.errField = action.field
        break
    }
  })
}

export interface IFacturasState {
  loadingStatus: ApiStatus
  addingStatus: ApiStatus
  searchingStatus: ApiStatus
  searchString: string
  facturas: IFacturasItem[]
  foundfacturas: IFacturasItem[]
  totalDocs: number
  errMessage?: string
  errStatus?: number
  errField?: string
}
