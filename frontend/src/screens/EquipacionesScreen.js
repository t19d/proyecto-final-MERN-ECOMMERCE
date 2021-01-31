import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { hacerListaProductos } from '../actions/productoAcciones'

function EquipacionesScreen(props) {

    const listaProductos = useSelector(state => state.listaProductos);
    const { productos, loading, error } = listaProductos;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(hacerListaProductos());
        return () => {
            //
        }
    }, []);

    return (
        <section>
            <img src="/images/recursos_web/cabecera_camiseta_blanca_grande.png" width="100%" alt="Cabecera camiseta blanca" />
            <div className="container">
                {
                    loading ? <div>Cargando...</div> :
                        error ? <div>{error}</div> :
                            (
                                <div className="row listaProductos">
                                    {
                                        productos.map(
                                            producto =>
                                            (<Link to={'/productos/' + producto._id} className="col-sm itemProductos" key={producto._id}>
                                                <div className="card text-center">
                                                    <div className="card-body">
                                                        <img src={producto.miniatura} className="card-img imagenItem" alt={producto.imgDescripcion} />
                                                        <h5 className="card-title">{producto.nombre}</h5>
                                                        <h5 className="card-title precioItem">{producto.precio} €</h5>
                                                    </div>
                                                </div>
                                            </Link>)
                                        )
                                    }
                                </div>
                            )
                }
            </div>
        </section>);
}

export default EquipacionesScreen;