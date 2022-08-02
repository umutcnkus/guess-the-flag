import {LikeOutlined} from '@ant-design/icons';
import {Card, Col, Row, Statistic} from 'antd';
import * as countriesApi from 'i18n-iso-countries';
import {useState} from 'react';

interface StatsProps {
    countries: string[];
}


function Selections({countries}: StatsProps) {
    countriesApi.registerLocale(require("i18n-iso-countries/langs/en.json"));
    const [success, setSuccess] = useState(0);
    const [fails, setFails] = useState(0);
    const [pass, setPass] = useState(0);
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
