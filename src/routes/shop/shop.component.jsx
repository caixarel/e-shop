import { Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import CategoriesPreview from "../categories-preview/categories-preview.component.jsx"
import Category from '../category/category.component.jsx'
import { getCategoriesAndColletions } from '../../utils/firebase/utils.js'
import { setCategoriesMap } from '../../store/categories/categories.action.js'
import './shop.styles.scss'


const Shop = ()=>{
  const dispatch = useDispatch();

   useEffect(()=>{
    const getCategoriesMap = async ()=>{
      const categoryMap = await getCategoriesAndColletions();
      dispatch(setCategoriesMap(categoryMap));
    }
    getCategoriesMap();
  },[dispatch])

  return (
    <Routes>
      <Route index element={<CategoriesPreview />}/>
      <Route path=":category" element={<Category />}/>

    </Routes>
  )
}

export default Shop;
