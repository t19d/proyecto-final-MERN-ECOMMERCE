import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function EquipacionesScreen(props) {

    const [productos, setProducto] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const { data } = await axios.get("/api/productos");
            setProducto(data);
        }
        fetchData();
        return () => {
            //
        }
    }, []);

    return (
        <section>
            <img src="/images/recursos_web/cabecera_camiseta_blanca_grande.png" width="100%" alt="Cabecera camiseta blanca" />
            <div className="container">
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
            </div>
        </section>);
}

export default EquipacionesScreen;