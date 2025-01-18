import axios from 'axios'
import { combineEpics, Epic } from 'redux-observable'
import { catchError, filter, map, mergeMap, startWith, switchMap } from 'rxjs/operators'
import {
  addedArticulos,
  addingArticulos,
  addingArticulosFailed,
  ArticulosAction,
  ArticulosActionTypes,
  editedArticulos,
  editingArticulos,
  editingArticulosFailed,
  foundArticulos,
  loadedArticulos,
  loadingArticulos,
  loadingArticulosFailed,
  removedArticulo,
  removingArticulo,
  removingArticuloFailed,
  searchingArticulos,
  searchingArticulosFailed,
} from '../actions/articulosActions'
import buildFormData from './buildFormData'

import { from, of } from 'rxjs'
import { isOfType } from 'typesafe-actions'
import { IState } from '../reducers'

const searchArticulosEpic: Epic<ArticulosAction, ArticulosAction, IState> = (action$, state$) =>
  action$.pipe(
    filter(isOfType(ArticulosActionTypes.SEARCH_ARTICULOS)),
    mergeMap((action) => {
      if (typeof action.searchOptions === 'string') {
        action.searchOptions = {
          searchString: action.searchOptions,
          page: 1,
          searchField: '_id',
        }
      }
      let url = `https://sistemadefacturacion.backend.aptugo.app/api/articulos/search/`
      return from(axios.get(url, { params: action.searchOptions })).pipe(
        map((response) => foundArticulos(response.data, action.keep)),
        startWith(searchingArticulos()),
        catchError(() => of(searchingArticulosFailed()))
      )
    })
  )

const loadArticulosEpic: Epic<ArticulosAction, ArticulosAction, IState> = (action$, state$) => {
  let responses = []
  return action$.pipe(
    filter(isOfType(ArticulosActionTypes.LOAD_ARTICULOS)),
    switchMap((action) => {
      let url = `https://sistemadefacturacion.backend.aptugo.app/api/articulos/`
      return from(axios.get(url, { params: action.loadOptions })).pipe(
        map((response) => loadedArticulos(response.data)),
        startWith(loadingArticulos()),
        catchError(() => of(loadingArticulosFailed()))
      )
    })
  )
}

const addArticulosEpic: Epic<ArticulosAction, ArticulosAction, IState> = (action$, state$) =>
  action$.pipe(
    filter(isOfType(ArticulosActionTypes.ADD_ARTICULOS)),

    mergeMap((action) => {
      const data = new FormData()
      buildFormData(data, action.payload)
      const config = {
        headers: {
          'content-type': 'multipart/form-data',
        },
      }

      return from(axios.post(`https://sistemadefacturacion.backend.aptugo.app/api/articulos/`, data, config)).pipe(
        map((response) => addedArticulos(response.data)),
        startWith(addingArticulos()),
        catchError((err) => of(addingArticulosFailed(err.response)))
      )
    })
  )

const removeArticulosEpic: Epic<ArticulosAction, ArticulosAction, IState> = (action$, state$) =>
  action$.pipe(
    filter(isOfType(ArticulosActionTypes.REMOVE_ARTICULO)),
    mergeMap((action) =>
      from(axios.delete(`https://sistemadefacturacion.backend.aptugo.app/api/articulos/${action.payload._id}`)).pipe(
        map((response) => removedArticulo()),
        startWith(removingArticulo()),
        catchError(() => of(removingArticuloFailed()))
      )
    )
  )

const editArticulosEpic: Epic<ArticulosAction, ArticulosAction, IState> = (action$, state$) =>
  action$.pipe(
    filter(isOfType(ArticulosActionTypes.EDIT_ARTICULOS)),
    mergeMap((action) => {
      const data = new FormData()
      buildFormData(data, action.payload)
      const config = {
        headers: {
          'content-type': 'multipart/form-data',
        },
      }

      return from(axios.put(`https://sistemadefacturacion.backend.aptugo.app/api/articulos/${action.payload._id}`, data, config)).pipe(
        map((response) => editedArticulos(response.data)),
        startWith(editingArticulos()),
        catchError((err) => of(editingArticulosFailed(err.response)))
      )
    })
  )

export default combineEpics(searchArticulosEpic, loadArticulosEpic, addArticulosEpic, removeArticulosEpic, editArticulosEpic)
