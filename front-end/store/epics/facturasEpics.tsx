import axios from 'axios'
import { combineEpics, Epic } from 'redux-observable'
import { catchError, filter, map, mergeMap, startWith, switchMap } from 'rxjs/operators'
import {
  addedFacturas,
  addingFacturas,
  addingFacturasFailed,
  editedFacturas,
  editingFacturas,
  editingFacturasFailed,
  FacturasAction,
  FacturasActionTypes,
  foundFacturas,
  loadedFacturas,
  loadingFacturas,
  loadingFacturasFailed,
  removedFactura,
  removingFactura,
  removingFacturaFailed,
  searchingFacturas,
  searchingFacturasFailed,
} from '../actions/facturasActions'
import buildFormData from './buildFormData'

import { from, of } from 'rxjs'
import { isOfType } from 'typesafe-actions'
import { IState } from '../reducers'

const searchFacturasEpic: Epic<FacturasAction, FacturasAction, IState> = (action$, state$) =>
  action$.pipe(
    filter(isOfType(FacturasActionTypes.SEARCH_FACTURAS)),
    mergeMap((action) => {
      if (typeof action.searchOptions === 'string') {
        action.searchOptions = {
          searchString: action.searchOptions,
          page: 1,
          searchField: '_id',
        }
      }
      let url = `https://sistemadefacturacion.backend.aptugo.app/api/facturas/search/`
      return from(axios.get(url, { params: action.searchOptions })).pipe(
        map((response) => foundFacturas(response.data, action.keep)),
        startWith(searchingFacturas()),
        catchError(() => of(searchingFacturasFailed()))
      )
    })
  )

const loadFacturasEpic: Epic<FacturasAction, FacturasAction, IState> = (action$, state$) => {
  let responses = []
  return action$.pipe(
    filter(isOfType(FacturasActionTypes.LOAD_FACTURAS)),
    switchMap((action) => {
      let url = `https://sistemadefacturacion.backend.aptugo.app/api/facturas/`
      return from(axios.get(url, { params: action.loadOptions })).pipe(
        map((response) => loadedFacturas(response.data)),
        startWith(loadingFacturas()),
        catchError(() => of(loadingFacturasFailed()))
      )
    })
  )
}

const addFacturasEpic: Epic<FacturasAction, FacturasAction, IState> = (action$, state$) =>
  action$.pipe(
    filter(isOfType(FacturasActionTypes.ADD_FACTURAS)),

    mergeMap((action) => {
      const data = new FormData()
      buildFormData(data, action.payload)
      const config = {
        headers: {
          'content-type': 'multipart/form-data',
        },
      }

      return from(axios.post(`https://sistemadefacturacion.backend.aptugo.app/api/facturas/`, data, config)).pipe(
        map((response) => addedFacturas(response.data)),
        startWith(addingFacturas()),
        catchError((err) => of(addingFacturasFailed(err.response)))
      )
    })
  )

const removeFacturasEpic: Epic<FacturasAction, FacturasAction, IState> = (action$, state$) =>
  action$.pipe(
    filter(isOfType(FacturasActionTypes.REMOVE_FACTURA)),
    mergeMap((action) =>
      from(axios.delete(`https://sistemadefacturacion.backend.aptugo.app/api/facturas/${action.payload._id}`)).pipe(
        map((response) => removedFactura()),
        startWith(removingFactura()),
        catchError(() => of(removingFacturaFailed()))
      )
    )
  )

const editFacturasEpic: Epic<FacturasAction, FacturasAction, IState> = (action$, state$) =>
  action$.pipe(
    filter(isOfType(FacturasActionTypes.EDIT_FACTURAS)),
    mergeMap((action) => {
      const data = new FormData()
      buildFormData(data, action.payload)
      const config = {
        headers: {
          'content-type': 'multipart/form-data',
        },
      }

      return from(axios.put(`https://sistemadefacturacion.backend.aptugo.app/api/facturas/${action.payload._id}`, data, config)).pipe(
        map((response) => editedFacturas(response.data)),
        startWith(editingFacturas()),
        catchError((err) => of(editingFacturasFailed(err.response)))
      )
    })
  )

export default combineEpics(searchFacturasEpic, loadFacturasEpic, addFacturasEpic, removeFacturasEpic, editFacturasEpic)
