import Sidebar from '@components/Sidebar/Sidebar'
import baseClasses from '@components/Themes/layout.module.scss'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Typography from '@mui/material/Typography'
import { loadFacturas, searchFacturas } from '@store/actions/facturasActions'
import { IState } from '@store/reducers/index'
import layoutmodulescss from 'dist/css/layout.module.scss'
import React, { FunctionComponent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'

const Dashboard: FunctionComponent = (props: any) => {
  const {
    history: navigation,
    match: { params },
  } = props
  const classes = baseClasses
  const todasLasFacturas = useSelector((state: IState) => state.facturas).facturas
  const facturasData = useSelector((state: IState) => state.facturas)
  const [totalFactura, settotalFactura] = React.useState<any>(0)
  const theme = { ...baseClasses, ...layoutmodulescss }
  const dispatch = useDispatch()
  const [CompraFacturasloadoptions, setCompraFacturasloadoptions] = React.useState<any>({
    page: 1,
    populate: false,
    limit: 5000,
    sort: { field: null, method: 'DESC' },
    totalItems: 0,
    sortLanguage: 'en',
  })
  const performCompraFacturasload = (options) => {
    dispatch(options.searchString ? searchFacturas(options) : loadFacturas(options))
  }
  React.useEffect(() => {
    performCompraFacturasload({
      ...CompraFacturasloadoptions,
    })
  }, [CompraFacturasloadoptions])

  // Theme selection

  let totalFacturado = 0

  React.useEffect(() => {
    if (todasLasFacturas.Length) {
      let temporalFactura = 0

      todasLasFacturas.forEach((factura, index) => {
        tempFactura += factura.total
      })
      settotalFactura(tempFactura)

      console.log(temp.Factura)
    }
  }, [todasLasFacturas])

  return (
    <React.Fragment>
      <div className={theme.pages}>
        <Sidebar open={true}>
          <NavLink exact to="/" key="CnmzAIOI">
            <ListItem button className={classes.itemLink}>
              <ListItemText>Home</ListItemText>
            </ListItem>
          </NavLink>

          <NavLink exact to="/Articulos" key="TWTmBZKZ">
            <ListItem button className={classes.itemLink}>
              <ListItemText>Articulos</ListItemText>
            </ListItem>
          </NavLink>

          <NavLink exact to="/Facturas" key="qileEsCa">
            <ListItem button className={classes.itemLink}>
              <ListItemText>Facturas</ListItemText>
            </ListItem>
          </NavLink>

          <NavLink exact to="/ArticulosEnFactura" key="RgRBWuK7">
            <ListItem button className={classes.itemLink}>
              <ListItemText>ArticulosEnFactura</ListItemText>
            </ListItem>
          </NavLink>
        </Sidebar>
        <div data-title="Main Area" className={theme.mainarea}>
          <div data-title="div - Hello Text" className={classes.bigHello}>
            <Typography variant="h1">{totalFactura}</Typography>

            <Typography variant="body1">MVP SISTEMA DE FACTURACION</Typography>

            {todasLasFacturas.map((unaFactura, index) => {
              return (
                <React.Fragment key={'fpTLt8cb_' + index}>
                  <ListItem>{unaFactura.TotalFacturaSinIva}</ListItem>
                </React.Fragment>
              )
            })}
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Dashboard
