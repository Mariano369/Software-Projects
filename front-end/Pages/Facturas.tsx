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
import { addFacturas, editFacturas, loadFacturas, removeFactura, searchFacturas } from '@store/actions/facturasActions'
import { IFacturasItem } from '@store/models'
import { IState } from '@store/reducers/index'
import layoutmodulescss from 'dist/css/layout.module.scss'
import React, { FunctionComponent } from 'react'
import { NumericFormat } from 'react-number-format'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import AddDialog from '../components/Dialog/Dialog'
import Field from '../components/Table/Field'
import Table from '../components/Table/Table'

const Facturas: FunctionComponent = (props: any) => {
  const {
    history: navigation,
    match: { params },
  } = props
  const classes = baseClasses
  const initialDataFacturas = {
    Codigo: '',
    Cliente: '',
    TotalFacturaSinIva: '',
    Iva: '',
    Total: '',
  }
  const [Facturasdata, setFacturasdata] = React.useState<any>(initialDataFacturas)
  const handleFacturasChange = (name: string) => (event: any) => {
    return new Promise((resolve, reject) => {
      const value = event?.target ? (event.target.files ? event.target.files[0] : event.currentTarget?.value || event.target.value) : event
      if (value !== Facturasdata[name]) {
        setFacturasdata((oldValues) => {
          return {
            ...oldValues,
            [name]: value,
          }
        })
      }
      resolve(value)
    })
  }
  const facturasData = useSelector((state: IState) => state.facturas)
  const theme = { ...baseClasses, ...layoutmodulescss }
  const dispatch = useDispatch()
  let searchTimeout = null
  const searchForFacturas = (event, field = null) => {
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
    dispatch(options.searchString ? searchFacturas(options) : loadFacturas(options))
  }
  React.useEffect(() => {
    performsearchFieldload({
      ...searchFieldloadoptions,
    })
  }, [searchFieldloadoptions])
  const [dialogFacturasAction, setdialogFacturasAction] = React.useState<'add' | 'edit' | 'view' | 'delete' | ''>('')
  const LocalAddDialog = AddDialog

  const TotalFacturaSinIvaTextFieldProps = {
    id: 'filled-multiline-flexible',
    margin: 'dense',
    size: 'medium',
    type: 'number',
    multiline: true,
    maxRows: 4,
    variant: 'standard',
  }
  const IvaTextFieldProps = {
    id: 'filled-multiline-flexible',
    margin: 'dense',
    size: 'medium',
    type: 'number',
    multiline: true,
    maxRows: 4,
    variant: 'standard',
  }
  const TotalTextFieldProps = {
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
    dispatch(options.searchString ? searchFacturas(options) : loadFacturas(options))
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
              <Typography variant="h4">Factura list</Typography>
            </div>

            <Paper>
              <div data-title="Table Area" className={classes.tableResponsive}>
                <div data-title="Table Toolbar" className={theme.tabletoolbar}>
                  <TextField
                    id="searchField-Factura-"
                    variant="outlined"
                    placeholder="Search Factura..."
                    margin="dense"
                    size="small"
                    className={theme.extensibleInput}
                    type="text"
                    onChange={searchForFacturas}
                  />

                  <LocalAddDialog
                    isOpen={dialogFacturasAction !== ''}
                    onOpen={() => setdialogFacturasAction('add')}
                    onSave={() => setdialogFacturasAction('')}
                    onClose={() => setdialogFacturasAction('')}
                    action={dialogFacturasAction}
                    addOptions={{ title: 'Add Factura', text: 'Enter Factura data', button: 'Add' }}
                    editOptions={{ title: 'Edit Factura', text: 'Update Factura data', button: 'Edit' }}
                    viewOptions={{ title: '', text: '' }}
                    removeOptions={{ title: '', text: '', button: '' }}
                    saveDataHandler={(data: IFacturasItem) => {
                      if (dialogFacturasAction === 'delete') {
                        dispatch(removeFactura(data))
                      } else {
                        const cleanData: any = Object.fromEntries(
                          Object.entries(data).filter(([_, v]) => v !== null && v !== '' && (v.length !== 0 || v.length === undefined))
                        )
                        dialogFacturasAction === 'add' ? dispatch(addFacturas(cleanData)) : dispatch(editFacturas(cleanData))
                      }
                    }}
                    color="primary"
                    data={Facturasdata}
                    initialData={initialDataFacturas}
                    setData={setFacturasdata}
                    allowMultipleSubmit={dialogFacturasAction === 'add'}
                    disabledFields={dialogFacturasAction === 'view'}
                  >
                    <TextField
                      margin="dense"
                      size="medium"
                      label="Codigo"
                      type="text"
                      fullWidth
                      className={'field_Codigo'}
                      variant="standard"
                      value={Facturasdata.Codigo || ''}
                      onChange={handleFacturasChange('Codigo')}
                      error={Facturasdata?.errField === 'Codigo'}
                      helperText={Facturasdata?.errField === 'Codigo' && Facturasdata.errMessage}
                    />

                    <TextField
                      margin="dense"
                      size="medium"
                      label="Cliente"
                      type="text"
                      fullWidth
                      className={'field_Cliente'}
                      variant="standard"
                      value={Facturasdata.Cliente || ''}
                      onChange={handleFacturasChange('Cliente')}
                      error={Facturasdata?.errField === 'Cliente'}
                      helperText={Facturasdata?.errField === 'Cliente' && Facturasdata.errMessage}
                    />

                    <NumericFormat
                      value={Facturasdata.TotalFacturaSinIva || 0}
                      label="TotalFacturaSinIva"
                      fullWidth
                      className={'field_TotalFacturaSinIva'}
                      decimalSeparator=","
                      customInput={TextField}
                      onValueChange={(values, sourceInfo) => {
                        handleFacturasChange('TotalFacturaSinIva')(values.floatValue || 0)
                      }}
                      {...TotalFacturaSinIvaTextFieldProps}
                    />

                    <NumericFormat
                      value={Facturasdata.Iva || 0}
                      label="Iva"
                      fullWidth
                      className={'field_Iva'}
                      decimalSeparator=","
                      customInput={TextField}
                      onValueChange={(values, sourceInfo) => {
                        handleFacturasChange('Iva')(values.floatValue || 0)
                      }}
                      {...IvaTextFieldProps}
                    />

                    <NumericFormat
                      value={Facturasdata.Total || 0}
                      label="Total"
                      fullWidth
                      className={'field_Total'}
                      decimalSeparator=","
                      customInput={TextField}
                      onValueChange={(values, sourceInfo) => {
                        handleFacturasChange('Total')(values.floatValue || 0)
                      }}
                      {...TotalTextFieldProps}
                    />
                  </LocalAddDialog>
                </div>

                <div data-title="Body">
                  <Table
                    tableHead={['Codigo', 'Cliente', 'TotalFacturaSinIva', 'Iva', 'Total', 'Actions']}
                    tableData={facturasData.foundfacturas.length ? facturasData.foundfacturas : (facturasData.facturas as any)}
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
                    <Field value={(fieldData: any) => fieldData.Codigo} />

                    <Field value={(fieldData: any) => fieldData.Cliente} />

                    <NumericFormat value={(fieldData: number) => fieldData.TotalFacturaSinIva} displayType="text" decimalSeparator="," />

                    <NumericFormat value={(fieldData: number) => fieldData.Iva} displayType="text" decimalSeparator="," />

                    <NumericFormat value={(fieldData: number) => fieldData.Total} displayType="text" decimalSeparator="," />

                    <div className={classes.actionsArea}>
                      <IconButton
                        aria-label="edit"
                        color="primary"
                        onClickCapture={(e: any) => {
                          setFacturasdata(e.element)
                          setdialogFacturasAction('edit')
                        }}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>

                      <IconButton
                        aria-label="delete"
                        color="primary"
                        onClickCapture={(e: any) => {
                          dispatch(removeFactura(e.element))
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

export default Facturas
