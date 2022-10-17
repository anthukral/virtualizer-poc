import React,{useState,useEffect} from "react";
import Adplatform from "../AdPlatformWidgets";
export default function Main(props){
const [adPlatform, setAdPlatform]=useState();

useEffect(()=>{
    if(props.data && !adPlatform){
        setAdPlatform(props.data);
    }
},[]);

return <>
 <h1>Main</h1>
 <Adplatform />
</>

}