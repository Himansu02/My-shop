import { Outlet } from "react-router-dom"
import ProductList from "../pages/ProductList"


const AllProduct=()=>{
    return (
        <>
            <ProductList></ProductList>
            <Outlet></Outlet>
        </>
    )
}

export default AllProduct