import produce from 'immer'
import { ArticulosAction, ArticulosActionTypes } from '../actions/articulosActions'
import { ApiStatus, IArticulosItem } from '../models'

export const initialArticulosState: IArticulosState = {
  loadingStatus: ApiStatus.NOTLOADED,
  addingStatus: ApiStatus.NOTLOADED,
  searchingStatus: ApiStatus.NOTLOADED,
  searchString: '',
  articulos: [],
  foundarticulos: [],
  totalDocs: 0,
  errMessage: '',
  errStatus: null,
  errField: null,
}

export default function articulosReducer(state: IArticulosState = initialArticulosState, action: ArticulosAction) {
  return produce(state, (draft) => {
    switch (action.type) {
      case ArticulosActionTypes.SEARCH_ARTICULOS:
        draft.searchString = action.searchOptions.searchString
        break
      case ArticulosActionTypes.SEARCHING_ARTICULOS:
        draft.searchingStatus = ApiStatus.LOADING
        draft.loadingStatus = ApiStatus.NOTLOADED
        draft.addingStatus = ApiStatus.NOTLOADED
        break

      case ArticulosActionTypes.SEARCHING_ARTICULOS_FAILED:
        draft.searchingStatus = ApiStatus.FAILED
        break

      case ArticulosActionTypes.FOUND_ARTICULOS:
        draft.searchingStatus = ApiStatus.LOADED
        action.keep ? draft.foundarticulos.push(...action.payload.articulos.docs) : (draft.foundarticulos = action.payload.articulos.docs)
        draft.totalDocs = action.payload.articulos.totalDocs
        break

      case ArticulosActionTypes.LOAD_ARTICULOS:
      case ArticulosActionTypes.LOADING_ARTICULOS:
        draft.loadingStatus = ApiStatus.LOADING
        draft.addingStatus = ApiStatus.NOTLOADED
        draft.searchingStatus = ApiStatus.NOTLOADED
        draft.foundarticulos = []
        break

      case ArticulosActionTypes.LOADING_ARTICULOS_FAILED:
        draft.loadingStatus = ApiStatus.FAILED
        break

      case ArticulosActionTypes.LOADED_ARTICULOS:
        draft.loadingStatus = ApiStatus.LOADED
        draft.articulos = action.payload.articulos.docs
        draft.totalDocs = action.payload.articulos.totalDocs
        break

      case ArticulosActionTypes.ADD_ARTICULOS:
      case ArticulosActionTypes.ADDING_ARTICULOS:
        draft.addingStatus = ApiStatus.LOADING
        draft.searchingStatus = ApiStatus.NOTLOADED
        draft.errMessage = ''
        draft.errStatus = null
        draft.errField = null
        break

      case ArticulosActionTypes.ADDING_ARTICULOS_FAILED:
        draft.addingStatus = ApiStatus.FAILED
        draft.errMessage = action.message
        draft.errStatus = action.status
        draft.errField = action.field
        break

      case ArticulosActionTypes.ADDED_ARTICULOS:
        draft.addingStatus = ApiStatus.LOADED
        draft.errStatus = 200
        draft.articulos.push(action.payload.articulos.docs[0])
        if (draft.searchString) draft.foundarticulos.push(action.payload.articulos.docs[0])
        break

      case ArticulosActionTypes.REMOVE_ARTICULO:
        draft.articulos.splice(
          draft.articulos.findIndex((articulo) => articulo._id === action.payload._id),
          1
        )
        break

      case ArticulosActionTypes.EDIT_ARTICULOS:
        draft.loadingStatus = ApiStatus.NOTLOADED
        draft.addingStatus = ApiStatus.LOADING
        draft.searchingStatus = ApiStatus.NOTLOADED
        break

      case ArticulosActionTypes.EDITING_ARTICULOS:
        draft.loadingStatus = ApiStatus.LOADING
        draft.addingStatus = ApiStatus.LOADING
        break

      case ArticulosActionTypes.EDITED_ARTICULOS:
        draft.addingStatus = ApiStatus.LOADED
        draft.articulos[draft.articulos.findIndex((articulo) => articulo._id === action.payload._id)] = action.payload
        draft.foundarticulos[draft.foundarticulos.findIndex((articulo) => articulo._id === action.payload._id)] = action.payload
        break

      case ArticulosActionTypes.EDITING_ARTICULOS_FAILED:
        draft.addingStatus = ApiStatus.FAILED
        draft.errMessage = action.message
        draft.errStatus = action.status
        draft.errField = action.field
        break
    }
  })
}

export interface IArticulosState {
  loadingStatus: ApiStatus
  addingStatus: ApiStatus
  searchingStatus: ApiStatus
  searchString: string
  articulos: IArticulosItem[]
  foundarticulos: IArticulosItem[]
  totalDocs: number
  errMessage?: string
  errStatus?: number
  errField?: string
}
