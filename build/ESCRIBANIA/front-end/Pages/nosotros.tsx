import baseClasses from '@components/Themes/layout.module.scss'
import { Call, Email, Home, LocationOn, Schedule, WhatsApp } from '@mui/icons-material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import { mergeClasses } from '@services/utils'
import stylesmodulescss from 'dist/css/styles.module.scss'
import React, { FunctionComponent } from 'react'
import { NavLink } from 'react-router-dom'

const localStyles = {
  mainPanel: { ['@media (min-width:960px)']: { backgroundColor: '#56baec', width: '100%', flexGrow: 1 } },
  loginHolder: { margin: '5rem auto 0', width: '30vw', textAlign: 'center' },
  loginArea: {
    position: 'relative',
    background: 'white',
    padding: '4rem 3rem 2rem',
    borderRadius: '0.5rem',
    marginBottom: '1rem',
    boxSizing: 'border-box',
    boxShadow: '0px 3px 20px 5px #00000030',
  },
  loginTitle: { textTransform: 'uppercase', fontSize: '1.2rem', letterSpacing: '0.1rem', color: '#3084af' },
  image: {
    width: '5rem',
    position: 'absolute',
    top: '-2.5rem',
    left: 'calc(15vw - (2.5rem + 2.5px))',
    border: '5px solid white',
    borderRadius: '5rem',
  },
}
const Nosotros: FunctionComponent = (props: any) => {
  const {
    history: navigation,
    match: { params },
  } = props
  const classes = mergeClasses(baseClasses, localStyles)
  const theme = { ...baseClasses, ...stylesmodulescss }

  // Theme selection

  const Principal = () => {
    const headerElement = document.getElementById('principal')
    if (headerElement) {
      headerElement.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const Final = () => {
    const footerElement = document.getElementById('final')
    if (footerElement) {
      footerElement.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <React.Fragment>
      <div className={theme.pages}>
        <Container className={theme.topBarContainerSuperior} maxWidth="lg">
          <div data-title="Div Top Bar Superior" className={theme.topBarDivSuperior}>
            <div data-title="div" className={theme.divSaltoPagina}>
              <NavLink
                to="#principal"
                onClickCapture={(e) => {
                  Principal()
                }}
              >
                <Typography variant="subtitle2">Saltar al contenido principal</Typography>
              </NavLink>

              <NavLink
                to="#final"
                onClickCapture={(e) => {
                  Final()
                }}
              >
                <Typography variant="subtitle2">Saltar al pie de página</Typography>
              </NavLink>
            </div>

            <div data-title=" Div Material Ui" className={theme.divIconMaterialUi}>
              <a
                target="_blank"
                href="https://www.google.com.ar/maps/dir//-31.9331523,-65.1655785/@-31.9317866,-65.1788607,15z/data=!4m2!4m1!3e0!5m1!1e4?entry=ttu&g_ep=EgoyMDI0MTIxMS4wIKXMDSoASAFQAw%3D%3D"
              >
                <LocationOn color="primary" className={theme.materialIconEncontranos} sx={{}} />
              </a>
            </div>

            <div data-title="div" className={theme.divButtonComoLlegar}>
              <a
                target="_blank"
                href="https://www.google.com.ar/maps/dir//-31.9331523,-65.1655785/@-31.9317866,-65.1788607,15z/data=!4m2!4m1!3e0!5m1!1e4?entry=ttu&g_ep=EgoyMDI0MTIxMS4wIKXMDSoASAFQAw%3D%3D"
              >
                <Button variant="text" color="primary" className={theme.buttonEncontranos}>
                  Localizar oficina
                </Button>
              </a>
            </div>
          </div>
        </Container>

        <Container className={theme.topBarContainerInferior}>
          <div data-title="Div Favicon Principal" className={theme.newFavicon}>
            <NavLink to="/">
              <picture className={theme.faviconPrincipal}>
                <img src="/img/logolorem.png" alt="/img/logolorem.png" width="60" height="auto" />
              </picture>
            </NavLink>
          </div>

          <div data-title="Div Links" className={theme.divLinks}>
            <div data-title="div" className={theme.divMaterialUiHome}>
              <NavLink to="/">
                <Home
                  color="primary"
                  className={theme.materialIconHome}
                  sx={{
                    fontSize: 20,
                  }}
                />
              </NavLink>
            </div>

            <a target="_blank" href="/Nosotros">
              <Typography variant="h6">Nosotros</Typography>
            </a>

            <Accordion
              sx={{
                backgroundColor: '#003466;',
              }}
              className={theme.accordionUno}
            >
              <AccordionSummary sx={{}} expandIcon={<ExpandMoreIcon sx={{}} />}>
                <Typography variant="h5">Servicios</Typography>
              </AccordionSummary>

              <AccordionDetails
                sx={{
                  backgroundColor: '#003466;',
                }}
              >
                <div data-title="div" className={theme.containerAccordion}>
                  <div data-title="div" className={theme.accordionDetails}>
                    <Typography variant="h5">ACTAS</Typography>

                    <Typography variant="h6">Constataciones</Typography>

                    <Typography variant="h6">Contratos</Typography>

                    <Typography variant="h6">Notificaciones</Typography>

                    <Typography variant="h6">Despidos</Typography>

                    <Typography variant="h6">Acuerdos</Typography>

                    <Typography variant="h6">Consignación Extrajudicial</Typography>

                    <Typography variant="h6">Poderes</Typography>

                    <Typography variant="h6">Continuidad de la Explotación Económica</Typography>

                    <Typography variant="h5">AUTORIZACIONES</Typography>

                    <Typography variant="h6">Viajar</Typography>

                    <Typography variant="h6">Conducir</Typography>

                    <Typography variant="h5">APOSTILLADOS</Typography>
                  </div>

                  <div data-title="div" className={theme.accordionDetails}>
                    <Typography variant="h5">CONTRATOS</Typography>

                    <Typography variant="h6">Boletos</Typography>

                    <Typography variant="h6">Compraventa Inmuebles</Typography>

                    <Typography variant="h6">Compraventa Muebles - Semovientes</Typography>

                    <Typography variant="h6">Compraventa Automotor / Moto</Typography>

                    <Typography variant="h6">Fideicomiso</Typography>

                    <Typography variant="h6">Acuerdos Privados</Typography>

                    <Typography variant="h6">Cesiones de Cheque</Typography>

                    <Typography variant="h6">Cesiones de Facturas</Typography>

                    <Typography variant="h6">Comodato</Typography>

                    <Typography variant="h6">Contratos Locación</Typography>

                    <Typography variant="h6">Guarda</Typography>

                    <Typography variant="h6">Leasing</Typography>

                    <Typography variant="h6">Mandato</Typography>

                    <Typography variant="h6">Manifestación de Bienes</Typography>

                    <Typography variant="h6">Mutuo</Typography>

                    <Typography variant="h6">Pactos de Retroventa</Typography>
                  </div>

                  <div data-title="div" className={theme.accordionDetails}>
                    <Typography variant="h5">CERTIFICACIONES</Typography>

                    <Typography variant="h6">Firmas</Typography>

                    <Typography variant="h6">Fotocopias</Typography>

                    <Typography variant="h6">Formulario 08</Typography>

                    <Typography variant="h6">Otros Formularios</Typography>

                    <Typography variant="h5">ESCRITURAS</Typography>

                    <Typography variant="h6">Declaraciones Juradas</Typography>

                    <Typography variant="h6">Cesión de Derechos</Typography>

                    <Typography variant="h6">Compraventa</Typography>

                    <Typography variant="h6">Dación en Pago</Typography>

                    <Typography variant="h6">Donación</Typography>

                    <Typography variant="h6">Herencia</Typography>

                    <Typography variant="h6">Hipoteca</Typography>

                    <Typography variant="h6">Protocolización</Typography>

                    <Typography variant="h6">Reglamentos de Copropiedad</Typography>

                    <Typography variant="h6">Sucesiones</Typography>

                    <Typography variant="h6">Testamento</Typography>

                    <Typography variant="h6">Usufructo</Typography>
                  </div>

                  <div data-title="div" className={theme.accordionDetails}>
                    <Typography variant="h5">FAMILIA</Typography>

                    <Typography variant="h6">Acta de Convivencia</Typography>

                    <Typography variant="h6">Acta de Reconocimiento filiación Extra-matrimonial</Typography>

                    <Typography variant="h6">Acta designación Tutor y Delegación Responsabilidad Parental</Typography>

                    <Typography variant="h6">Actos de Autoprotección</Typography>

                    <Typography variant="h6">Afectación al Régimen de Vivienda | Desafectación</Typography>

                    <Typography variant="h6">Convención MatrimoniaL</Typography>

                    <Typography variant="h6">Donación</Typography>

                    <Typography variant="h6">Pacto de Convivencia</Typography>

                    <Typography variant="h6">Testamento</Typography>
                  </div>

                  <div data-title="div" className={theme.accordionDetails}>
                    <Typography variant="h5">PODERES</Typography>

                    <Typography variant="h6">Administración</Typography>

                    <Typography variant="h6">Bancarios</Typography>

                    <Typography variant="h6">Disposición</Typography>

                    <Typography variant="h6">Especial</Typography>

                    <Typography variant="h6">Especial Irrevocable</Typography>

                    <Typography variant="h6">Especial para Inmueble</Typography>

                    <Typography variant="h6">Especial para Juicios</Typography>

                    <Typography variant="h6">General de Administración</Typography>

                    <Typography variant="h6">General de Administración y Disposición</Typography>

                    <Typography variant="h6">General para Juicios</Typography>

                    <Typography variant="h6">Jubilación</Typography>

                    <Typography variant="h6">Revocación de Poderes</Typography>

                    <Typography variant="h6">Jubilación</Typography>

                    <Typography variant="h5">LEGALIZACIONES</Typography>
                  </div>

                  <div data-title="div" className={theme.accordionDetails}>
                    <Typography variant="h5">SOCIEDADES y ASOCIACIONES</Typography>

                    <Typography variant="h6">Certificación Actas de Asamblea y Directorio</Typography>

                    <Typography variant="h6">Certificaciones</Typography>

                    <Typography variant="h6">Cesión de Acciones</Typography>

                    <Typography variant="h6">Cesión de Cuotas</Typography>

                    <Typography variant="h6">Constitución de Sociedades</Typography>

                    <Typography variant="h6">Constitución y Reformas de Estatutos</Typography>

                    <Typography variant="h6">Contratos Sociales</Typography>

                    <Typography variant="h6">Escisiones</Typography>

                    <Typography variant="h6">Estatutos</Typography>

                    <Typography variant="h6">Fideicomisos</Typography>

                    <Typography variant="h6">Fusiones</Typography>

                    <Typography variant="h6">Protocolización Actas Societarias, Actas de Consorcio, y otras.</Typography>

                    <Typography variant="h6">Rúbricas Libros</Typography>
                  </div>
                </div>
              </AccordionDetails>
            </Accordion>

            <Accordion
              sx={{
                backgroundColor: '#003466;',
              }}
              className={theme.accordionDos}
            >
              <AccordionSummary sx={{}} expandIcon={<ExpandMoreIcon sx={{}} />}>
                <Typography variant="h5">Certificaciones digitales</Typography>
              </AccordionSummary>

              <AccordionDetails
                sx={{
                  backgroundColor: '#003466;',
                }}
              >
                <div data-title="div" className={theme.accordionDetails}>
                  <a target="_blank" href="/firmadigital">
                    <Typography variant="h6">Certificación de la firma digital</Typography>
                  </a>

                  <a target="_blank" href="/firmasolografas">
                    <Typography variant="h6">Certificación de firmas ológrafas</Typography>
                  </a>

                  <a target="_blank" href="/documentosdigitales">
                    <Typography variant="h6">Certificacion de validez de documentos digitales</Typography>
                  </a>

                  <a target="_blank" href="/certificacionesremotas">
                    <Typography variant="h6">Certificaciones remotas</Typography>
                  </a>

                  <a target="_blank" href="/testimoniosdigitales">
                    <Typography variant="h6">Testimonios o copias digitales</Typography>
                  </a>

                  <a target="_blank" href="/documentoselectronicos">
                    <Typography variant="h6">Certificacion de documentos electrónicos</Typography>
                  </a>
                </div>
              </AccordionDetails>
            </Accordion>
            <div data-title="div" className={theme.divButtonContacto}>
              <a target="_blank" href="/contacto">
                <Button variant="contained" color="primary" className={theme.buttonContactoDivLinks}>
                  CONTACTO
                </Button>
              </a>
            </div>
          </div>
        </Container>

        <div data-title="div" className={theme.header}>
          <Container className={theme.contenedorTarjetasContacto}>
            <div data-title="divImagen" className={theme.divTarjetasContacto}>
              <div data-title="Card" className={theme.divContenidoContactoTarjetaUno}>
                <Call
                  color="inherit"
                  className={theme.materialIconTarjetasContacto}
                  sx={{
                    fontSize: 50,
                  }}
                />

                <Typography variant="h6">Llámanos</Typography>

                <a target="_blank" href="tel:+5493544222222">
                  <Button variant="contained" color="primary" className={theme.buttonTarjetasContacto}>
                    +5493544222222
                  </Button>
                </a>
              </div>

              <div data-title="Card" className={theme.divContenidoContactoTarjetaDos}>
                <Schedule
                  color="inherit"
                  className={theme.materialIconTarjetasContacto}
                  sx={{
                    fontSize: 50,
                  }}
                />

                <Typography variant="h6">Horarios de oficina:</Typography>

                <Typography variant="subtitle2">De Lunes a Viernes - 9:00 a.m a 9:00 pm</Typography>

                <Typography variant="subtitle2">Av. lorem, 150, Lorem ipsum, consequat CP 5870</Typography>
              </div>

              <div data-title="Card" className={theme.divContenidoContactoTarjetaTres}>
                <Email
                  color="primary"
                  className={theme.materialIconTarjetasContacto}
                  sx={{
                    fontSize: 50,
                  }}
                />

                <Typography variant="h6">Envíenos un email</Typography>

                <a target="_blank" href="mailto:maildelaescribanial@hotmail.com">
                  <Button variant="contained" color="primary" className={theme.buttonTarjetasContacto}>
                    EscribaniaLorem@hotmail.com
                  </Button>
                </a>
              </div>
            </div>
          </Container>
        </div>
      </div>

      <Container className={theme.containerIcons} maxWidth="xl">
        <div data-title="Footer" id="final" className={theme.footer}>
          <div data-title="div" className={theme.divLinksFooter}>
            <Typography variant="h1">Estudio</Typography>

            <NavLink to="/">
              <Button variant="text" color="primary">
                Principal
              </Button>
            </NavLink>

            <a target="_blank" href="/nosotros">
              <Button variant="text" color="primary">
                Nosotros
              </Button>
            </a>

            <a target="_blank" href="/servicios">
              <Button variant="text" color="primary">
                Servicios
              </Button>
            </a>

            <NavLink to="/certificacionesdigitales">
              <Button variant="text" color="primary">
                Certificaciones digitales
              </Button>
            </NavLink>

            <a target="_blank" href="/contacto">
              <Button variant="text" color="primary">
                Contáctenos
              </Button>
            </a>
          </div>

          <div data-title="div" className={theme.direccionEscribania}>
            <Typography variant="h1">Escribanía Lorem Ipsum</Typography>

            <Typography variant="h2">Av. lorem, 150, Lorem ipsum, consequat CP 5870</Typography>

            <Typography variant="h3">(+549) 3544-222222</Typography>

            <Typography variant="h4">Escribanialoremipsum@hotmail.com</Typography>

            <picture className={theme.imgFooter}>
              <img src="/img/Texto del párrafo33_processed.png" alt="/img/Texto del párrafo33_processed.png" width="260" height="auto" />
            </picture>
          </div>

          <div data-title="divWhatsappPrincipal" className={theme.divWhatsappPrincipal}>
            <a target="_blank" className={theme.whatsappLink} href="https://walink.co/a9e23g">
              <WhatsApp
                color="primary"
                className={theme.whatsappIcon}
                sx={{
                  fontSize: 50,
                }}
              />
            </a>
          </div>
        </div>
      </Container>

      <div data-title="div" className={theme.divDerechosDeAutor}>
        <Typography variant="h1">Derechos de autor © 2024 Escribanía Lorem Ipsum</Typography>
      </div>

      <div data-title="div" className={theme.divDerechosDeAutor}>
        <Typography variant="h1">Creado por Mariano Godoy</Typography>
      </div>
    </React.Fragment>
  )
}

export default Nosotros
