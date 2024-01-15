import CardList from '../CardsList/CardList';

import mockData from '../../mockData'

import './App.scss';

function App() {
  console.log(mockData);
  return (
    <div className="App">
      <div className="titleAndDescr">
        <h1>Полезные материалы</h1>
        <h2>Собрали для вас полезные исследования схемы кормления и другие материалы, которые пригодятся для лучших результатов на вашем хозяйстве</h2>
      </div>


      <CardList mockData={mockData} />
    </div>
  );
}

export default App;
