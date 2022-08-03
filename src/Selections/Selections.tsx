import {Alert, Row} from 'antd';
import * as countriesApi from 'i18n-iso-countries';
import {useEffect, useState} from 'react';

interface SelectionProps {
    countries: string[];
    order: number[];
    onSelect: (stat: number) => void
}

function Selections({countries, order, onSelect}: SelectionProps) {
    countriesApi.registerLocale(require("i18n-iso-countries/langs/en.json"));
    const [answered, setAnswered] = useState(false);
    const [answer, setAnswer] = useState('');


    useEffect(() => {
        setAnswered(false);
    }, [order]);

    const selectionMade = (selection: string, countries: string[]) => {
        if (!answered) {
            setAnswered(true);
            setAnswer(selection);
            onSelect(countries[0] === selection ? 1 : -1)
        }
    }

    const getType = (country: string, countries: string[]) => {
        const isTrue = countries[0] === country;
        const isAnswer = answer === country;
        return answered ? isTrue ? 'info' : isAnswer ? 'error' : 'success' : 'success'
    }

    return (
        <>
            <Row gutter={[0, 5]}>
                {
                    order.map((idx) => (
                        <Alert
                            style={{width: '100%'}}
                            type={getType(countries[idx], countries)}
                            onClick={() => selectionMade(countries[idx], countries)}
                            message={countriesApi.getName(countries[idx], 'en')}
                        />
                    ))
                }
            </Row>
        </>
    );
}

export default Selections;
