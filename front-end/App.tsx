import React from 'react'
import { Route, Switch } from 'react-router-dom'

const ArticulosEnFactura = React.lazy(() => import('./Pages/ArticulosEnFactura'))
const Facturas = React.lazy(() => import('./Pages/Facturas'))
const Articulos = React.lazy(() => import('./Pages/Articulos'))
const Dashboard = React.lazy(() => import('./Pages/dashboard'))

const App: React.FunctionComponent = (props: any) => {
  const routes = [
    {
      path: '/ArticulosEnFactura',
      name: 'ArticulosEnFactura',
      component: ArticulosEnFactura,
    },
    {
      path: '/Facturas',
      name: 'Facturas',
      component: Facturas,
    },
    {
      path: '/Articulos',
      name: 'Articulos',
      component: Articulos,
    },
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard,
    },
  ]

  const switchRoutes = (
    <Switch>
      {routes.map((prop, key) => {
        return <Route exact path={prop.path} component={prop.component} key={key} />
      })}
    </Switch>
  )

  return (
    <React.Fragment>
      <React.Suspense fallback={<span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>Loading</span>}>
        <React.Fragment>{switchRoutes}</React.Fragment>
      </React.Suspense>
    </React.Fragment>
  )
}

export default App
