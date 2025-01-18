import { combineReducers } from 'redux'

import articulosenfacturaReducer, { IArticulosenfacturaState, initialArticulosenfacturaState } from './articulosenfacturaReducer'
import articulosReducer, { IArticulosState, initialArticulosState } from './articulosReducer'
import facturasReducer, { IFacturasState, initialFacturasState } from './facturasReducer'

export interface IState {
  facturas: IFacturasState
  articulosenfactura: IArticulosenfacturaState
  articulos: IArticulosState
}

export const initialState: IState = {
  facturas: initialFacturasState,
  articulosenfactura: initialArticulosenfacturaState,
  articulos: initialArticulosState,
}

export default combineReducers({
  facturas: facturasReducer,
  articulosenfactura: articulosenfacturaReducer,
  articulos: articulosReducer,
})
