import { Action } from 'redux'
import { combineEpics, createEpicMiddleware } from 'redux-observable'
import { IState } from '../reducers'
import articulosenfacturaEpics from './articulosenfacturaEpics'
import articulosEpics from './articulosEpics'
import facturasEpics from './facturasEpics'

export const rootEpic = combineEpics(facturasEpics, articulosenfacturaEpics, articulosEpics)

export default createEpicMiddleware<Action, Action, IState>()
