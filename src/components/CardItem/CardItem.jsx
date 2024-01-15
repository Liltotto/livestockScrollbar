import { useEffect, useMemo, useRef, useState } from 'react';
import styles from './cardItem.module.scss'
import './cardItem.scss'

export default function CardItem({ img, title, date, lastItemClass, changeLastItem, changeCurrentWidthOfItems }) {

  const [width, setWidth] = useState(null)

  const cardRef = useRef(null)

  if (lastItemClass === 'circleContainer') {
    delete styles['circleContainer']
  }

  const allClasses = Object.keys(styles)


  const randomIndex = useMemo(() => Math.floor(Math.random() * allClasses.length), [])

  const container = allClasses[randomIndex]



  useEffect(() => {
    changeLastItem(container)
    if (cardRef.current) {
      setWidth(cardRef.current.offsetWidth)
      changeCurrentWidthOfItems(cardRef.current.offsetWidth)
      if (title.length > 25) doubleWidth()
    }



  }, []);

  const doubleWidth = () => {
    setWidth((prevWidth) => prevWidth * 2);
  };


  const mouseEnterHandler = (e) => {
    if (title.length > 25) return
    e.target.classList.add("animate")
  }


  return (
    <div
      ref={cardRef}
      onMouseEnter={() => setWidth((prev) => title.length > 25 ? prev : prev * 2)}
      onMouseLeave={() => setWidth((prev) => title.length > 25 ? prev : prev / 2)}
      className="cardItem"
      style={{ maxWidth: width }}>
      <div className={`cardItem__img ${styles[container]}`}>
        <img src={img} alt="livestock" />
      </div>
      <div className="cardItem__title">{title}</div>
      <div className="cardItem__date">{date}</div>
    </div>
  )
}
