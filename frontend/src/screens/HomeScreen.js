import React from 'react';
import data from '../data';
import { Link } from 'react-router-dom';

function HomeScreen(props) {
    const equipacionLocal = data.productos.find(p => p._id === '1-equipacion-adulto-20-21-club-pastoriza-balompie');
    const equipacionVisitante = data.productos.find(p => p._id === '2-equipacion-adulto-20-21-club-pastoriza-balompie');
    return (
        <section>
            <a href="/equipaciones"><img src="/images/recursos/Cabecera_camiseta_negra_grande.png" width="100%" alt="Cabecera camiseta negra"/></a>
            <div className="container">
                <h1 className="text-center text-uppercase font-weight-bold">Equipaciones Oficiales</h1>
                <div className="row listaProductos">
                    <Link to={'/productos/' + equipacionLocal._id} className="col-sm itemProductos">
                        <div className="card text-center">
                            <div className="card-body">
                                <img src={equipacionLocal.miniatura} className="card-img imagenItem" alt={equipacionLocal.imgDescripcion} />
                                <h5 className="card-title">{equipacionLocal.nombre}</h5>
                                <h5 className="card-title precioItem">{equipacionLocal.precio} €</h5>
                            </div>
                        </div>
                    </Link>
                    <Link to={'/productos/' + equipacionVisitante._id} className="col-sm itemProductos">
                        <div className="card text-center">
                            <div className="card-body">
                                <img src={equipacionVisitante.miniatura} className="card-img imagenItem" alt={equipacionVisitante.imgDescripcion} />
                                <h5 className="card-title">{equipacionVisitante.nombre}</h5>
                                <h5 className="card-title precioItem">{equipacionVisitante.precio} €</h5>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </section>
    );
}

export default HomeScreen;