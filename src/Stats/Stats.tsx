import {LikeOutlined} from '@ant-design/icons';
import {Card, Col, Row, Statistic} from 'antd';
import * as countriesApi from 'i18n-iso-countries';
import {useState} from 'react';

interface StatsProps {
    countries: string[];
    success: number;
    pass: number;
    fails: number;
}


function Selections({countries, success, pass, fails}: StatsProps) {
    countriesApi.registerLocale(require("i18n-iso-countries/langs/en.json"));

    return (
        <>
            <Card style={{width: '100%'}}>
                <Row>
                    <Col span={8}>
                        <Statistic title="Success" value={success}/>
                    </Col>
                    <Col span={8}>
                        <Statistic title="Failure" value={fails}/>
                    </Col>
                    <Col span={8}>
                        <Statistic title="Pass" value={pass}/>
                    </Col>
                </Row>
            </Card>
        </>
    );
}

export default Selections;
