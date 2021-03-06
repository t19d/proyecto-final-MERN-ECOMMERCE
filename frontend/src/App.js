import React, { useState } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import HomeScreen from './screens/HomeScreen';
import EquipacionesScreen from './screens/EquipacionesScreen';
import ProductoScreen from './screens/ProductoScreen';
import CarritoScreen from './screens/CarritoScreen';
import InicioSesionScreen from './screens/InicioSesionScreen';
import RegistroScreen from './screens/RegistroScreen';
import ManageProductosScreen from './screens/ManageProductosScreen';
import EnvioScreen from './screens/EnvioScreen';
import PagoScreen from './screens/PagoScreen';
import FinalizarPedidoScreen from './screens/FinalizarPedidoScreen';
import EntrenamientoScreen from './screens/EntrenamientoScreen';
import ModaScreen from './screens/ModaScreen';
import BufandasScreen from './screens/BufandasScreen';
import AccesoriosScreen from './screens/AccesoriosScreen';
import OutletScreen from './screens/OutletScreen';
import PerfilScreen from './screens/PerfilScreen';
import { cerrarSesion } from './actions/usuarioAcciones';
import ListaPedidosScreen from './screens/ListaPedidosScreen';
import PedidoDetalleScreen from './screens/PedidoDetalleScreen';
import ModificarDatosUsuarioScreen from './screens/ModificarDatosUsuarioScreen';
import ModificarContrasenhaUsuarioScreen from './screens/ModificarContrasenhaUsuarioScreen';

function App() {

  const usuarioInicioSesion = useSelector(state => state.usuarioInicioSesion);
  const { usuarioInfo } = usuarioInicioSesion;

  const usuarioDetalles = useSelector((state) => state.usuarioDetalles);
  const { loading, error, usuario } = usuarioDetalles;

  const listaProductos = useSelector(state => state.listaProductos);
  const { productos, loading: loadingListaProductos, error: errorListaProductos } = listaProductos;

  const [filtroListaProductosBuscador, setFiltroListaProductosBuscador] = useState("");
  const limpiarFiltro = () => {
    setFiltroListaProductosBuscador("");
  }

  const resultadosListaBuscador = productos ?
    productos
      .filter(item => item.nombre.toLowerCase().includes(filtroListaProductosBuscador.toLowerCase()))
      .map((item) =>
        <li key={item.id} className="itemResultadosListaBuscar col-md-3 col-sm-4 col-xs-12" onClick={limpiarFiltro}>
          <Link to={'/productos/' + item._id}>
            <div className="row">
              <div className="col-4"><img src={item.miniatura} className="img-fluid imagenItemResultadosListaBuscar" alt={item.imgDescripcion} /></div>
              <div className="col-8">{item.nombre}</div>
            </div>
          </Link>
        </li>
      ) :
    <li></li>;

  const dispatch = useDispatch();
  const cerrarSesionHandler = () => {
    dispatch(cerrarSesion());
  };


  return (
    <BrowserRouter>
      <header>
        <div id="header_superior" className="container-fluid">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-6">
                <div className="text-white">
                  <svg width="2em" height="1em" viewBox="0 0 16 20" className="bi bi-arrow-left"
                    fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd"
                      d="M5.854 4.646a.5.5 0 0 1 0 .708L3.207 8l2.647 2.646a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 0 1 .708 0z" />
                    <path fillRule="evenodd"
                      d="M2.5 8a.5.5 0 0 1 .5-.5h10.5a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
                  </svg>
                  <a className="navbar-link text-white" href="#">clubpastorizabalompie.es</a>
                </div>
              </div>
              <div className="col-6">
                <div className="row float-right align-items-center">
                  <div id="header_superior_iniciar_sesion" className="text-white">

                    {
                      usuarioInfo ?
                        (
                          <ul className="menuUsuario">
                            <li className="nav-item dropdown">
                              <span className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink"
                                role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <span>
                                  {usuario ? usuario.nombre : usuarioInfo.nombre}
                                </span>
                              </span>
                              <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                {usuarioInfo.isAdmin === true && <Link to="/manageproductos" className="dropdown-item"><span>MANAGE PRODUCTOS</span></Link>}
                                <Link to="/perfil" className="dropdown-item"><span>PERFIL</span></Link>
                                <Link to="/pedidos" className="dropdown-item"><span>PEDIDOS</span></Link>
                                <Link to="#cerrarsesion" className="dropdown-item" onClick={cerrarSesionHandler}>CERRAR SESIÓN</Link>
                              </div>
                            </li>
                          </ul>
                        )
                        :
                        (<Link to="/iniciosesion" className="navbar-link text-white">
                          <span>
                            <svg width="1.5em" height="1em" viewBox="0 0 16 20" className="bi bi-person-circle"
                              fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                              <path
                                d="M13.468 12.37C12.758 11.226 11.195 10 8 10s-4.757 1.225-5.468 2.37A6.987 6.987 0 0 0 8 15a6.987 6.987 0 0 0 5.468-2.63z" />
                              <path fillRule="evenodd" d="M8 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                              <path fillRule="evenodd"
                                d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8z" />
                            </svg>Iniciar sesión / Registrarse
                            </span>
                        </Link>)
                    }
                  </div>
                  <div className="form-inline filtroBuscador">
                    <input className="form-control mr-sm-2" onClick={(e) => (e.target.value.length > 1) ? setFiltroListaProductosBuscador(e.target.value) : setFiltroListaProductosBuscador("")} onChange={(e) => (e.target.value.length > 1) ? setFiltroListaProductosBuscador(e.target.value) : setFiltroListaProductosBuscador("")} type="search" placeholder="Buscar..." aria-label="Buscar" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="contenedorResultadosBuscador">
          <ul className="resultadosBuscador row">{filtroListaProductosBuscador.length > 0 && resultadosListaBuscador}</ul>
        </div>

        <div id="header_inferior" className="container-fluid">
          <div className="container">
            <div id="header_inferior_izquierda">
              <Link to="/">
                <img id="header_escudo" src="/images/escudos/vector_escudo_nombre.svg" alt="Icono inicio" />
              </Link>
            </div>
            <nav className="navbar navbar-expand-lg justify-content-end">
              <div id="header_inferior_derecha">
                <button className="navbar-toggler navbar-dark" type="button" data-toggle="collapse"
                  data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false"
                  aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                  <ul className="navbar-nav">
                    <li className="nav-item">
                      <Link to="/equipaciones" className="nav-link">
                        <span data-toggle="collapse" data-target=".navbar-collapse.show">EQUIPACIONES 20/21</span>
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/entrenamiento" className="nav-link">
                        <span data-toggle="collapse" data-target=".navbar-collapse.show">ENTRENAMIENTO 20/21</span>
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/moda" className="nav-link">
                        <span data-toggle="collapse" data-target=".navbar-collapse.show">MODA</span>
                      </Link>
                    </li>
                    <li className="nav-item dropdown">
                      <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink"
                        role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        AFICIÓN
                      </a>
                      <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                        <Link to="/bufandas" className="dropdown-item">
                          <span data-toggle="collapse" data-target=".navbar-collapse.show">BUFANDAS</span>
                        </Link>
                        <Link to="/accesorios" className="dropdown-item">
                          <span data-toggle="collapse" data-target=".navbar-collapse.show">ACCESORIOS</span>
                        </Link>
                      </div>
                    </li>
                    <li className="nav-item">
                      <Link to="/outlet" className="nav-link">
                        <span data-toggle="collapse" data-target=".navbar-collapse.show">OUTLET</span>
                      </Link>
                    </li>
                    <li className="nav-item" >
                      <Link to="/carrito" className="nav-link">
                        <span data-toggle="collapse" data-target=".navbar-collapse.show">
                          <svg xmlns="http://www.w3.org/2000/svg" width="1.3em" height="1.3em" fill="currentColor" className="bi bi-cart3" viewBox="0 0 16 22">
                            <path fillRule="evenodd" d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm7 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                          </svg>
                        </span>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>

            <div id="contenedorPequeImagen">
              <Link to="/">
                <img id="header_escudo_peque" src="/images/escudos/vector_escudo_clubpastorizabalompie.svg" alt="Icono inicio" data-toggle="collapse" data-target=".navbar-collapse.show" />
              </Link>
            </div>
            
            <div id="contenedorPequeUsuarioCarrito">
              <ul>
                <li>
                  {usuarioInfo &&
                    <Link to="#cerrarsesion" className="-item" onClick={cerrarSesionHandler}>
                      <span data-toggle="collapse" data-target=".navbar-collapse.show">
                        <svg xmlns="http://www.w3.org/2000/svg" width="2.5em" height="2.5em" fill="currentColor" className="bi bi-door-open-fill" viewBox="0 0 16 16">
                          <path d="M1.5 15a.5.5 0 0 0 0 1h13a.5.5 0 0 0 0-1H13V2.5A1.5 1.5 0 0 0 11.5 1H11V.5a.5.5 0 0 0-.57-.495l-7 1A.5.5 0 0 0 3 1.5V15H1.5zM11 2h.5a.5.5 0 0 1 .5.5V15h-1V2zm-2.5 8c-.276 0-.5-.448-.5-1s.224-1 .5-1 .5.448.5 1-.224 1-.5 1z" />
                        </svg>
                      </span>
                    </Link>
                  }
                </li>
                <li>
                  <Link to={usuarioInfo ? "/perfil" : "/iniciosesion"} className="">
                    <span data-toggle="collapse" data-target=".navbar-collapse.show">
                      <svg width="2.5em" height="2.5em" viewBox="0 0 16 16" className="bi bi-person-circle"
                        fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M13.468 12.37C12.758 11.226 11.195 10 8 10s-4.757 1.225-5.468 2.37A6.987 6.987 0 0 0 8 15a6.987 6.987 0 0 0 5.468-2.63z" />
                        <path fillRule="evenodd" d="M8 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                        <path fillRule="evenodd"
                          d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8z" />
                      </svg>
                    </span>
                  </Link>
                </li>
              </ul>
              <ul>
                <li className="nav-item" >
                  {usuarioInfo && usuarioInfo.isAdmin === true &&
                    <Link to="/manageproductos" className="">
                      <span data-toggle="collapse" data-target=".navbar-collapse.show">
                        <svg xmlns="http://www.w3.org/2000/svg" width="2.5em" height="2.5em" fill="currentColor" className="bi bi-sliders" viewBox="0 0 16 16">
                          <path fillRule="evenodd" d="M11.5 2a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM9.05 3a2.5 2.5 0 0 1 4.9 0H16v1h-2.05a2.5 2.5 0 0 1-4.9 0H0V3h9.05zM4.5 7a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM2.05 8a2.5 2.5 0 0 1 4.9 0H16v1H6.95a2.5 2.5 0 0 1-4.9 0H0V8h2.05zm9.45 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm-2.45 1a2.5 2.5 0 0 1 4.9 0H16v1h-2.05a2.5 2.5 0 0 1-4.9 0H0v-1h9.05z" />
                        </svg>
                      </span>
                    </Link>
                  }
                </li>
                <li className="nav-item" >
                  <Link to="/carrito" className="">
                    <span data-toggle="collapse" data-target=".navbar-collapse.show">
                      <svg xmlns="http://www.w3.org/2000/svg" width="2.5em" height="2.5em" fill="currentColor" className="bi bi-cart3" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm7 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                      </svg>
                    </span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </header>

      <div id="contenidoPrincipal">
        <Route path="/" exact={true} component={HomeScreen} />
        <Route path="/carrito/:id?" component={CarritoScreen} />
        <Route path="/envio" component={EnvioScreen} />
        <Route path="/pago" component={PagoScreen} />
        <Route path="/finalizarpedido" component={FinalizarPedidoScreen} />
        <Route path="/iniciosesion" component={InicioSesionScreen} />
        <Route path="/registro" component={RegistroScreen} />
        <Route path="/productos/:id" component={ProductoScreen} />
        <Route path="/manageproductos" component={ManageProductosScreen} />
        <Route path="/equipaciones" component={EquipacionesScreen} />
        <Route path="/entrenamiento" component={EntrenamientoScreen} />
        <Route path="/moda" component={ModaScreen} />
        <Route path="/bufandas" component={BufandasScreen} />
        <Route path="/accesorios" component={AccesoriosScreen} />
        <Route path="/outlet" component={OutletScreen} />
        <Route path="/perfil" component={PerfilScreen} />
        <Route path="/editarusuario/:id" component={ModificarDatosUsuarioScreen} />
        <Route path="/cambiarcontrasenha/:id" component={ModificarContrasenhaUsuarioScreen} />
        <Route path="/pedidos" component={ListaPedidosScreen} />
        <Route path="/mispedidos/:id" component={PedidoDetalleScreen} />
      </div>


      <footer className="page-footer font-small pt-5">
        <hr />
        <div className="container text-center text-md-left">
          <div className="row">
            <div className="col-md-4 col-sm-12 col-xs-12 mx-auto">
              <h5 className="font-weight-bold text-uppercase mt-3 mb-4">Club Pastoriza Balompié</h5>
              <p>Esta es la web de merchandising oficial del Club Pastoriza Balompié</p>
            </div>
            <hr className="clearfix w-100 d-md-none" />
            <div className="col-md-2 col-sm-12 col-xs-12 mx-auto">
              <h5 className="font-weight-bold text-uppercase mt-3 mb-4 text-center">20/21</h5>
              <ul className="list-unstyled">
                <li className="text-center">
                  <Link to="/equipaciones">
                    <span>Equipaciones</span>
                  </Link>
                </li>
                <li className="text-center">
                  <Link to="/entrenamiento">
                    <span>Entrenemiento</span>
                  </Link>
                </li>
              </ul>
            </div>
            <hr className="clearfix w-100 d-md-none" />
            <div className="col-md-2 col-sm-12 col-xs-12 mx-auto">
              <h5 className="font-weight-bold text-uppercase mt-3 mb-4 text-center">Afición</h5>
              <ul className="list-unstyled">
                <li className="text-center">
                  <Link to="/bufandas">
                    <span>Bufandas</span>
                  </Link>
                </li>
                <li className="text-center">
                  <Link to="/accesorios">
                    <span>Accesorios</span>
                  </Link>
                </li>
              </ul>
            </div>
            <hr className="clearfix w-100 d-md-none" />
          </div>
        </div>
      </footer>

    </BrowserRouter>
  );
}

export default App;
