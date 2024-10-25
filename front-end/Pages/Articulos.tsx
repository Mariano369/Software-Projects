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
import { addArticulos, editArticulos, loadArticulos, removeArticulo, searchArticulos } from '@store/actions/articulosActions'
import { IArticulosItem } from '@store/models'
import { IState } from '@store/reducers/index'
import layoutmodulescss from 'dist/css/layout.module.scss'
import React, { FunctionComponent } from 'react'
import { NumericFormat } from 'react-number-format'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import AddDialog from '../components/Dialog/Dialog'
import Field from '../components/Table/Field'
import Table from '../components/Table/Table'

const Articulos: FunctionComponent = (props: any) => {
  const {
    history: navigation,
    match: { params },
  } = props
  const classes = baseClasses
  const initialDataArticulos = {
    Nombre: '',
    Cantidad: '',
    Costo: '',
    Precio: '',
    Proveedores: '',
  }
  const [Articulosdata, setArticulosdata] = React.useState<any>(initialDataArticulos)
  const handleArticulosChange = (name: string) => (event: any) => {
    return new Promise((resolve, reject) => {
      const value = event?.target ? (event.target.files ? event.target.files[0] : event.currentTarget?.value || event.target.value) : event
      if (value !== Articulosdata[name]) {
        setArticulosdata((oldValues) => {
          return {
            ...oldValues,
            [name]: value,
          }
        })
      }
      resolve(value)
    })
  }
  const articulosData = useSelector((state: IState) => state.articulos)
  const theme = { ...baseClasses, ...layoutmodulescss }
  const dispatch = useDispatch()
  let searchTimeout = null
  const searchForArticulos = (event, field = null) => {
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
    dispatch(options.searchString ? searchArticulos(options) : loadArticulos(options))
  }
  React.useEffect(() => {
    performsearchFieldload({
      ...searchFieldloadoptions,
    })
  }, [searchFieldloadoptions])
  const [dialogArticulosAction, setdialogArticulosAction] = React.useState<'add' | 'edit' | 'view' | 'delete' | ''>('')
  const LocalAddDialog = AddDialog

  const CantidadTextFieldProps = {
    id: 'filled-multiline-flexible',
    margin: 'dense',
    size: 'medium',
    type: 'number',
    multiline: true,
    maxRows: 4,
    variant: 'standard',
  }
  const CostoTextFieldProps = {
    id: 'filled-multiline-flexible',
    margin: 'dense',
    size: 'medium',
    type: 'number',
    multiline: true,
    maxRows: 4,
    variant: 'standard',
  }
  const PrecioTextFieldProps = {
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
    dispatch(options.searchString ? searchArticulos(options) : loadArticulos(options))
  }
  React.useEffect(() => {
    performtableload({
      ...tableloadoptions,
    })
  }, [tableloadoptions])

  // Theme selection

  let sumatotalinvertido = 0

  const calcularTotalInvertido = () => {
    const losArticulos = articulosData.foundarticulos.length ? articulosData.foundarticulos : (articulosData.articulos as any)
    losArticulos.forEach((articulo) => {
      sumatotalinvertido += articulo.Costo * articulo.Cantidad
    })
  }

  React.useEffect(() => {}, [articulosData.foundarticulos, articulosData.articulos])

  calcularTotalInvertido()

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
              <Typography variant="h4">Articulo list</Typography>
            </div>

            <Paper>
              <div data-title="Table Area" className={classes.tableResponsive}>
                <div data-title="Table Toolbar" className={theme.tabletoolbar}>
                  <TextField
                    id="searchField-Articulo-"
                    variant="outlined"
                    placeholder="Search Articulo..."
                    margin="dense"
                    size="small"
                    className={theme.extensibleInput}
                    type="text"
                    onChange={searchForArticulos}
                  />

                  <LocalAddDialog
                    isOpen={dialogArticulosAction !== ''}
                    onOpen={() => setdialogArticulosAction('add')}
                    onSave={() => setdialogArticulosAction('')}
                    onClose={() => setdialogArticulosAction('')}
                    action={dialogArticulosAction}
                    addOptions={{ title: 'Add Articulo', text: 'Enter Articulo data', button: 'Add' }}
                    editOptions={{ title: 'Edit Articulo', text: 'Update Articulo data', button: 'Edit' }}
                    viewOptions={{ title: '', text: '' }}
                    removeOptions={{ title: '', text: '', button: '' }}
                    saveDataHandler={(data: IArticulosItem) => {
                      if (dialogArticulosAction === 'delete') {
                        dispatch(removeArticulo(data))
                      } else {
                        const cleanData: any = Object.fromEntries(
                          Object.entries(data).filter(([_, v]) => v !== null && v !== '' && (v.length !== 0 || v.length === undefined))
                        )
                        dialogArticulosAction === 'add' ? dispatch(addArticulos(cleanData)) : dispatch(editArticulos(cleanData))
                      }
                    }}
                    color="primary"
                    data={Articulosdata}
                    initialData={initialDataArticulos}
                    setData={setArticulosdata}
                    allowMultipleSubmit={dialogArticulosAction === 'add'}
                    disabledFields={dialogArticulosAction === 'view'}
                  >
                    <TextField
                      margin="dense"
                      size="medium"
                      label="Nombre"
                      type="text"
                      fullWidth
                      className={'field_Nombre'}
                      variant="standard"
                      value={Articulosdata.Nombre || ''}
                      onChange={handleArticulosChange('Nombre')}
                      error={Articulosdata?.errField === 'Nombre'}
                      helperText={Articulosdata?.errField === 'Nombre' && Articulosdata.errMessage}
                    />

                    <NumericFormat
                      value={Articulosdata.Cantidad || 0}
                      label="Cantidad"
                      fullWidth
                      className={'field_Cantidad'}
                      decimalSeparator=","
                      customInput={TextField}
                      onValueChange={(values, sourceInfo) => {
                        handleArticulosChange('Cantidad')(values.floatValue || 0)
                      }}
                      {...CantidadTextFieldProps}
                    />

                    <NumericFormat
                      value={Articulosdata.Costo || 0}
                      label="Costo"
                      fullWidth
                      className={'field_Costo'}
                      decimalSeparator=","
                      customInput={TextField}
                      onValueChange={(values, sourceInfo) => {
                        handleArticulosChange('Costo')(values.floatValue || 0)
                      }}
                      {...CostoTextFieldProps}
                    />

                    <NumericFormat
                      value={Articulosdata.Precio || 0}
                      label="Precio"
                      fullWidth
                      className={'field_Precio'}
                      decimalSeparator=","
                      customInput={TextField}
                      onValueChange={(values, sourceInfo) => {
                        handleArticulosChange('Precio')(values.floatValue || 0)
                      }}
                      {...PrecioTextFieldProps}
                    />

                    <TextField
                      margin="dense"
                      size="medium"
                      label="Proveedores"
                      type="text"
                      fullWidth
                      className={'field_Proveedores'}
                      variant="standard"
                      value={Articulosdata.Proveedores || ''}
                      onChange={handleArticulosChange('Proveedores')}
                      error={Articulosdata?.errField === 'Proveedores'}
                      helperText={Articulosdata?.errField === 'Proveedores' && Articulosdata.errMessage}
                    />
                  </LocalAddDialog>
                </div>

                <div data-title="Body">
                  <Table
                    tableHead={['Nombre', 'Cantidad', 'Costo', 'Precio Venta', 'Proveedores', 'Ganancia', 'Total Invertido', 'Actions']}
                    tableData={articulosData.foundarticulos.length ? articulosData.foundarticulos : (articulosData.articulos as any)}
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
                    <Field value={(fieldData: any) => fieldData.Nombre} />

                    <NumericFormat value={(fieldData: number) => fieldData.Cantidad} displayType="text" decimalSeparator="," />

                    <NumericFormat value={(fieldData: number) => fieldData.Costo} displayType="text" decimalSeparator="," />

                    <NumericFormat value={(fieldData: number) => fieldData.Precio} displayType="text" decimalSeparator="," />

                    <Field value={(fieldData: any) => fieldData.Proveedores} />
                    <Field value={(fieldData: any) => fieldData.Precio - fieldData.Costo} />

                    <Field value={(fieldData: any) => fieldData.Costo * fieldData.Cantidad} />

                    <div className={classes.actionsArea}>
                      <IconButton
                        aria-label="edit"
                        color="primary"
                        onClickCapture={(e: any) => {
                          setArticulosdata(e.element)
                          setdialogArticulosAction('edit')
                        }}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>

                      <IconButton
                        aria-label="delete"
                        color="primary"
                        onClickCapture={(e: any) => {
                          dispatch(removeArticulo(e.element))
                        }}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </div>
                  </Table>

                  <div data-title="div">
                    Suma Total Invertido:
                    {sumatotalinvertido}
                  </div>
                </div>
              </div>
            </Paper>
          </Container>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Articulos
