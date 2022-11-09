import React, { useEffect, useState } from "react";
import { findAllCategory } from "../../services/CategoryService";
import MainPage from "../../components/MainPage";
import { createProduct } from "../../services/ProductService";
import { useNavigate } from "react-router-dom";
import { ProgressBar } from "primereact/progressbar";

const ProductAdminCreatePage = () => {

    const [product, setProduct] = useState();
    const [category, setCategory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [submited, setSubmited] = useState(false);


    const navigate = useNavigate();

    useEffect (() =>{
        const loadCategory = async () => {
           try {
            const response = await findAllCategory();

            
           } catch (error) {

            console.error(error);
            
           }
        } 

        loadCategory();

        const empatyProduct ={
            id: null,
            name: "",
            category: {
                id: null

            },
            description: "",
            stock: 0 ,
            price: 0

        }

        setProduct(empatyProduct);
        setLoading(false);
    }, []);


   const saveProduct = async () => {
    try {
        setSubmited(true);
            const response = await createProduct();
        const _product = response.data;
        navigate(`/admin/product/detail/${_product.id}`, {

            replace: true
        });
    } catch (error) {
        console.error(error);
        
    }
   }


    return(
    

        <MainPage>

            {loading ?
            <ProgressBar mode="indeterminate" />
            
         


}
               

        </MainPage>

    )
}

export default ProductAdminCreatePage;