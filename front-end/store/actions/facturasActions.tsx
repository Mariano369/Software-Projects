import { IFacturasItem, IpaginatedFacturas } from '../models'

export enum FacturasActionTypes {
  SEARCH_FACTURAS = 'facturas/search',
  SEARCHING_FACTURAS = 'facturas/searching',
  FOUND_FACTURAS = 'facturas/found',
  SEARCHING_FACTURAS_FAILED = 'facturas/searching_failed',

  LOAD_FACTURAS = 'facturas/load',
  LOADING_FACTURAS = 'facturas/loading',
  LOADED_FACTURAS = 'facturas/loaded',
  LOADING_FACTURAS_FAILED = 'facturas/loading_failed',

  ADD_FACTURAS = 'facturas/add',
  ADDING_FACTURAS = 'facturas/adding',
  ADDED_FACTURAS = 'facturas/added',
  ADDING_FACTURAS_FAILED = 'facturas/adding_failed',

  REMOVE_FACTURA = 'facturas/remove',
  REMOVING_FACTURA = 'facturas/removing',
  REMOVED_FACTURA = 'facturas/removed',
  REMOVING_FACTURA_FAILED = 'facturas/removing_failed',

  EDIT_FACTURAS = 'facturas/edit',
  EDITING_FACTURAS = 'facturas/editing',
  EDITED_FACTURAS = 'facturas/edited',
  EDITING_FACTURAS_FAILED = 'facturas/editing_failed',

  VIEW_FACTURAS = 'facturas/view',
  VIEWING_FACTURAS = 'facturas/viewing',
  VIEWED_FACTURAS = 'facturas/viewed',
  VIEWING_FACTURAS_FAILED = 'facturas/viewing_failed',
}

export function searchFacturas(searchOptions: TSearchOptions | string, keep?: boolean): ISearchFacturasAction {
  return {
    type: FacturasActionTypes.SEARCH_FACTURAS,
    searchOptions: typeof searchOptions === 'string' ? { searchString: searchOptions } : searchOptions,
    keep: keep,
  }
}

export function searchingFacturas(): ISearchingFacturasAction {
  return {
    type: FacturasActionTypes.SEARCHING_FACTURAS,
  }
}

export function foundFacturas(facturas: IpaginatedFacturas, keep?: boolean): IFoundFacturasAction {
  return {
    type: FacturasActionTypes.FOUND_FACTURAS,
    keep: keep,
    payload: {
      facturas,
    },
  }
}

export function searchingFacturasFailed(): ISearchingFacturasFailedAction {
  return {
    type: FacturasActionTypes.SEARCHING_FACTURAS_FAILED,
  }
}

export function loadFacturas(loadOptions: TSearchOptions): ILoadFacturasAction {
  return {
    type: FacturasActionTypes.LOAD_FACTURAS,
    loadOptions: loadOptions,
  }
}

export function loadingFacturas(): ILoadingFacturasAction {
  return {
    type: FacturasActionTypes.LOADING_FACTURAS,
  }
}

export function loadedFacturas(facturas: IpaginatedFacturas): ILoadedFacturasAction {
  return {
    type: FacturasActionTypes.LOADED_FACTURAS,
    payload: {
      facturas,
    },
  }
}

export function loadingFacturasFailed(): ILoadingFacturasFailedAction {
  return {
    type: FacturasActionTypes.LOADING_FACTURAS_FAILED,
  }
}

export function addFacturas(factura: IFacturasItem): IAddFacturasAction {
  return {
    type: FacturasActionTypes.ADD_FACTURAS,
    payload: factura,
  }
}

export function addingFacturas(): IAddingFacturasAction {
  return {
    type: FacturasActionTypes.ADDING_FACTURAS,
  }
}

export function addedFacturas(facturas: IpaginatedFacturas): IAddedFacturasAction {
  return {
    type: FacturasActionTypes.ADDED_FACTURAS,
    payload: {
      facturas,
    },
  }
}

export function addingFacturasFailed(errData: { data: { message: string; field?: string }; status: number }): IAddingFacturasFailedAction {
  return {
    type: FacturasActionTypes.ADDING_FACTURAS_FAILED,
    message: errData.data.message,
    status: errData.status,
    field: errData.data.field,
  }
}

export function removeFactura(factura: IFacturasItem): IRemoveFacturaAction {
  return {
    type: FacturasActionTypes.REMOVE_FACTURA,
    payload: factura,
  }
}

export function removingFactura(): IRemovingFacturaAction {
  return {
    type: FacturasActionTypes.REMOVING_FACTURA,
  }
}

export function removedFactura(): IRemovedFacturaAction {
  return {
    type: FacturasActionTypes.REMOVED_FACTURA,
  }
}

export function removingFacturaFailed(): IRemovingFacturaFailedAction {
  return {
    type: FacturasActionTypes.REMOVING_FACTURA_FAILED,
  }
}

export function editFacturas(factura: IFacturasItem): IEditFacturasAction {
  return {
    type: FacturasActionTypes.EDIT_FACTURAS,
    payload: factura,
  }
}

export function editingFacturas(): IEditingFacturasAction {
  return {
    type: FacturasActionTypes.EDITING_FACTURAS,
  }
}

export function editedFacturas(facturas: IFacturasItem): IEditedFacturasAction {
  return {
    type: FacturasActionTypes.EDITED_FACTURAS,
    payload: facturas,
  }
}

export function editingFacturasFailed(errData: { data: { message: string; field?: string }; status: number }): IEditingFacturasFailedAction {
  return {
    type: FacturasActionTypes.EDITING_FACTURAS_FAILED,
    message: errData.data.message,
    status: errData.status,
    field: errData.data.field,
  }
}
export function viewFacturas(factura: IFacturasItem): IViewFacturasAction {
  return {
    type: FacturasActionTypes.VIEW_FACTURAS,
    payload: factura,
  }
}

export function viewingFacturas(): IViewingFacturasAction {
  return {
    type: FacturasActionTypes.VIEWING_FACTURAS,
  }
}

export function viewedFacturas(facturas: IFacturasItem): IViewedFacturasAction {
  return {
    type: FacturasActionTypes.VIEWED_FACTURAS,
    payload: facturas,
  }
}

export function viewingFacturasFailed(): IViewingFacturasFailedAction {
  return {
    type: FacturasActionTypes.VIEWING_FACTURAS_FAILED,
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

export interface ISearchFacturasAction {
  type: FacturasActionTypes.SEARCH_FACTURAS
  searchOptions: TSearchOptions
  keep?: boolean
}

export interface ISearchingFacturasAction {
  type: FacturasActionTypes.SEARCHING_FACTURAS
}

export interface IFoundFacturasAction {
  type: FacturasActionTypes.FOUND_FACTURAS
  keep?: boolean
  payload: {
    facturas: IpaginatedFacturas
  }
}

export interface ISearchingFacturasFailedAction {
  type: FacturasActionTypes.SEARCHING_FACTURAS_FAILED
}

export interface ILoadFacturasAction {
  type: FacturasActionTypes.LOAD_FACTURAS
  loadOptions: TSearchOptions
}

export interface ILoadingFacturasAction {
  type: FacturasActionTypes.LOADING_FACTURAS
}

export interface ILoadedFacturasAction {
  type: FacturasActionTypes.LOADED_FACTURAS
  payload: {
    facturas: IpaginatedFacturas
  }
}

export interface ILoadingFacturasFailedAction {
  type: FacturasActionTypes.LOADING_FACTURAS_FAILED
}

export interface IAddFacturasAction {
  type: FacturasActionTypes.ADD_FACTURAS
  payload: IFacturasItem
}

export interface IAddingFacturasAction {
  type: FacturasActionTypes.ADDING_FACTURAS
}

export interface IAddedFacturasAction {
  type: FacturasActionTypes.ADDED_FACTURAS
  payload: {
    facturas: IpaginatedFacturas
  }
}

export interface IAddingFacturasFailedAction {
  type: FacturasActionTypes.ADDING_FACTURAS_FAILED
  message: string
  status: number
  field?: string
}

export interface IRemoveFacturaAction {
  type: FacturasActionTypes.REMOVE_FACTURA
  payload: IFacturasItem
}

export interface IRemovingFacturaAction {
  type: FacturasActionTypes.REMOVING_FACTURA
}

export interface IRemovedFacturaAction {
  type: FacturasActionTypes.REMOVED_FACTURA
}

export interface IRemovingFacturaFailedAction {
  type: FacturasActionTypes.REMOVING_FACTURA_FAILED
}

export interface IEditFacturasAction {
  type: FacturasActionTypes.EDIT_FACTURAS
  payload: IFacturasItem
}

export interface IEditingFacturasAction {
  type: FacturasActionTypes.EDITING_FACTURAS
}

export interface IEditedFacturasAction {
  type: FacturasActionTypes.EDITED_FACTURAS
  payload: IFacturasItem
}

export interface IEditingFacturasFailedAction {
  type: FacturasActionTypes.EDITING_FACTURAS_FAILED
  message: string
  status: number
  field?: string
}

export interface IViewFacturasAction {
  type: FacturasActionTypes.VIEW_FACTURAS
  payload: IFacturasItem
}

export interface IViewingFacturasAction {
  type: FacturasActionTypes.VIEWING_FACTURAS
}

export interface IViewedFacturasAction {
  type: FacturasActionTypes.VIEWED_FACTURAS
  payload: IFacturasItem
}

export interface IViewingFacturasFailedAction {
  type: FacturasActionTypes.VIEWING_FACTURAS_FAILED
}

export type FacturasAction =
  | ISearchFacturasAction
  | ISearchingFacturasAction
  | IFoundFacturasAction
  | ISearchingFacturasFailedAction
  | ILoadFacturasAction
  | ILoadingFacturasAction
  | ILoadedFacturasAction
  | ILoadingFacturasFailedAction
  | IAddFacturasAction
  | IAddingFacturasAction
  | IAddedFacturasAction
  | IAddingFacturasFailedAction
  | IRemoveFacturaAction
  | IRemovingFacturaAction
  | IRemovedFacturaAction
  | IRemovingFacturaFailedAction
  | IEditFacturasAction
  | IEditingFacturasAction
  | IEditedFacturasAction
  | IEditingFacturasFailedAction
  | IViewFacturasAction
  | IViewingFacturasAction
  | IViewedFacturasAction
  | IViewingFacturasFailedAction
