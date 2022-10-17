import React from "react";
import Footer from "../Footer";
import Header from "../Header";
import Main from "../Main";
import {useLocation} from "react-router";
import Products from "../Products";
import { useFrontload } from "react-frontload";
export default function ListingPage(){
    const location= useLocation();
    const a= new URLSearchParams(location.search)
    
    const {data}=useFrontload('app', async ({api})=>{
        await api(a.get("id"), a.get("num"));
    } );
    console.log(data)
    if(data){
        return (<>
            <Header/>
            <Main data={data.adPlatform}/>
            <Products data={data.plp} />
            <Footer/>
    </>)
    }
    return null;
//    console.log(a, data);
  

}