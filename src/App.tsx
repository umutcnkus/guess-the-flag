import {ArrowRightOutlined} from '@ant-design/icons';
import {Col, PageHeader, Row} from 'antd';
import * as countries from 'i18n-iso-countries';
import {useState} from 'react';
import './App.css';
import Flag from './Flag/Flag';
import Selections from './Selections/Selections';
import Stats from './Stats/Stats';

function getMultipleRandom(arr: any[], num: number) {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());

  return shuffled.slice(0, num);
}

function shuffle(array: any) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex !== 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

function App() {
  countries.registerLocale(require("i18n-iso-countries/langs/en.json"));

  const getCountries = () => {
    const countryObject = countries.getNames("en", {select: "official"});
    const countryNames = Object.keys(countryObject);
    return getMultipleRandom(countryNames, 4);
  }

  const onNext = () => {
    setRandomCountries(getCountries());
    setOrder(getMultipleRandom([0,1,2,3], 4));
  }
  
  const [randomCountries, setRandomCountries] = useState(getCountries());
  const [order, setOrder] = useState(getMultipleRandom([0,1,2,3], 4));

  return (
    <div className="App" style={{display: 'flex', gap: '1rem', flexDirection: 'column', margin: '1rem'}}>
      <Row justify="center" align="middle">
        <Col xs={{span: 20}} lg={{span: 10}}>
          <PageHeader
            className="site-page-header"
            onBack={() => onNext()}
            title="Next"
            backIcon={<ArrowRightOutlined />}
          />
        </Col>
      </Row>
      <Row justify="center" align="middle">
        <Col xs={{span: 20}} lg={{span: 10}}>
          <Flag countries={randomCountries} order={order}/>
        </Col>
      </Row>
      <Row justify="center" align="middle">
        <Col xs={{span: 20}} lg={{span: 10}}>
          <Stats countries={randomCountries} />
        </Col>
      </Row>
      <Row justify="center" align="middle">
        <Col xs={{span: 20}} lg={{span: 10}}>
          <Selections countries={randomCountries} order={order} />
        </Col>
      </Row>
    </div>
  );
}

export default App;
