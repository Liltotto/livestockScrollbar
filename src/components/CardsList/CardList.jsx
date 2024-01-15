import { useEffect, useRef, useState } from "react"
import CardItem from "../CardItem/CardItem"

import './cardList.scss'

export default function CardList({ mockData }) {



	const cardListRef = useRef(null)

	const [lastItemClass, setLastItemClass] = useState(null)

	const [currentWidthOfItems, setCurrentWidthOfItems] = useState(null)

	const [isActiveRightArrow, setIsActiveRightArrow] = useState(true)

	const [isActiveLeftArrow, setIsActiveLeftArrow] = useState(false)

	const [blockActiveArrow, setBlockActiveArrow] = useState(false)

	//const [activeClassLeft, setActiveClassRight] = useState(null)

	const handleWheelScroll = (event) => {
			console.log(event.deltaX + ' and '+ event.deltaY);


			// Предотвращаем стандартное поведение прокрутки страницы по вертикали
			event.preventDefault();

			const deltaY = event.deltaY;
			const scrollSpeed = 10; // Скорость прокрутки по горизонтали
		  
			// Прокручиваем горизонтально в соответствии с направлением
			cardListRef.current.scrollBy({
				left: deltaY * scrollSpeed,
			  });
	  
	}

	useEffect(() => {
		// Добавляем обработчик события wheel на элемент cardListRef.current
		cardListRef.current.addEventListener('wheel', handleWheelScroll, { passive: false });
	  
		// Возвращаем функцию очистки, чтобы удалить обработчик события при размонтировании компонента
		return () => {
		  cardListRef.current.removeEventListener('wheel', handleWheelScroll);
		};
	  }, []);

	const handleScroll = () => {
		
		const scrollWidth = cardListRef.current.scrollWidth;
		const clientWidth = cardListRef.current.clientWidth;
		const scrollLeft = cardListRef.current.scrollLeft;

		if (scrollLeft === 0) setIsActiveLeftArrow(false)
		else {
			setIsActiveLeftArrow(true)	
		}

		console.log(scrollWidth - clientWidth - scrollLeft);

		console.log('scrollLeft ' + scrollLeft);

		if (scrollWidth - clientWidth - scrollLeft <= 0) {
			setIsActiveRightArrow(false)
		} else {
			setIsActiveRightArrow(true)
		}
	}

	useEffect(() => {
		cardListRef.current.addEventListener('scroll', handleScroll);

		return () => {
			cardListRef.current.removeEventListener('scroll', handleScroll);
		};
	}, [])

	const changeLastItem = (item) => {
		setLastItemClass(item)
	}

	const changeCurrentWidthOfItems = (item) => {
		setCurrentWidthOfItems(item)
	}

	const clickHandler = (e) => {
		
		if (e.currentTarget.classList.contains('scrollbar-left__arrow')) {
			
			//setIsActiveLeftArrow(false)
			// setTimeout(() => {
			// 	setIsActiveLeftArrow(true)
			// }, 1000)
			cardListRef.current.scrollBy({
				top: 0,
				left: -currentWidthOfItems,
				behavior: "smooth",
			})
		}

		else if (e.currentTarget.classList.contains('scrollbar-right__arrow')) {
			//setIsActiveRightArrow(false)
			// setTimeout(() => {
			// 	setIsActiveRightArrow(true)
			// }, 1000)
			cardListRef.current.scrollBy({
				top: 0,
				left: currentWidthOfItems,
				behavior: "smooth",
			})
		}
	}


	const data = mockData.map(item => {

		return <CardItem
			key={item.id}
			{...item}
			lastItemClass={lastItemClass}
			changeLastItem={changeLastItem}
			changeCurrentWidthOfItems={changeCurrentWidthOfItems} />
	})



	return (
		<div className="cardList" >
			<div className="listOfCardItem" ref={cardListRef}>
				{data}
			</div>

			<div className="scrollbar-arrows">
				<button className="scrollbar-left__arrow" onClick={clickHandler} disabled={!isActiveLeftArrow}>
					<div className={`arrow_icon${isActiveLeftArrow ? ' active' : ''}`}></div>
				</button>
				<button className="scrollbar-right__arrow" onClick={clickHandler} disabled={!isActiveRightArrow}>
					<div className={`arrow_icon${isActiveRightArrow ? ' active' : ''}`}></div>
				</button>
			</div>
		</div>

	)
}
