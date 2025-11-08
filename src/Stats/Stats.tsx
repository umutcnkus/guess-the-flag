import {Card, Col, Row, Statistic} from 'antd';
import * as countriesApi from 'i18n-iso-countries';

interface StatsProps {
    countries: string[];
    success: number;
    fails: number;
    currentStreak?: number;
    bestStreak?: number;
}


function Selections({countries, success, fails, currentStreak = 0, bestStreak = 0}: StatsProps) {
    countriesApi.registerLocale(require("i18n-iso-countries/langs/en.json"));

    return (
        <>
            <Card style={{width: '100%'}}>
                <Row gutter={[8, 8]}>
                    <Col span={12}>
                        <Statistic title="Success" value={success} valueStyle={{ color: '#3f8600' }} />
                    </Col>
                    <Col span={12}>
                        <Statistic title="Failure" value={fails} valueStyle={{ color: '#cf1322' }} />
                    </Col>
                    <Col span={12}>
                        <Statistic title="Current Streak" value={currentStreak} prefix="🔥" valueStyle={{ color: '#faad14' }} />
                    </Col>
                    <Col span={12}>
                        <Statistic title="Best Streak" value={bestStreak} prefix="🏆" valueStyle={{ color: '#722ed1' }} />
                    </Col>
                </Row>
            </Card>
        </>
    );
}

export default Selections;
