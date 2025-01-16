import React from 'react'
import { Route, Switch } from 'react-router-dom'

const Documentoselectronicos = React.lazy(() => import('./Pages/documentoselectronicos'))
const Testimoniosdigitales = React.lazy(() => import('./Pages/testimoniosdigitales'))
const Certificacionesremotas = React.lazy(() => import('./Pages/certificacionesremotas'))
const Documentosdigitales = React.lazy(() => import('./Pages/documentosdigitales'))
const Firmasolografas = React.lazy(() => import('./Pages/firmasolografas'))
const Firmadigital = React.lazy(() => import('./Pages/firmadigital'))
const Contacto = React.lazy(() => import('./Pages/contacto'))
const Nosotros = React.lazy(() => import('./Pages/nosotros'))
const Landing = React.lazy(() => import('./Pages/landing'))

const App: React.FunctionComponent = (props: any) => {
  const routes = [
    {
      path: '/documentoselectronicos',
      name: 'Documentos electronicos',
      component: Documentoselectronicos,
    },
    {
      path: '/testimoniosdigitales',
      name: 'Testimonios digitales ',
      component: Testimoniosdigitales,
    },
    {
      path: '/certificacionesremotas',
      name: 'Certificaciones remotas',
      component: Certificacionesremotas,
    },
    {
      path: '/documentosdigitales',
      name: 'Documentos digitales',
      component: Documentosdigitales,
    },
    {
      path: '/firmasolografas',
      name: 'Firmas olografas',
      component: Firmasolografas,
    },
    {
      path: '/firmadigital',
      name: 'Firma digital',
      component: Firmadigital,
    },
    {
      path: '/contacto',
      name: 'Contacto',
      component: Contacto,
    },
    {
      path: '/nosotros',
      name: 'Nosotros',
      component: Nosotros,
    },
    {
      path: '/',
      name: 'Landing',
      component: Landing,
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
