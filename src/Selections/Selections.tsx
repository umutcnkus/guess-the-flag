import {Alert, Row} from 'antd';
import * as countriesApi from 'i18n-iso-countries';
import {useEffect, useState} from 'react';
import {motion} from 'framer-motion';

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

    const getAnimation = (country: string, countries: string[]) => {
        const isTrue = countries[0] === country;
        const isAnswer = answer === country;

        if (answered && isAnswer && !isTrue) {
            // Shake animation for wrong answer
            return {
                x: [0, -10, 10, -10, 10, 0],
                transition: { duration: 0.5 }
            };
        } else if (answered && isTrue) {
            // Bounce animation for correct answer
            return {
                scale: [1, 1.05, 1],
                transition: { duration: 0.3 }
            };
        }
        return {};
    }

    return (
        <>
            <Row gutter={[0, 5]}>
                {
                    order.map((idx) => (
                        <motion.div
                            key={`${countries[idx]}-${order.join('-')}`}
                            style={{width: '100%'}}
                            animate={getAnimation(countries[idx], countries)}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 }}
                        >
                            <Alert
                                style={{width: '100%', cursor: 'pointer'}}
                                type={getType(countries[idx], countries)}
                                onClick={() => selectionMade(countries[idx], countries)}
                                message={countriesApi.getName(countries[idx], 'en')}
                            />
                        </motion.div>
                    ))
                }
            </Row>
        </>
    );
}

export default Selections;
