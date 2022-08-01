import {Col, Row, Space} from 'antd';
import React from 'react';
import './App.css';
import Flag from './Flag/Flag';
import Selections from './Selections/Selections';
import * as countries from 'i18n-iso-countries';

function getMultipleRandom(arr: string[], num: number) {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());

  return shuffled.slice(0, num);
}

function App() {
  countries.registerLocale(require("i18n-iso-countries/langs/en.json"));
  const countryObject = countries.getNames("en", {select: "official"});
  const countryNames = Object.keys(countryObject);

  const randomCountries = getMultipleRandom(countryNames, 4);
  return (
    <div className="App" style={{display: 'flex', gap: '1rem', flexDirection: 'column', margin: '1rem'}}>
      <Row justify="center" align="middle">
        <Col xs={{span: 20}} lg={{span: 10}}>
          <Flag countries={randomCountries}/>
        </Col>
        </Row>
        <Row justify="center" align="middle">
        <Col xs={{span: 20}} lg={{span: 10}}>
          <Selections countries={randomCountries}/>
        </Col>
      </Row>
    </div>
  );
}

export default App;
