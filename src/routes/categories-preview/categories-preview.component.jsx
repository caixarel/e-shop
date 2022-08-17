import { useSelector } from 'react-redux';
import CategoryPreview from '../../components/category-preview/category-preview.component.jsx'


const CategoriesPreview = ()=>{
  const categoriesMap = useSelector((state)=>state.categories.categoriesMap)
  return (
    <div className='shop-container'>
    {
      Object.keys(categoriesMap).map((title)=>{
        const products = categoriesMap[title];
        return (<CategoryPreview key={title} title={title} products={products} />)
      })
    }
    </div>
  )
}

export default CategoriesPreview;
