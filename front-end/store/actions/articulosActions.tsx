import { IArticulosItem, IpaginatedArticulos } from '../models'

export enum ArticulosActionTypes {
  SEARCH_ARTICULOS = 'articulos/search',
  SEARCHING_ARTICULOS = 'articulos/searching',
  FOUND_ARTICULOS = 'articulos/found',
  SEARCHING_ARTICULOS_FAILED = 'articulos/searching_failed',

  LOAD_ARTICULOS = 'articulos/load',
  LOADING_ARTICULOS = 'articulos/loading',
  LOADED_ARTICULOS = 'articulos/loaded',
  LOADING_ARTICULOS_FAILED = 'articulos/loading_failed',

  ADD_ARTICULOS = 'articulos/add',
  ADDING_ARTICULOS = 'articulos/adding',
  ADDED_ARTICULOS = 'articulos/added',
  ADDING_ARTICULOS_FAILED = 'articulos/adding_failed',

  REMOVE_ARTICULO = 'articulos/remove',
  REMOVING_ARTICULO = 'articulos/removing',
  REMOVED_ARTICULO = 'articulos/removed',
  REMOVING_ARTICULO_FAILED = 'articulos/removing_failed',

  EDIT_ARTICULOS = 'articulos/edit',
  EDITING_ARTICULOS = 'articulos/editing',
  EDITED_ARTICULOS = 'articulos/edited',
  EDITING_ARTICULOS_FAILED = 'articulos/editing_failed',

  VIEW_ARTICULOS = 'articulos/view',
  VIEWING_ARTICULOS = 'articulos/viewing',
  VIEWED_ARTICULOS = 'articulos/viewed',
  VIEWING_ARTICULOS_FAILED = 'articulos/viewing_failed',
}

export function searchArticulos(searchOptions: TSearchOptions | string, keep?: boolean): ISearchArticulosAction {
  return {
    type: ArticulosActionTypes.SEARCH_ARTICULOS,
    searchOptions: typeof searchOptions === 'string' ? { searchString: searchOptions } : searchOptions,
    keep: keep,
  }
}

export function searchingArticulos(): ISearchingArticulosAction {
  return {
    type: ArticulosActionTypes.SEARCHING_ARTICULOS,
  }
}

export function foundArticulos(articulos: IpaginatedArticulos, keep?: boolean): IFoundArticulosAction {
  return {
    type: ArticulosActionTypes.FOUND_ARTICULOS,
    keep: keep,
    payload: {
      articulos,
    },
  }
}

export function searchingArticulosFailed(): ISearchingArticulosFailedAction {
  return {
    type: ArticulosActionTypes.SEARCHING_ARTICULOS_FAILED,
  }
}

export function loadArticulos(loadOptions: TSearchOptions): ILoadArticulosAction {
  return {
    type: ArticulosActionTypes.LOAD_ARTICULOS,
    loadOptions: loadOptions,
  }
}

export function loadingArticulos(): ILoadingArticulosAction {
  return {
    type: ArticulosActionTypes.LOADING_ARTICULOS,
  }
}

export function loadedArticulos(articulos: IpaginatedArticulos): ILoadedArticulosAction {
  return {
    type: ArticulosActionTypes.LOADED_ARTICULOS,
    payload: {
      articulos,
    },
  }
}

export function loadingArticulosFailed(): ILoadingArticulosFailedAction {
  return {
    type: ArticulosActionTypes.LOADING_ARTICULOS_FAILED,
  }
}

export function addArticulos(articulo: IArticulosItem): IAddArticulosAction {
  return {
    type: ArticulosActionTypes.ADD_ARTICULOS,
    payload: articulo,
  }
}

export function addingArticulos(): IAddingArticulosAction {
  return {
    type: ArticulosActionTypes.ADDING_ARTICULOS,
  }
}

export function addedArticulos(articulos: IpaginatedArticulos): IAddedArticulosAction {
  return {
    type: ArticulosActionTypes.ADDED_ARTICULOS,
    payload: {
      articulos,
    },
  }
}

export function addingArticulosFailed(errData: { data: { message: string; field?: string }; status: number }): IAddingArticulosFailedAction {
  return {
    type: ArticulosActionTypes.ADDING_ARTICULOS_FAILED,
    message: errData.data.message,
    status: errData.status,
    field: errData.data.field,
  }
}

export function removeArticulo(articulo: IArticulosItem): IRemoveArticuloAction {
  return {
    type: ArticulosActionTypes.REMOVE_ARTICULO,
    payload: articulo,
  }
}

export function removingArticulo(): IRemovingArticuloAction {
  return {
    type: ArticulosActionTypes.REMOVING_ARTICULO,
  }
}

export function removedArticulo(): IRemovedArticuloAction {
  return {
    type: ArticulosActionTypes.REMOVED_ARTICULO,
  }
}

export function removingArticuloFailed(): IRemovingArticuloFailedAction {
  return {
    type: ArticulosActionTypes.REMOVING_ARTICULO_FAILED,
  }
}

export function editArticulos(articulo: IArticulosItem): IEditArticulosAction {
  return {
    type: ArticulosActionTypes.EDIT_ARTICULOS,
    payload: articulo,
  }
}

export function editingArticulos(): IEditingArticulosAction {
  return {
    type: ArticulosActionTypes.EDITING_ARTICULOS,
  }
}

export function editedArticulos(articulos: IArticulosItem): IEditedArticulosAction {
  return {
    type: ArticulosActionTypes.EDITED_ARTICULOS,
    payload: articulos,
  }
}

export function editingArticulosFailed(errData: { data: { message: string; field?: string }; status: number }): IEditingArticulosFailedAction {
  return {
    type: ArticulosActionTypes.EDITING_ARTICULOS_FAILED,
    message: errData.data.message,
    status: errData.status,
    field: errData.data.field,
  }
}
export function viewArticulos(articulo: IArticulosItem): IViewArticulosAction {
  return {
    type: ArticulosActionTypes.VIEW_ARTICULOS,
    payload: articulo,
  }
}

export function viewingArticulos(): IViewingArticulosAction {
  return {
    type: ArticulosActionTypes.VIEWING_ARTICULOS,
  }
}

export function viewedArticulos(articulos: IArticulosItem): IViewedArticulosAction {
  return {
    type: ArticulosActionTypes.VIEWED_ARTICULOS,
    payload: articulos,
  }
}

export function viewingArticulosFailed(): IViewingArticulosFailedAction {
  return {
    type: ArticulosActionTypes.VIEWING_ARTICULOS_FAILED,
  }
}

type TSearchOptions = {
  searchString?: string
  searchField?: string
  page?: number
  limit?: number
  populate?: boolean
  sort?: {
    field: string
    method?: 'asc' | 'desc'
  }
  filters?: { field: string; value: string }[]
}

export interface ISearchArticulosAction {
  type: ArticulosActionTypes.SEARCH_ARTICULOS
  searchOptions: TSearchOptions
  keep?: boolean
}

export interface ISearchingArticulosAction {
  type: ArticulosActionTypes.SEARCHING_ARTICULOS
}

export interface IFoundArticulosAction {
  type: ArticulosActionTypes.FOUND_ARTICULOS
  keep?: boolean
  payload: {
    articulos: IpaginatedArticulos
  }
}

export interface ISearchingArticulosFailedAction {
  type: ArticulosActionTypes.SEARCHING_ARTICULOS_FAILED
}

export interface ILoadArticulosAction {
  type: ArticulosActionTypes.LOAD_ARTICULOS
  loadOptions: TSearchOptions
}

export interface ILoadingArticulosAction {
  type: ArticulosActionTypes.LOADING_ARTICULOS
}

export interface ILoadedArticulosAction {
  type: ArticulosActionTypes.LOADED_ARTICULOS
  payload: {
    articulos: IpaginatedArticulos
  }
}

export interface ILoadingArticulosFailedAction {
  type: ArticulosActionTypes.LOADING_ARTICULOS_FAILED
}

export interface IAddArticulosAction {
  type: ArticulosActionTypes.ADD_ARTICULOS
  payload: IArticulosItem
}

export interface IAddingArticulosAction {
  type: ArticulosActionTypes.ADDING_ARTICULOS
}

export interface IAddedArticulosAction {
  type: ArticulosActionTypes.ADDED_ARTICULOS
  payload: {
    articulos: IpaginatedArticulos
  }
}

export interface IAddingArticulosFailedAction {
  type: ArticulosActionTypes.ADDING_ARTICULOS_FAILED
  message: string
  status: number
  field?: string
}

export interface IRemoveArticuloAction {
  type: ArticulosActionTypes.REMOVE_ARTICULO
  payload: IArticulosItem
}

export interface IRemovingArticuloAction {
  type: ArticulosActionTypes.REMOVING_ARTICULO
}

export interface IRemovedArticuloAction {
  type: ArticulosActionTypes.REMOVED_ARTICULO
}

export interface IRemovingArticuloFailedAction {
  type: ArticulosActionTypes.REMOVING_ARTICULO_FAILED
}

export interface IEditArticulosAction {
  type: ArticulosActionTypes.EDIT_ARTICULOS
  payload: IArticulosItem
}

export interface IEditingArticulosAction {
  type: ArticulosActionTypes.EDITING_ARTICULOS
}

export interface IEditedArticulosAction {
  type: ArticulosActionTypes.EDITED_ARTICULOS
  payload: IArticulosItem
}

export interface IEditingArticulosFailedAction {
  type: ArticulosActionTypes.EDITING_ARTICULOS_FAILED
  message: string
  status: number
  field?: string
}

export interface IViewArticulosAction {
  type: ArticulosActionTypes.VIEW_ARTICULOS
  payload: IArticulosItem
}

export interface IViewingArticulosAction {
  type: ArticulosActionTypes.VIEWING_ARTICULOS
}

export interface IViewedArticulosAction {
  type: ArticulosActionTypes.VIEWED_ARTICULOS
  payload: IArticulosItem
}

export interface IViewingArticulosFailedAction {
  type: ArticulosActionTypes.VIEWING_ARTICULOS_FAILED
}

export type ArticulosAction =
  | ISearchArticulosAction
  | ISearchingArticulosAction
  | IFoundArticulosAction
  | ISearchingArticulosFailedAction
  | ILoadArticulosAction
  | ILoadingArticulosAction
  | ILoadedArticulosAction
  | ILoadingArticulosFailedAction
  | IAddArticulosAction
  | IAddingArticulosAction
  | IAddedArticulosAction
  | IAddingArticulosFailedAction
  | IRemoveArticuloAction
  | IRemovingArticuloAction
  | IRemovedArticuloAction
  | IRemovingArticuloFailedAction
  | IEditArticulosAction
  | IEditingArticulosAction
  | IEditedArticulosAction
  | IEditingArticulosFailedAction
  | IViewArticulosAction
  | IViewingArticulosAction
  | IViewedArticulosAction
  | IViewingArticulosFailedAction
