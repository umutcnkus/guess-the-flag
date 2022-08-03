import {Card, Col, Row, Statistic} from 'antd';
import * as countriesApi from 'i18n-iso-countries';

interface StatsProps {
    countries: string[];
    success: number;
    fails: number;
}


function Selections({countries, success, fails}: StatsProps) {
    countriesApi.registerLocale(require("i18n-iso-countries/langs/en.json"));

    return (
        <>
            <Card style={{width: '100%'}}>
                <Row>
                    <Col span={12}>
                        <Statistic title="Success" value={success} />
                    </Col>
                    <Col span={12}>
                        <Statistic title="Failure" value={fails} />
                    </Col>
                </Row>
            </Card>
        </>
    );
}

export default Selections;
