const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
const port = 3001;

const cityData = [
  {
    id: 1,
    name: 'São José dos Campos',
    description: 'A city in São Paulo state.',
    image: 'https://media.istockphoto.com/id/1393381798/pt/foto/sao-jose-dos-campos-sao-paulo-brazil-04-2022-naerial-view-of-the-cable-stayed-bridge-in-s%C3%A3o.jpg?s=2048x2048&w=is&k=20&c=NdLhem5V0GP9AjHd-ySkNp2pCryTI19gHdgx-jYWtG0=',
    famousAttraction: 'Roberto Burle Marx Park',
    bestTimeToVisit: 'May to September',
    population: '729,737',
    area: '1,099.60 km²',
    timeZone: 'BRT (UTC−3)'
  },
  {
    id: 2,
    name: 'Guarapuava',
    description: 'A city in Paraná state.',
    image: 'https://hotelkuster.com.br/wp-content/uploads/2017/05/parque-do-lago.jpg',
    famousAttraction: 'Parque das Araucárias',
    bestTimeToVisit: 'April to October',
    population: '185,377',
    area: '3,123.4 km²',
    timeZone: 'BRT (UTC−3)'
  },
  {
    id: 3,
    name: 'New York',
    description: 'The most populous city in the United States.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/View_of_Empire_State_Building_from_Rockefeller_Center_New_York_City_dllu_%28cropped%29.jpg/2560px-View_of_Empire_State_Building_from_Rockefeller_Center_New_York_City_dllu_%28cropped%29.jpg',
    famousAttraction: 'Statue of Liberty',
    bestTimeToVisit: 'April to June',
    population: '8,398,748',
    area: '468.9 sq mi',
    timeZone: 'EST (UTC−5)'
  },
  {
    id: 4,
    name: 'London',
    description: 'The capital city of England and the United Kingdom.',
    image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/15/33/f5/de/london.jpg?w=2400&h=-1&s=1',
    famousAttraction: 'The British Museum',
    bestTimeToVisit: 'May to September',
    population: '8,982,000',
    area: '1,572 km²',
    timeZone: 'GMT (UTC+0)'
  },
  {
    id: 5,
    name: 'Tokyo',
    description: 'The capital city of Japan.',
    image: 'https://hips.hearstapps.com/hmg-prod/images/high-angle-view-of-tokyo-skyline-at-dusk-japan-royalty-free-image-1664309926.jpg?resize=2048:*',
    famousAttraction: 'Tokyo Tower',
    bestTimeToVisit: 'March to May',
    population: '9,273,000',
    area: '2,194 km²',
    timeZone: 'JST (UTC+9)'
  },
  {
    id: 6,
    name: 'Sydney',
    description: 'The largest city in Australia.',
    image: 'https://vamosfugir.net.br/wp-content/uploads/2017/05/Sydney-austr%C3%A1lia-p%C3%B4r-do-sol.jpg',
    famousAttraction: 'Sydney Opera House',
    bestTimeToVisit: 'December to February',
    population: '5,312,163',
    area: '12,367.7 km²',
    timeZone: 'AEDT (UTC+11)'
  },
  {
    id: 7,
    name: 'Paris',
    description: 'The capital city of France.',
    image: 'https://www.melhoresdestinos.com.br/wp-content/uploads/2019/02/passagens-aereas-paris-capa2019-02.jpg',
    famousAttraction: 'Eiffel Tower',
    bestTimeToVisit: 'June to August',
    population: '2,140,526',
    area: '105 km²',
    timeZone: 'CET (UTC+1)'
  }
];
  

app.get('/cities', (req, res) => {
  const cityList = cityData.map(city => ({ id: city.id, name: city.name }));
  res.json(cityList);
});

app.get('/city/:id', (req, res) => {
  const city = cityData.find(c => c.id === parseInt(req.params.id));
  if (city) {
    res.json(city);
  } else {
    res.status(404).send('City not found');
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
