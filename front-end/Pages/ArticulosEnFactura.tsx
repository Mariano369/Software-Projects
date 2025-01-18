import Autocomplete from '@components/Autocomplete'
import Sidebar from '@components/Sidebar/Sidebar'
import baseClasses from '@components/Themes/layout.module.scss'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import Container from '@mui/material/Container'
import IconButton from '@mui/material/IconButton'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import {
  addArticulosenfactura,
  editArticulosenfactura,
  loadArticulosenfactura,
  removeArticuloenfactura,
  searchArticulosenfactura,
} from '@store/actions/articulosenfacturaActions'
import { IArticulosenfacturaItem } from '@store/models'
import { IState } from '@store/reducers/index'
import axios from 'axios'
import layoutmodulescss from 'dist/css/layout.module.scss'
import React, { FunctionComponent } from 'react'
import { NumericFormat } from 'react-number-format'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import AddDialog from '../components/Dialog/Dialog'
import Field from '../components/Table/Field'
import Table from '../components/Table/Table'

const ArticulosEnFactura: FunctionComponent = (props: any) => {
  const {
    history: navigation,
    match: { params },
  } = props
  const classes = baseClasses
  const initialDataArticulosEnFactura = {
    Factura: null,
    ArticuloNombre: '',
    ArticuloCantidad: '',
    ArticuloPrecio: '',
    Descuento: '',
    PrecioTotal: false,
  }
  const [ArticulosEnFacturadata, setArticulosEnFacturadata] = React.useState<any>(initialDataArticulosEnFactura)
  const handleArticulosEnFacturaChange = (name: string) => (event: any) => {
    return new Promise((resolve, reject) => {
      const value = event?.target ? (event.target.files ? event.target.files[0] : event.currentTarget?.value || event.target.value) : event
      if (value !== ArticulosEnFacturadata[name]) {
        setArticulosEnFacturadata((oldValues) => {
          return {
            ...oldValues,
            [name]: value,
          }
        })
      }
      resolve(value)
    })
  }
  const articulosenfacturaData = useSelector((state: IState) => state.articulosenfactura)
  const theme = { ...baseClasses, ...layoutmodulescss }
  const dispatch = useDispatch()
  let searchTimeout = null
  const searchForArticulosEnFactura = (event, field = null) => {
    if (searchTimeout) clearTimeout(searchTimeout)
    searchTimeout = setTimeout(() => {
      settableloadoptions({
        ...tableloadoptions,
        searchString: event.target.value,
        searchField: field,
      })
    }, 500)
  }
  const [searchFieldloadoptions, setsearchFieldloadoptions] = React.useState<any>({
    page: 1,
    populate: true,
    limit: 25,
    sort: { field: null, method: 'DESC' },
    totalItems: 0,
    sortLanguage: 'en',
  })
  const performsearchFieldload = (options) => {
    dispatch(options.searchString ? searchArticulosenfactura(options) : loadArticulosenfactura(options))
  }
  React.useEffect(() => {
    performsearchFieldload({
      ...searchFieldloadoptions,
    })
  }, [searchFieldloadoptions])
  const [dialogArticulosenfacturaAction, setdialogArticulosenfacturaAction] = React.useState<'add' | 'edit' | 'view' | 'delete' | ''>('')
  const LocalAddDialog = AddDialog

  const facturasAutocompleteData = useSelector((state: IState) => state.facturas)
  const [FacturaOptions, setFacturaOptions] = React.useState<{ label: String; value: String }[]>([])
  const typeInSearchFacturaFacturas = (typedIn) => {
    const searchOptions = {
      searchString: typedIn,
      searchField: 'Codigo',
      page: 1,
      limit: 25,
      sortLanguage: 'en',
    }
    axios.get('https://sistemadefacturacion.backend.aptugo.app/api/facturas/search/', { params: searchOptions }).then((result) => {
      setFacturaOptions(
        result.data.docs.map((factura) => {
          return {
            label: factura.Codigo,
            value: factura._id,
          }
        })
      )
    })
  }
  const [FacturaValue, setFacturaValue] = React.useState(null)
  React.useEffect(() => {
    if (!ArticulosEnFacturadata.Factura) return undefined
    const asArray = Array.isArray(ArticulosEnFacturadata.Factura) ? ArticulosEnFacturadata.Factura : [ArticulosEnFacturadata.Factura]
    setFacturaValue(asArray.map((item) => ({ label: item.Codigo, value: item._id })))
  }, [ArticulosEnFacturadata.Factura])
  const ArticuloCantidadTextFieldProps = {
    id: 'filled-multiline-flexible',
    margin: 'dense',
    size: 'medium',
    type: 'number',
    multiline: true,
    maxRows: 4,
    variant: 'standard',
  }
  const ArticuloPrecioTextFieldProps = {
    id: 'filled-multiline-flexible',
    margin: 'dense',
    size: 'medium',
    type: 'number',
    multiline: true,
    maxRows: 4,
    variant: 'standard',
  }
  const DescuentoTextFieldProps = {
    id: 'filled-multiline-flexible',
    margin: 'dense',
    size: 'medium',
    type: 'number',
    multiline: true,
    maxRows: 4,
    variant: 'standard',
  }
  const [tableloadoptions, settableloadoptions] = React.useState<any>({
    page: 1,
    populate: true,
    limit: 25,
    sort: { field: null, method: 'DESC' },
    totalItems: 0,
    sortLanguage: 'en',
  })
  const performtableload = (options) => {
    dispatch(options.searchString ? searchArticulosenfactura(options) : loadArticulosenfactura(options))
  }
  React.useEffect(() => {
    performtableload({
      ...tableloadoptions,
    })
  }, [tableloadoptions])

  // Theme selection

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
        <div data-title="div" className={theme.mainarea}>
          <Container maxWidth="lg">
            <div data-title="Head" className={theme.tableHeading}>
              <Typography variant="h4">ArticuloEnFactura list</Typography>
            </div>

            <Paper>
              <div data-title="Table Area" className={classes.tableResponsive}>
                <div data-title="Table Toolbar" className={theme.tabletoolbar}>
                  <TextField
                    id="searchField-ArticuloEnFactura-"
                    variant="outlined"
                    placeholder="Search ArticuloEnFactura..."
                    margin="dense"
                    size="small"
                    className={theme.extensibleInput}
                    type="text"
                    onChange={searchForArticulosEnFactura}
                  />

                  <LocalAddDialog
                    isOpen={dialogArticulosenfacturaAction !== ''}
                    onOpen={() => setdialogArticulosenfacturaAction('add')}
                    onSave={() => setdialogArticulosenfacturaAction('')}
                    onClose={() => setdialogArticulosenfacturaAction('')}
                    action={dialogArticulosenfacturaAction}
                    addOptions={{ title: 'Add ArticuloEnFactura', text: 'Enter ArticuloEnFactura data', button: 'Add' }}
                    editOptions={{ title: 'Edit ArticuloEnFactura', text: 'Update ArticuloEnFactura data', button: 'Edit' }}
                    viewOptions={{ title: '', text: '' }}
                    removeOptions={{ title: '', text: '', button: '' }}
                    saveDataHandler={(data: IArticulosenfacturaItem) => {
                      if (dialogArticulosenfacturaAction === 'delete') {
                        dispatch(removeArticuloenfactura(data))
                      } else {
                        const cleanData: any = Object.fromEntries(
                          Object.entries(data).filter(([_, v]) => v !== null && v !== '' && (v.length !== 0 || v.length === undefined))
                        )
                        dialogArticulosenfacturaAction === 'add'
                          ? dispatch(addArticulosenfactura(cleanData))
                          : dispatch(editArticulosenfactura(cleanData))
                      }
                    }}
                    color="primary"
                    data={ArticulosEnFacturadata}
                    initialData={initialDataArticulosEnFactura}
                    setData={setArticulosEnFacturadata}
                    allowMultipleSubmit={dialogArticulosenfacturaAction === 'add'}
                    disabledFields={dialogArticulosenfacturaAction === 'view'}
                  >
                    <Autocomplete
                      value={FacturaValue}
                      onType={typeInSearchFacturaFacturas}
                      onChange={(newValue) => {
                        // handleArticulosEnFacturaChange('Factura')(newValue?.length ? newValue.map((item) => ({ id: item.value !== 'new' ? item.value : null, name: item.label }))[0].id : [])
                        handleArticulosEnFacturaChange('Factura')(
                          newValue?.length ? newValue.map((item) => ({ _id: item.value !== 'new' ? item.value : null, Codigo: item.label })) : []
                        )
                      }}
                      loading={facturasAutocompleteData.loadingStatus === 'loading'}
                      options={FacturaOptions}
                      label="Factura"
                      fullWidth
                      variant="standard"
                      margin="dense"
                      size="medium"
                      add={true}
                    />

                    <TextField
                      margin="dense"
                      size="medium"
                      label="ArticuloNombre"
                      type="text"
                      fullWidth
                      className={'field_ArticuloNombre'}
                      variant="standard"
                      value={ArticulosEnFacturadata.ArticuloNombre || ''}
                      onChange={handleArticulosEnFacturaChange('ArticuloNombre')}
                      error={ArticulosEnFacturadata?.errField === 'ArticuloNombre'}
                      helperText={ArticulosEnFacturadata?.errField === 'ArticuloNombre' && ArticulosEnFacturadata.errMessage}
                    />

                    <NumericFormat
                      value={ArticulosEnFacturadata.ArticuloCantidad || 0}
                      label="ArticuloCantidad"
                      fullWidth
                      className={'field_ArticuloCantidad'}
                      decimalSeparator=","
                      customInput={TextField}
                      onValueChange={(values, sourceInfo) => {
                        handleArticulosEnFacturaChange('ArticuloCantidad')(values.floatValue || 0)
                      }}
                      {...ArticuloCantidadTextFieldProps}
                    />

                    <NumericFormat
                      value={ArticulosEnFacturadata.ArticuloPrecio || 0}
                      label="ArticuloPrecio"
                      fullWidth
                      className={'field_ArticuloPrecio'}
                      decimalSeparator=","
                      customInput={TextField}
                      onValueChange={(values, sourceInfo) => {
                        handleArticulosEnFacturaChange('ArticuloPrecio')(values.floatValue || 0)
                      }}
                      {...ArticuloPrecioTextFieldProps}
                    />

                    <NumericFormat
                      value={ArticulosEnFacturadata.Descuento || 0}
                      label="Descuento"
                      fullWidth
                      className={'field_Descuento'}
                      decimalSeparator=","
                      customInput={TextField}
                      onValueChange={(values, sourceInfo) => {
                        handleArticulosEnFacturaChange('Descuento')(values.floatValue || 0)
                      }}
                      {...DescuentoTextFieldProps}
                    />

                    <TextField
                      margin="dense"
                      size="medium"
                      label="PrecioTotal"
                      type="text"
                      fullWidth
                      className={'field_PrecioTotal'}
                      variant="standard"
                      value={ArticulosEnFacturadata.PrecioTotal || ''}
                      onChange={handleArticulosEnFacturaChange('PrecioTotal')}
                      error={articulosenfacturaData?.errField === 'PrecioTotal'}
                      helperText={articulosenfacturaData?.errField === 'PrecioTotal' && articulosenfacturaData.errMessage}
                    />
                  </LocalAddDialog>
                </div>

                <div data-title="Body">
                  <Table
                    tableHead={['Factura', 'ArticuloNombre', 'ArticuloCantidad', 'ArticuloPrecio', 'Descuento', 'PrecioTotal', 'Actions']}
                    tableData={
                      articulosenfacturaData.foundarticulosenfactura.length
                        ? articulosenfacturaData.foundarticulosenfactura
                        : (articulosenfacturaData.articulosenfactura as any)
                    }
                    orderBy={tableloadoptions.sort.field}
                    order={tableloadoptions.sort.method}
                    onRequestSort={(event, property) => {
                      settableloadoptions({
                        ...tableloadoptions,
                        sort: {
                          field: property,
                          method: tableloadoptions.sort.field === property ? (tableloadoptions.sort.method === 'asc' ? 'desc' : 'asc') : 'ASC',
                        },
                      })
                    }}
                  >
                    <Field value={(fieldData: any) => (fieldData.Factura ? fieldData.Factura.Codigo : '')} />

                    <Field value={(fieldData: any) => fieldData.ArticuloNombre} />

                    <NumericFormat value={(fieldData: number) => fieldData.ArticuloCantidad} displayType="text" decimalSeparator="," />

                    <NumericFormat value={(fieldData: number) => fieldData.ArticuloPrecio} displayType="text" decimalSeparator="," />

                    <NumericFormat value={(fieldData: number) => fieldData.Descuento} displayType="text" decimalSeparator="," />

                    <Field value={(fieldData: any) => fieldData.PrecioTotal} />

                    <div className={classes.actionsArea}>
                      <IconButton
                        aria-label="edit"
                        color="primary"
                        onClickCapture={(e: any) => {
                          setArticulosEnFacturadata(e.element)
                          setdialogArticulosenfacturaAction('edit')
                        }}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>

                      <IconButton
                        aria-label="delete"
                        color="primary"
                        onClickCapture={(e: any) => {
                          dispatch(removeArticuloenfactura(e.element))
                        }}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </div>
                  </Table>
                </div>
              </div>
            </Paper>
          </Container>
        </div>
      </div>
    </React.Fragment>
  )
}

export default ArticulosEnFactura
