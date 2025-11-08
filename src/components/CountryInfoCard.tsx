import {Card, Descriptions, Typography} from 'antd';
import {GlobalOutlined, EnvironmentOutlined, TeamOutlined, ExpandOutlined, CommentOutlined} from '@ant-design/icons';
import {motion} from 'framer-motion';
import {CountryInfo} from '../utils/countryData';

const {Title, Paragraph} = Typography;

interface CountryInfoCardProps {
  countryInfo: CountryInfo | null;
  countryCode: string;
}

function CountryInfoCard({countryInfo, countryCode}: CountryInfoCardProps) {
  if (!countryInfo) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      transition={{ duration: 0.4, type: "spring" }}
    >
      <Card
        style={{
          marginTop: '1rem',
          border: '2px solid #1890ff',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
          <img
            src={`https://flagcdn.com/48x36/${countryCode.toLowerCase()}.png`}
            alt={countryInfo.name}
            style={{ borderRadius: '4px' }}
          />
          <Title level={4} style={{ margin: 0 }}>
            Learn About {countryInfo.name}
          </Title>
        </div>

        <Descriptions column={1} size="small" bordered>
          <Descriptions.Item label={<><EnvironmentOutlined /> Capital</>}>
            {countryInfo.capital}
          </Descriptions.Item>
          <Descriptions.Item label={<><GlobalOutlined /> Region</>}>
            {countryInfo.region} ({countryInfo.subregion})
          </Descriptions.Item>
          <Descriptions.Item label={<><TeamOutlined /> Population</>}>
            {countryInfo.population}
          </Descriptions.Item>
          <Descriptions.Item label={<><ExpandOutlined /> Area</>}>
            {countryInfo.area}
          </Descriptions.Item>
          <Descriptions.Item label="Languages">
            {countryInfo.languages}
          </Descriptions.Item>
          <Descriptions.Item label="Currency">
            {countryInfo.currencies}
          </Descriptions.Item>
        </Descriptions>

        <div style={{ marginTop: '16px', padding: '12px', backgroundColor: '#f0f5ff', borderRadius: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <CommentOutlined style={{ color: '#1890ff' }} />
            <strong>Fun Fact</strong>
          </div>
          <Paragraph style={{ margin: 0 }}>
            {countryInfo.funFact}
          </Paragraph>
        </div>
      </Card>
    </motion.div>
  );
}

export default CountryInfoCard;
