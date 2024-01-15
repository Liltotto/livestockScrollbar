import { useEffect, useRef, useState } from 'react';
import styles from './cardItem.module.scss'
import './cardItem.scss'

export default function CardItem({img, title, date}) {
  
  const [width, setWidth] = useState(null)

  const cardRef = useRef(null)

  const allClasses = Object.keys(styles)

  var randomIndex = Math.floor(Math.random() * 5);

  const container = allClasses[randomIndex]


  useEffect(() => {
    if (cardRef.current) {
      setWidth(cardRef.current.offsetWidth);
    }

	if(title.length > 25) doubleWidth()
  }, []);

  const doubleWidth = () => {
    setWidth((prevWidth) => prevWidth * 2);
  };

//   const doubleWidth = (e) => {
// 		console.log(e.style.target.width);
// 		return e.style.target.maxWidth *= 2
//   }

//   const currentWidth = (e) => {
// 		console.log(e.style.target.width);
// 		return e.target.style.maxWidth
// }

  


  console.log(width);
  //width = title.length > 25

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
