import CardItem from "../CardItem/CardItem"

import './cardList.scss'

export default function CardList({ mockData }) {

	const data = mockData.map(item => {
		console.log(item)
		return <CardItem key={item.id} {...item} />
	}

	)

	console.log(data);

	return (
		<div className="cardList">
			{data}
		</div>

	)
}
