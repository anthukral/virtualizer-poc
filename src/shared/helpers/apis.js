import { Routes } from "./constants"
import fetch from "node-fetch"
export const fetchCategory= async(plpid, pagenumber)=>{
    return await fetch(`http://localhost:3000/api${Routes.PLP}?categoryId=${plpid}&PageSize=12&sort=popularity&currentPage=${pagenumber}&filter_format=v2&currency=INR&country_code=IN&apiVersion=3&deviceType=MSITE`).then(response=>response.json());

}
export const fetchAdPlatform= async(pagename,pagedata)=>{
    return await fetch(`http://localhost:3000/api${Routes.AD_PLATFORM}?page_type=${pagename}&page_data=${pagedata}&page_section=*`).then(response=>response.json());

}

export const makeApiCall= async (plpid=5, pagenumber=1)=>{
    try{
    const result=await fetchCategory(plpid, pagenumber);
    const adPlatformResult= await fetchAdPlatform(result.response.ad_platform_data["page-type"],result.response.ad_platform_data["page-data"]);
    console.log( "data", result, adPlatformResult );
    return {plp: result.response, adPlatform:adPlatformResult }
    }catch(e){
        //do nothing
        return {plp:[], adPlatform:[]}
    }

}