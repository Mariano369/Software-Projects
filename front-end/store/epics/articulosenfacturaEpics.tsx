import axios from 'axios'
import { combineEpics, Epic } from 'redux-observable'
import { catchError, filter, map, mergeMap, startWith, switchMap } from 'rxjs/operators'
import {
  addedArticulosenfactura,
  addingArticulosenfactura,
  addingArticulosenfacturaFailed,
  ArticulosenfacturaAction,
  ArticulosenfacturaActionTypes,
  editedArticulosenfactura,
  editingArticulosenfactura,
  editingArticulosenfacturaFailed,
  foundArticulosenfactura,
  loadedArticulosenfactura,
  loadingArticulosenfactura,
  loadingArticulosenfacturaFailed,
  removedArticuloenfactura,
  removingArticuloenfactura,
  removingArticuloenfacturaFailed,
  searchingArticulosenfactura,
  searchingArticulosenfacturaFailed,
} from '../actions/articulosenfacturaActions'
import buildFormData from './buildFormData'

import { from, of } from 'rxjs'
import { isOfType } from 'typesafe-actions'
import { IState } from '../reducers'

const searchArticulosenfacturaEpic: Epic<ArticulosenfacturaAction, ArticulosenfacturaAction, IState> = (action$, state$) =>
  action$.pipe(
    filter(isOfType(ArticulosenfacturaActionTypes.SEARCH_ARTICULOSENFACTURA)),
    mergeMap((action) => {
      if (typeof action.searchOptions === 'string') {
        action.searchOptions = {
          searchString: action.searchOptions,
          page: 1,
          searchField: '_id',
        }
      }
      let url = `https://sistemadefacturacion.backend.aptugo.app/api/articulosenfactura/search/`
      return from(axios.get(url, { params: action.searchOptions })).pipe(
        map((response) => foundArticulosenfactura(response.data, action.keep)),
        startWith(searchingArticulosenfactura()),
        catchError(() => of(searchingArticulosenfacturaFailed()))
      )
    })
  )

const loadArticulosenfacturaEpic: Epic<ArticulosenfacturaAction, ArticulosenfacturaAction, IState> = (action$, state$) => {
  let responses = []
  return action$.pipe(
    filter(isOfType(ArticulosenfacturaActionTypes.LOAD_ARTICULOSENFACTURA)),
    switchMap((action) => {
      let url = `https://sistemadefacturacion.backend.aptugo.app/api/articulosenfactura/`
      return from(axios.get(url, { params: action.loadOptions })).pipe(
        map((response) => loadedArticulosenfactura(response.data)),
        startWith(loadingArticulosenfactura()),
        catchError(() => of(loadingArticulosenfacturaFailed()))
      )
    })
  )
}

const addArticulosenfacturaEpic: Epic<ArticulosenfacturaAction, ArticulosenfacturaAction, IState> = (action$, state$) =>
  action$.pipe(
    filter(isOfType(ArticulosenfacturaActionTypes.ADD_ARTICULOSENFACTURA)),

    mergeMap((action) => {
      const data = new FormData()
      buildFormData(data, action.payload)
      const config = {
        headers: {
          'content-type': 'multipart/form-data',
        },
      }

      return from(axios.post(`https://sistemadefacturacion.backend.aptugo.app/api/articulosenfactura/`, data, config)).pipe(
        map((response) => addedArticulosenfactura(response.data)),
        startWith(addingArticulosenfactura()),
        catchError((err) => of(addingArticulosenfacturaFailed(err.response)))
      )
    })
  )

const removeArticulosenfacturaEpic: Epic<ArticulosenfacturaAction, ArticulosenfacturaAction, IState> = (action$, state$) =>
  action$.pipe(
    filter(isOfType(ArticulosenfacturaActionTypes.REMOVE_ARTICULOENFACTURA)),
    mergeMap((action) =>
      from(axios.delete(`https://sistemadefacturacion.backend.aptugo.app/api/articulosenfactura/${action.payload._id}`)).pipe(
        map((response) => removedArticuloenfactura()),
        startWith(removingArticuloenfactura()),
        catchError(() => of(removingArticuloenfacturaFailed()))
      )
    )
  )

const editArticulosenfacturaEpic: Epic<ArticulosenfacturaAction, ArticulosenfacturaAction, IState> = (action$, state$) =>
  action$.pipe(
    filter(isOfType(ArticulosenfacturaActionTypes.EDIT_ARTICULOSENFACTURA)),
    mergeMap((action) => {
      const data = new FormData()
      buildFormData(data, action.payload)
      const config = {
        headers: {
          'content-type': 'multipart/form-data',
        },
      }

      return from(axios.put(`https://sistemadefacturacion.backend.aptugo.app/api/articulosenfactura/${action.payload._id}`, data, config)).pipe(
        map((response) => editedArticulosenfactura(response.data)),
        startWith(editingArticulosenfactura()),
        catchError((err) => of(editingArticulosenfacturaFailed(err.response)))
      )
    })
  )

export default combineEpics(
  searchArticulosenfacturaEpic,
  loadArticulosenfacturaEpic,
  addArticulosenfacturaEpic,
  removeArticulosenfacturaEpic,
  editArticulosenfacturaEpic
)
