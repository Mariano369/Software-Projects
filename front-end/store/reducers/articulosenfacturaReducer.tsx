import produce from 'immer'
import { ArticulosenfacturaAction, ArticulosenfacturaActionTypes } from '../actions/articulosenfacturaActions'
import { ApiStatus, IArticulosenfacturaItem } from '../models'

export const initialArticulosenfacturaState: IArticulosenfacturaState = {
  loadingStatus: ApiStatus.NOTLOADED,
  addingStatus: ApiStatus.NOTLOADED,
  searchingStatus: ApiStatus.NOTLOADED,
  searchString: '',
  articulosenfactura: [],
  foundarticulosenfactura: [],
  totalDocs: 0,
  errMessage: '',
  errStatus: null,
  errField: null,
}

export default function articulosenfacturaReducer(
  state: IArticulosenfacturaState = initialArticulosenfacturaState,
  action: ArticulosenfacturaAction
) {
  return produce(state, (draft) => {
    switch (action.type) {
      case ArticulosenfacturaActionTypes.SEARCH_ARTICULOSENFACTURA:
        draft.searchString = action.searchOptions.searchString
        break
      case ArticulosenfacturaActionTypes.SEARCHING_ARTICULOSENFACTURA:
        draft.searchingStatus = ApiStatus.LOADING
        draft.loadingStatus = ApiStatus.NOTLOADED
        draft.addingStatus = ApiStatus.NOTLOADED
        break

      case ArticulosenfacturaActionTypes.SEARCHING_ARTICULOSENFACTURA_FAILED:
        draft.searchingStatus = ApiStatus.FAILED
        break

      case ArticulosenfacturaActionTypes.FOUND_ARTICULOSENFACTURA:
        draft.searchingStatus = ApiStatus.LOADED
        action.keep
          ? draft.foundarticulosenfactura.push(...action.payload.articulosenfactura.docs)
          : (draft.foundarticulosenfactura = action.payload.articulosenfactura.docs)
        draft.totalDocs = action.payload.articulosenfactura.totalDocs
        break

      case ArticulosenfacturaActionTypes.LOAD_ARTICULOSENFACTURA:
      case ArticulosenfacturaActionTypes.LOADING_ARTICULOSENFACTURA:
        draft.loadingStatus = ApiStatus.LOADING
        draft.addingStatus = ApiStatus.NOTLOADED
        draft.searchingStatus = ApiStatus.NOTLOADED
        draft.foundarticulosenfactura = []
        break

      case ArticulosenfacturaActionTypes.LOADING_ARTICULOSENFACTURA_FAILED:
        draft.loadingStatus = ApiStatus.FAILED
        break

      case ArticulosenfacturaActionTypes.LOADED_ARTICULOSENFACTURA:
        draft.loadingStatus = ApiStatus.LOADED
        draft.articulosenfactura = action.payload.articulosenfactura.docs
        draft.totalDocs = action.payload.articulosenfactura.totalDocs
        break

      case ArticulosenfacturaActionTypes.ADD_ARTICULOSENFACTURA:
      case ArticulosenfacturaActionTypes.ADDING_ARTICULOSENFACTURA:
        draft.addingStatus = ApiStatus.LOADING
        draft.searchingStatus = ApiStatus.NOTLOADED
        draft.errMessage = ''
        draft.errStatus = null
        draft.errField = null
        break

      case ArticulosenfacturaActionTypes.ADDING_ARTICULOSENFACTURA_FAILED:
        draft.addingStatus = ApiStatus.FAILED
        draft.errMessage = action.message
        draft.errStatus = action.status
        draft.errField = action.field
        break

      case ArticulosenfacturaActionTypes.ADDED_ARTICULOSENFACTURA:
        draft.addingStatus = ApiStatus.LOADED
        draft.errStatus = 200
        draft.articulosenfactura.push(action.payload.articulosenfactura.docs[0])
        if (draft.searchString) draft.foundarticulosenfactura.push(action.payload.articulosenfactura.docs[0])
        break

      case ArticulosenfacturaActionTypes.REMOVE_ARTICULOENFACTURA:
        draft.articulosenfactura.splice(
          draft.articulosenfactura.findIndex((articuloenfactura) => articuloenfactura._id === action.payload._id),
          1
        )
        break

      case ArticulosenfacturaActionTypes.EDIT_ARTICULOSENFACTURA:
        draft.loadingStatus = ApiStatus.NOTLOADED
        draft.addingStatus = ApiStatus.LOADING
        draft.searchingStatus = ApiStatus.NOTLOADED
        break

      case ArticulosenfacturaActionTypes.EDITING_ARTICULOSENFACTURA:
        draft.loadingStatus = ApiStatus.LOADING
        draft.addingStatus = ApiStatus.LOADING
        break

      case ArticulosenfacturaActionTypes.EDITED_ARTICULOSENFACTURA:
        draft.addingStatus = ApiStatus.LOADED
        draft.articulosenfactura[draft.articulosenfactura.findIndex((articuloenfactura) => articuloenfactura._id === action.payload._id)] =
          action.payload
        draft.foundarticulosenfactura[draft.foundarticulosenfactura.findIndex((articuloenfactura) => articuloenfactura._id === action.payload._id)] =
          action.payload
        break

      case ArticulosenfacturaActionTypes.EDITING_ARTICULOSENFACTURA_FAILED:
        draft.addingStatus = ApiStatus.FAILED
        draft.errMessage = action.message
        draft.errStatus = action.status
        draft.errField = action.field
        break
    }
  })
}

export interface IArticulosenfacturaState {
  loadingStatus: ApiStatus
  addingStatus: ApiStatus
  searchingStatus: ApiStatus
  searchString: string
  articulosenfactura: IArticulosenfacturaItem[]
  foundarticulosenfactura: IArticulosenfacturaItem[]
  totalDocs: number
  errMessage?: string
  errStatus?: number
  errField?: string
}
