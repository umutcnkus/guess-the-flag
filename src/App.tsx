import {ArrowRightOutlined, BulbOutlined, BulbFilled} from '@ant-design/icons';
import {Button, Col, Row, ConfigProvider, theme, Space} from 'antd';
import * as countries from 'i18n-iso-countries';
import {useState, useEffect} from 'react';
import './App.css';
import Flag from './Flag/Flag';
import Selections from './Selections/Selections';
import Stats from './Stats/Stats';
import {loadStats, saveStats, loadTheme, saveTheme} from './utils/storage';

function getMultipleRandom(arr: any[], num: number) {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());

  return shuffled.slice(0, num);
}

function shuffle(array: any) {
  let currentIndex = array.length, randomIndex;

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

function App() {
  countries.registerLocale(require("i18n-iso-countries/langs/en.json"));

  // Dark mode state
  const [isDark, setIsDark] = useState(loadTheme());

  const getCountries = () => {
    const countryObject = countries.getNames("en", {select: "official"});
    const countryNames = Object.keys(countryObject);
    return getMultipleRandom(countryNames, 4);
  }

  const onNext = () => {
    setRandomCountries(getCountries());
    setOrder(getMultipleRandom([0, 1, 2, 3], 4));
  }

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    saveTheme(newTheme);
  };

  // Load stats from localStorage on mount
  const initialStats = loadStats();
  const [success, setSuccess] = useState(initialStats.success);
  const [fails, setFails] = useState(initialStats.fails);
  const [currentStreak, setCurrentStreak] = useState(initialStats.currentStreak);
  const [bestStreak, setBestStreak] = useState(initialStats.bestStreak);

  // Save stats to localStorage whenever they change
  useEffect(() => {
    saveStats({
      success,
      fails,
      currentStreak,
      bestStreak,
      gamesPlayed: success + fails,
      totalTime: 0,
    });
  }, [success, fails, currentStreak, bestStreak]);

  const changeStats = (stat: number) => {
    switch (stat) {
      case -1:
        setFails(fails + 1);
        setCurrentStreak(0);
        break;
      case 1:
        setSuccess(success + 1);
        const newStreak = currentStreak + 1;
        setCurrentStreak(newStreak);
        if (newStreak > bestStreak) {
          setBestStreak(newStreak);
        }
        break;
    }
  }

  const [randomCountries, setRandomCountries] = useState(getCountries());
  const [order, setOrder] = useState(getMultipleRandom([0, 1, 2, 3], 4));

  return (
    <ConfigProvider
      theme={{
        algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
      }}
    >
      <div className="App" style={{display: 'flex', gap: '1rem', flexDirection: 'column', margin: '1rem', minHeight: '100vh', backgroundColor: isDark ? '#141414' : '#ffffff'}}>
        <Row justify="center" align="middle">
          <Col xs={{span: 20}} md={{span: 10}} lg={{span: 6}}>
            <Space style={{width: '100%'}} direction="vertical">
              <Button
                icon={isDark ? <BulbFilled /> : <BulbOutlined />}
                onClick={toggleTheme}
                size="large"
                style={{width: '100%'}}
              >
                {isDark ? 'Light Mode' : 'Dark Mode'}
              </Button>
              <Button
                type="primary"
                icon={<ArrowRightOutlined />}
                onClick={() => onNext()}
                size="large"
                style={{width: '100%'}}
              >
                Next
              </Button>
            </Space>
          </Col>
        </Row>
      <Row justify="center" align="middle">
        <Col xs={{span: 20}} md={{span: 10}} lg={{span: 6}}>
          <Flag countries={randomCountries} order={order} />
        </Col>
      </Row>
      <Row justify="center" align="middle">
        <Col xs={{span: 20}} md={{span: 10}} lg={{span: 6}}>
          <Stats countries={randomCountries} fails={fails} success={success} currentStreak={currentStreak} bestStreak={bestStreak}/>
        </Col>
      </Row>
      <Row justify="center" align="middle">
        <Col xs={{span: 20}} md={{span: 10}} lg={{span: 6}}>
          <Selections countries={randomCountries} order={order} onSelect={changeStats} />
        </Col>
      </Row>
      </div>
    </ConfigProvider>
  );
}

export default App;
