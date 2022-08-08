import React, {useContext, useState, useEffect } from 'react'
import { CategoriesContext } from '../../contexts/categories.context';
import { useParams } from 'react-router-dom'
import ProductCard from '../../components/product-card/product-card.component';
import './category.styles.scss'

export default function Category() {
  const { category } = useParams();
  const { categoriesMap } = useContext(CategoriesContext);
  const [ products, setproducts] = useState(categoriesMap[category]);

  useEffect(()=>{
    setproducts(categoriesMap[category])
  },[category,categoriesMap])

  return (
    <>
      <h2 className='title'>{category.toUpperCase()}</h2>
      <div className='category-container'>
        {
          products && products.map((product)=>(<ProductCard key={product.id} product={product}/>))
        }
      </div>
    </>
  )
}
