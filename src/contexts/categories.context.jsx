import { createContext,useState,useEffect } from "react";
import SHOP_DATA from '../shop-data.js'
import {getCategoriesAndColletions} from '../utils/firebase/utils'

export const CategoriesContext = createContext({
  categoriesMap:{}
})

export const CategoriesProvider = ({children})=>{
  const [categoriesMap, setCategoriesMap] = useState({})

  useEffect(()=>{
    const getCategoriesMap = async ()=>{
      const categoryMap = await getCategoriesAndColletions();
      setCategoriesMap(categoryMap);
    }
    getCategoriesMap();
  },[])

  const value = { categoriesMap}
  return (
    <CategoriesContext.Provider value={value} >{children}</CategoriesContext.Provider>
  )
}
