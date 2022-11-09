import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import React, { useEffect, useState } from "react";
import MainPage from "../../components/MainPage";
import {findAllProduct} from "../../services/ProductService";
import {Link} from "react-router-dom";
import { Button } from "primereact/button";

const ProductAdminPageList = ()=> {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        const load = async () => {
            try {
                const response = await findAllProduct();
                setProducts(response.data);
                
            } catch (error) {
                console.error(error);
                
            }
        }
        load();
    }, []);

    
    return(
    

            <MainPage>
                <div className="main-content">
                    <div className="content">
                        <div className=" content-inner">
                        <div className="content-header">
                            <h2>Produto</h2>

                            <div>      
                                <Link to="admin/product/create"
                                    style = {{textDecoration: "none" } } >
                                    <Button label="Adicionar"
                                    icon = "pi pi-plus" />
                                   </Link>
                                   </div>
                             
                    
                        </div>
                        <div className="content-body">
                            <div className="content-data shadow-">
                                <DataTable value={products}
                                    size = "small"
                                    stripedRows
                                    className="table-view">
                                <Column field="name" header ="Nome do Produto" />
                                <Column field="category.name" header ="Categoria" />

                                </DataTable>

                            </div>


                        </div>

                        </div>
                      

                    </div>

                </div>
            </MainPage>
    )

}

export default ProductAdminPageList;