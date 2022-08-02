import {Alert, Button, Image, Row} from 'antd';
import {CloseOutlined, CheckOutlined} from '@ant-design/icons';
import {useState} from 'react';
import * as countriesApi from 'i18n-iso-countries';

interface SelectionProps {
    countries: string[];
    order: number[];
}

function Selections({countries, order}: SelectionProps) {
    countriesApi.registerLocale(require("i18n-iso-countries/langs/en.json"));
    const [answered, setAnswered] = useState(false);
    const [answer, setAnswer] = useState('');

    const selectionMade = (selection: string, countries: string[]) => {
        setAnswered(true);
        setAnswer(selection);
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
