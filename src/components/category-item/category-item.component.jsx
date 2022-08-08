import './category-item.styles.scss'
import { useNavigate } from 'react-router-dom';

const CategoryItem = ({category}) =>{
  const {imageUrl,title,route } = category;
  const navigate = useNavigate();
  const onNavigateHandler = ()=> navigate(route)

  return(
    <div className="directory-item-container" onClick={onNavigateHandler}>
      <div className="background-image" style={{backgroundImage:`url(${imageUrl})`}}></div>
      <div className="directory-item-body">
        <h2>{title}</h2>
        <p>shop now</p>
      </div>
    </div>
  )
}

export default CategoryItem
