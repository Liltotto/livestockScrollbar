import { useEffect, useMemo, useRef, useState } from 'react';
import styles from './cardItem.module.scss'
import './cardItem.scss'

export default function CardItem({img, title, date, lastItemClass, changeLastItem, changeCurrentWidthOfItems}) {
  
  const [width, setWidth] = useState(null)

  const cardRef = useRef(null)

  if(lastItemClass === 'circleContainer') {
		delete styles['circleContainer']
  }

  const allClasses = Object.keys(styles)


  const randomIndex = useMemo(()=>Math.floor(Math.random() * allClasses.length), [])

  const container = allClasses[randomIndex]

  

  useEffect(() => {
    changeLastItem(container)
    if (cardRef.current) {
      setWidth(cardRef.current.offsetWidth)
      changeCurrentWidthOfItems(cardRef.current.offsetWidth)
      if(title.length > 25) doubleWidth()
    }
    
	  
  }, []);

  const doubleWidth = () => {
    setWidth((prevWidth) => prevWidth * 2);
  };
 
  

  return (
    <div ref={cardRef} className="cardItem" style={{maxWidth: width}}>
        <div className={`cardItem__img ${styles[container]}`}>
          <img src={img} alt="livestock" />
        </div>
        <div className="cardItem__title">{title}</div>
        <div className="cardItem__date">{date}</div>
    </div>
  )
}
