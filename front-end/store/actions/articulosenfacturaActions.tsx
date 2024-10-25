import { IArticulosenfacturaItem, IpaginatedArticulosenfactura } from '../models'

export enum ArticulosenfacturaActionTypes {
  SEARCH_ARTICULOSENFACTURA = 'articulosenfactura/search',
  SEARCHING_ARTICULOSENFACTURA = 'articulosenfactura/searching',
  FOUND_ARTICULOSENFACTURA = 'articulosenfactura/found',
  SEARCHING_ARTICULOSENFACTURA_FAILED = 'articulosenfactura/searching_failed',

  LOAD_ARTICULOSENFACTURA = 'articulosenfactura/load',
  LOADING_ARTICULOSENFACTURA = 'articulosenfactura/loading',
  LOADED_ARTICULOSENFACTURA = 'articulosenfactura/loaded',
  LOADING_ARTICULOSENFACTURA_FAILED = 'articulosenfactura/loading_failed',

  ADD_ARTICULOSENFACTURA = 'articulosenfactura/add',
  ADDING_ARTICULOSENFACTURA = 'articulosenfactura/adding',
  ADDED_ARTICULOSENFACTURA = 'articulosenfactura/added',
  ADDING_ARTICULOSENFACTURA_FAILED = 'articulosenfactura/adding_failed',

  REMOVE_ARTICULOENFACTURA = 'articulosenfactura/remove',
  REMOVING_ARTICULOENFACTURA = 'articulosenfactura/removing',
  REMOVED_ARTICULOENFACTURA = 'articulosenfactura/removed',
  REMOVING_ARTICULOENFACTURA_FAILED = 'articulosenfactura/removing_failed',

  EDIT_ARTICULOSENFACTURA = 'articulosenfactura/edit',
  EDITING_ARTICULOSENFACTURA = 'articulosenfactura/editing',
  EDITED_ARTICULOSENFACTURA = 'articulosenfactura/edited',
  EDITING_ARTICULOSENFACTURA_FAILED = 'articulosenfactura/editing_failed',

  VIEW_ARTICULOSENFACTURA = 'articulosenfactura/view',
  VIEWING_ARTICULOSENFACTURA = 'articulosenfactura/viewing',
  VIEWED_ARTICULOSENFACTURA = 'articulosenfactura/viewed',
  VIEWING_ARTICULOSENFACTURA_FAILED = 'articulosenfactura/viewing_failed',
}

export function searchArticulosenfactura(searchOptions: TSearchOptions | string, keep?: boolean): ISearchArticulosenfacturaAction {
  return {
    type: ArticulosenfacturaActionTypes.SEARCH_ARTICULOSENFACTURA,
    searchOptions: typeof searchOptions === 'string' ? { searchString: searchOptions } : searchOptions,
    keep: keep,
  }
}

export function searchingArticulosenfactura(): ISearchingArticulosenfacturaAction {
  return {
    type: ArticulosenfacturaActionTypes.SEARCHING_ARTICULOSENFACTURA,
  }
}

export function foundArticulosenfactura(articulosenfactura: IpaginatedArticulosenfactura, keep?: boolean): IFoundArticulosenfacturaAction {
  return {
    type: ArticulosenfacturaActionTypes.FOUND_ARTICULOSENFACTURA,
    keep: keep,
    payload: {
      articulosenfactura,
    },
  }
}

export function searchingArticulosenfacturaFailed(): ISearchingArticulosenfacturaFailedAction {
  return {
    type: ArticulosenfacturaActionTypes.SEARCHING_ARTICULOSENFACTURA_FAILED,
  }
}

export function loadArticulosenfactura(loadOptions: TSearchOptions): ILoadArticulosenfacturaAction {
  return {
    type: ArticulosenfacturaActionTypes.LOAD_ARTICULOSENFACTURA,
    loadOptions: loadOptions,
  }
}

export function loadingArticulosenfactura(): ILoadingArticulosenfacturaAction {
  return {
    type: ArticulosenfacturaActionTypes.LOADING_ARTICULOSENFACTURA,
  }
}

export function loadedArticulosenfactura(articulosenfactura: IpaginatedArticulosenfactura): ILoadedArticulosenfacturaAction {
  return {
    type: ArticulosenfacturaActionTypes.LOADED_ARTICULOSENFACTURA,
    payload: {
      articulosenfactura,
    },
  }
}

export function loadingArticulosenfacturaFailed(): ILoadingArticulosenfacturaFailedAction {
  return {
    type: ArticulosenfacturaActionTypes.LOADING_ARTICULOSENFACTURA_FAILED,
  }
}

export function addArticulosenfactura(articuloenfactura: IArticulosenfacturaItem): IAddArticulosenfacturaAction {
  return {
    type: ArticulosenfacturaActionTypes.ADD_ARTICULOSENFACTURA,
    payload: articuloenfactura,
  }
}

export function addingArticulosenfactura(): IAddingArticulosenfacturaAction {
  return {
    type: ArticulosenfacturaActionTypes.ADDING_ARTICULOSENFACTURA,
  }
}

export function addedArticulosenfactura(articulosenfactura: IpaginatedArticulosenfactura): IAddedArticulosenfacturaAction {
  return {
    type: ArticulosenfacturaActionTypes.ADDED_ARTICULOSENFACTURA,
    payload: {
      articulosenfactura,
    },
  }
}

export function addingArticulosenfacturaFailed(errData: {
  data: { message: string; field?: string }
  status: number
}): IAddingArticulosenfacturaFailedAction {
  return {
    type: ArticulosenfacturaActionTypes.ADDING_ARTICULOSENFACTURA_FAILED,
    message: errData.data.message,
    status: errData.status,
    field: errData.data.field,
  }
}

export function removeArticuloenfactura(articuloenfactura: IArticulosenfacturaItem): IRemoveArticuloenfacturaAction {
  return {
    type: ArticulosenfacturaActionTypes.REMOVE_ARTICULOENFACTURA,
    payload: articuloenfactura,
  }
}

export function removingArticuloenfactura(): IRemovingArticuloenfacturaAction {
  return {
    type: ArticulosenfacturaActionTypes.REMOVING_ARTICULOENFACTURA,
  }
}

export function removedArticuloenfactura(): IRemovedArticuloenfacturaAction {
  return {
    type: ArticulosenfacturaActionTypes.REMOVED_ARTICULOENFACTURA,
  }
}

export function removingArticuloenfacturaFailed(): IRemovingArticuloenfacturaFailedAction {
  return {
    type: ArticulosenfacturaActionTypes.REMOVING_ARTICULOENFACTURA_FAILED,
  }
}

export function editArticulosenfactura(articuloenfactura: IArticulosenfacturaItem): IEditArticulosenfacturaAction {
  return {
    type: ArticulosenfacturaActionTypes.EDIT_ARTICULOSENFACTURA,
    payload: articuloenfactura,
  }
}

export function editingArticulosenfactura(): IEditingArticulosenfacturaAction {
  return {
    type: ArticulosenfacturaActionTypes.EDITING_ARTICULOSENFACTURA,
  }
}

export function editedArticulosenfactura(articulosenfactura: IArticulosenfacturaItem): IEditedArticulosenfacturaAction {
  return {
    type: ArticulosenfacturaActionTypes.EDITED_ARTICULOSENFACTURA,
    payload: articulosenfactura,
  }
}

export function editingArticulosenfacturaFailed(errData: {
  data: { message: string; field?: string }
  status: number
}): IEditingArticulosenfacturaFailedAction {
  return {
    type: ArticulosenfacturaActionTypes.EDITING_ARTICULOSENFACTURA_FAILED,
    message: errData.data.message,
    status: errData.status,
    field: errData.data.field,
  }
}
export function viewArticulosenfactura(articuloenfactura: IArticulosenfacturaItem): IViewArticulosenfacturaAction {
  return {
    type: ArticulosenfacturaActionTypes.VIEW_ARTICULOSENFACTURA,
    payload: articuloenfactura,
  }
}

export function viewingArticulosenfactura(): IViewingArticulosenfacturaAction {
  return {
    type: ArticulosenfacturaActionTypes.VIEWING_ARTICULOSENFACTURA,
  }
}

export function viewedArticulosenfactura(articulosenfactura: IArticulosenfacturaItem): IViewedArticulosenfacturaAction {
  return {
    type: ArticulosenfacturaActionTypes.VIEWED_ARTICULOSENFACTURA,
    payload: articulosenfactura,
  }
}

export function viewingArticulosenfacturaFailed(): IViewingArticulosenfacturaFailedAction {
  return {
    type: ArticulosenfacturaActionTypes.VIEWING_ARTICULOSENFACTURA_FAILED,
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

export interface ISearchArticulosenfacturaAction {
  type: ArticulosenfacturaActionTypes.SEARCH_ARTICULOSENFACTURA
  searchOptions: TSearchOptions
  keep?: boolean
}

export interface ISearchingArticulosenfacturaAction {
  type: ArticulosenfacturaActionTypes.SEARCHING_ARTICULOSENFACTURA
}

export interface IFoundArticulosenfacturaAction {
  type: ArticulosenfacturaActionTypes.FOUND_ARTICULOSENFACTURA
  keep?: boolean
  payload: {
    articulosenfactura: IpaginatedArticulosenfactura
  }
}

export interface ISearchingArticulosenfacturaFailedAction {
  type: ArticulosenfacturaActionTypes.SEARCHING_ARTICULOSENFACTURA_FAILED
}

export interface ILoadArticulosenfacturaAction {
  type: ArticulosenfacturaActionTypes.LOAD_ARTICULOSENFACTURA
  loadOptions: TSearchOptions
}

export interface ILoadingArticulosenfacturaAction {
  type: ArticulosenfacturaActionTypes.LOADING_ARTICULOSENFACTURA
}

export interface ILoadedArticulosenfacturaAction {
  type: ArticulosenfacturaActionTypes.LOADED_ARTICULOSENFACTURA
  payload: {
    articulosenfactura: IpaginatedArticulosenfactura
  }
}

export interface ILoadingArticulosenfacturaFailedAction {
  type: ArticulosenfacturaActionTypes.LOADING_ARTICULOSENFACTURA_FAILED
}

export interface IAddArticulosenfacturaAction {
  type: ArticulosenfacturaActionTypes.ADD_ARTICULOSENFACTURA
  payload: IArticulosenfacturaItem
}

export interface IAddingArticulosenfacturaAction {
  type: ArticulosenfacturaActionTypes.ADDING_ARTICULOSENFACTURA
}

export interface IAddedArticulosenfacturaAction {
  type: ArticulosenfacturaActionTypes.ADDED_ARTICULOSENFACTURA
  payload: {
    articulosenfactura: IpaginatedArticulosenfactura
  }
}

export interface IAddingArticulosenfacturaFailedAction {
  type: ArticulosenfacturaActionTypes.ADDING_ARTICULOSENFACTURA_FAILED
  message: string
  status: number
  field?: string
}

export interface IRemoveArticuloenfacturaAction {
  type: ArticulosenfacturaActionTypes.REMOVE_ARTICULOENFACTURA
  payload: IArticulosenfacturaItem
}

export interface IRemovingArticuloenfacturaAction {
  type: ArticulosenfacturaActionTypes.REMOVING_ARTICULOENFACTURA
}

export interface IRemovedArticuloenfacturaAction {
  type: ArticulosenfacturaActionTypes.REMOVED_ARTICULOENFACTURA
}

export interface IRemovingArticuloenfacturaFailedAction {
  type: ArticulosenfacturaActionTypes.REMOVING_ARTICULOENFACTURA_FAILED
}

export interface IEditArticulosenfacturaAction {
  type: ArticulosenfacturaActionTypes.EDIT_ARTICULOSENFACTURA
  payload: IArticulosenfacturaItem
}

export interface IEditingArticulosenfacturaAction {
  type: ArticulosenfacturaActionTypes.EDITING_ARTICULOSENFACTURA
}

export interface IEditedArticulosenfacturaAction {
  type: ArticulosenfacturaActionTypes.EDITED_ARTICULOSENFACTURA
  payload: IArticulosenfacturaItem
}

export interface IEditingArticulosenfacturaFailedAction {
  type: ArticulosenfacturaActionTypes.EDITING_ARTICULOSENFACTURA_FAILED
  message: string
  status: number
  field?: string
}

export interface IViewArticulosenfacturaAction {
  type: ArticulosenfacturaActionTypes.VIEW_ARTICULOSENFACTURA
  payload: IArticulosenfacturaItem
}

export interface IViewingArticulosenfacturaAction {
  type: ArticulosenfacturaActionTypes.VIEWING_ARTICULOSENFACTURA
}

export interface IViewedArticulosenfacturaAction {
  type: ArticulosenfacturaActionTypes.VIEWED_ARTICULOSENFACTURA
  payload: IArticulosenfacturaItem
}

export interface IViewingArticulosenfacturaFailedAction {
  type: ArticulosenfacturaActionTypes.VIEWING_ARTICULOSENFACTURA_FAILED
}

export type ArticulosenfacturaAction =
  | ISearchArticulosenfacturaAction
  | ISearchingArticulosenfacturaAction
  | IFoundArticulosenfacturaAction
  | ISearchingArticulosenfacturaFailedAction
  | ILoadArticulosenfacturaAction
  | ILoadingArticulosenfacturaAction
  | ILoadedArticulosenfacturaAction
  | ILoadingArticulosenfacturaFailedAction
  | IAddArticulosenfacturaAction
  | IAddingArticulosenfacturaAction
  | IAddedArticulosenfacturaAction
  | IAddingArticulosenfacturaFailedAction
  | IRemoveArticuloenfacturaAction
  | IRemovingArticuloenfacturaAction
  | IRemovedArticuloenfacturaAction
  | IRemovingArticuloenfacturaFailedAction
  | IEditArticulosenfacturaAction
  | IEditingArticulosenfacturaAction
  | IEditedArticulosenfacturaAction
  | IEditingArticulosenfacturaFailedAction
  | IViewArticulosenfacturaAction
  | IViewingArticulosenfacturaAction
  | IViewedArticulosenfacturaAction
  | IViewingArticulosenfacturaFailedAction
