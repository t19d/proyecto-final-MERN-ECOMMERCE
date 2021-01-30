import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import HomeScreen from './screens/HomeScreen';
import EquipacionesScreen from './screens/EquipacionesScreen';
import ProductoScreen from './screens/ProductoScreen';

function App() {
  return (
    <BrowserRouter>
      <header>
        <div id="header_superior" className="container-fluid">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-6">
                <div className="text-white">
                  <svg width="2em" height="1em" viewBox="0 0 16 16" className="bi bi-arrow-left"
                    fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd"
                      d="M5.854 4.646a.5.5 0 0 1 0 .708L3.207 8l2.647 2.646a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 0 1 .708 0z" />
                    <path fillRule="evenodd"
                      d="M2.5 8a.5.5 0 0 1 .5-.5h10.5a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
                  </svg>
                  <a className="navbar-link text-white" href="#">clubpastorizabalimpie.es</a>
                </div>
              </div>
              <div className="col-6">
                <div className="row float-right align-items-center">
                  <div id="header_superior_iniciar_sesion" className="text-white">
                    <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-person-circle"
                      fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M13.468 12.37C12.758 11.226 11.195 10 8 10s-4.757 1.225-5.468 2.37A6.987 6.987 0 0 0 8 15a6.987 6.987 0 0 0 5.468-2.63z" />
                      <path fillRule="evenodd" d="M8 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                      <path fillRule="evenodd"
                        d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8z" />
                    </svg>
                    <a className="navbar-link text-white" href="#"> Iniciar sesión / Registrarse</a>
                  </div>
                  <form className="form-inline">
                    <input className="form-control mr-sm-2" type="search" placeholder="Buscar..."
                      aria-label="Buscar" />
                    <button className="btn btn-light my-2 my-sm-0" type="submit">Buscar</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div id="header_inferior" className="container-fluid">
          <div className="container">
            <div id="header_inferior_izquierda">
              <a href="/">
                <img id="header_escudo" src="/images/recursos/vector_escudo_nombre.svg" alt="Icono inicio" />
              </a>
            </div>
            <nav className="navbar navbar-expand-lg justify-content-end">
              <div id="header_inferior_derecha">
                <button className=" navbar-toggler navbar-dark bg-dark" type="button" data-toggle="collapse"
                  data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false"
                  aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                  <ul className="navbar-nav">
                    <li className="nav-item active">
                      <a className="nav-link" href="/equipaciones">EQUIPACIONES 20/21</a>
                    </li>
                    <li className="nav-item active">
                      <a className="nav-link" href="/entrenamiento">ENTRENAMIENTO 20/21</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="/moda">MODA</a>
                    </li>
                    <li className="nav-item dropdown">
                      <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink"
                        role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        AFICIÓN
                                    </a>
                      <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                        <a className="dropdown-item" href="/bufandas">BUFANDAS</a>
                        <a className="dropdown-item" href="/accesorios">ACCESORIOS</a>
                        <a className="dropdown-item" href="/regalos">REGALOS</a>
                      </div>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="/outlet">OUTLET</a>
                    </li>

                  </ul>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </header>
      
      <div id="contenidoPrincipal">
        <Route path="/" exact={true} component={HomeScreen} />
        <Route path="/productos/:id" component={ProductoScreen} />
        <Route path="/equipaciones" component={EquipacionesScreen} />
      </div>

    </BrowserRouter>
  );
}

export default App;
