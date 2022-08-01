import {Alert, Button, Image, Row} from 'antd';
import {useState} from 'react';
import * as countriesApi from 'i18n-iso-countries';

interface SelectionProps {
    countries: string[];
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

function selectionMade(selection: string) {
    alert(selection);
}

function Selections({countries}: SelectionProps) {
    countriesApi.registerLocale(require("i18n-iso-countries/langs/en.json"));
    const [visible, setVisible] = useState(false);
    return (
        <>
        <Row gutter={[0, 5]}>
            {
                shuffle(countries.map((country) => <Button onClick={() => selectionMade(country)} block>{ countriesApi.getName(country, 'en') }</Button>))
            }
        </Row>
        </>
    );
}

export default Selections;
