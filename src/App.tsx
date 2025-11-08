import {ArrowRightOutlined, BulbOutlined, BulbFilled, TrophyOutlined, ClockCircleOutlined, ThunderboltOutlined} from '@ant-design/icons';
import {Button, Col, Row, ConfigProvider, theme, Space, Select, Tag, Progress, Statistic, Badge} from 'antd';
import * as countries from 'i18n-iso-countries';
import {useState, useEffect} from 'react';
import Confetti from 'react-confetti';
import {motion} from 'framer-motion';
import './App.css';
import Flag from './Flag/Flag';
import Selections from './Selections/Selections';
import Stats from './Stats/Stats';
import {loadStats, saveStats, loadTheme, saveTheme, GameStats} from './utils/storage';
import {
  DifficultyLevel,
  getDifficulty,
  saveDifficulty,
  filterCountriesByDifficulty,
  getDifficultyColor,
  getDifficultyLabel
} from './utils/difficulty';
import {GameMode, getGameMode, saveGameMode, GAME_MODES, calculateTimeBonus} from './utils/gameMode';
import {
  Achievement,
  AchievementProgress,
  loadAchievements,
  saveAchievements,
  checkAchievement,
  unlockAchievement,
  getUnlockedAchievements,
} from './utils/achievements';
import AchievementNotification from './components/AchievementNotification';
import AchievementsModal from './components/AchievementsModal';

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

  // Difficulty state
  const [difficulty, setDifficulty] = useState<DifficultyLevel>(getDifficulty());

  // Game mode state
  const [gameMode, setGameMode] = useState<GameMode>(getGameMode());
  const [timeRemaining, setTimeRemaining] = useState<number>(GAME_MODES[gameMode].timeLimit || 0);
  const [questionStartTime, setQuestionStartTime] = useState<number>(Date.now());
  const [totalScore, setTotalScore] = useState(0);

  const getCountries = (difficultyLevel?: DifficultyLevel) => {
    const countryObject = countries.getNames("en", {select: "official"});
    const allCountryNames = Object.keys(countryObject);
    const filteredCountries = filterCountriesByDifficulty(allCountryNames, difficultyLevel || difficulty);
    return getMultipleRandom(filteredCountries, 4);
  }

  const handleDifficultyChange = (newDifficulty: DifficultyLevel) => {
    setDifficulty(newDifficulty);
    saveDifficulty(newDifficulty);
    // Get new countries with the new difficulty
    const newCountries = getCountries(newDifficulty);
    setRandomCountries(newCountries);
    setOrder(getMultipleRandom([0, 1, 2, 3], 4));
  };

  const onNext = () => {
    setRandomCountries(getCountries());
    setOrder(getMultipleRandom([0, 1, 2, 3], 4));
    // Reset timer for timed modes
    const timeLimit = GAME_MODES[gameMode].timeLimit;
    if (timeLimit) {
      setTimeRemaining(timeLimit);
      setQuestionStartTime(Date.now());
    }
  }

  const handleGameModeChange = (newMode: GameMode) => {
    setGameMode(newMode);
    saveGameMode(newMode);
    const timeLimit = GAME_MODES[newMode].timeLimit;
    if (timeLimit) {
      setTimeRemaining(timeLimit);
      setQuestionStartTime(Date.now());
    }
  };

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

  // Confetti state
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  // Achievement state
  const [achievementProgress, setAchievementProgress] = useState<AchievementProgress>(loadAchievements());
  const [currentAchievement, setCurrentAchievement] = useState<Achievement | null>(null);
  const [showAchievementsModal, setShowAchievementsModal] = useState(false);

  const [randomCountries, setRandomCountries] = useState(getCountries());
  const [order, setOrder] = useState(getMultipleRandom([0, 1, 2, 3], 4));

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Timer countdown effect
  useEffect(() => {
    const timeLimit = GAME_MODES[gameMode].timeLimit;
    if (!timeLimit) return; // No timer for classic mode

    const interval = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 0) {
          // Time's up - automatically count as fail and move to next
          setFails((f) => f + 1);
          setCurrentStreak(0);
          onNext();
          return timeLimit;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [gameMode, order]); // Reset timer when question changes

  // Save stats to localStorage whenever they change
  useEffect(() => {
    saveStats({
      success,
      fails,
      currentStreak,
      bestStreak,
      gamesPlayed: success + fails,
      totalTime: 0,
      totalScore,
      bestTime: 0,
      averageTime: 0,
    });
  }, [success, fails, currentStreak, bestStreak, totalScore]);

  // Save achievements whenever they change
  useEffect(() => {
    saveAchievements(achievementProgress);
  }, [achievementProgress]);

  // Check for achievements
  const checkForAchievements = (newSuccess: number, newStreak: number, newBestStreak: number) => {
    const achievementsToCheck = [
      { id: 'first-steps', value: newSuccess },
      { id: 'perfect-3', value: newStreak },
      { id: 'perfect-5', value: newStreak },
      { id: 'perfect-10', value: newStreak },
      { id: 'perfect-25', value: newBestStreak },
      { id: 'perfect-50', value: newBestStreak },
      { id: 'beginner', value: newSuccess },
      { id: 'intermediate', value: newSuccess },
      { id: 'advanced', value: newSuccess },
      { id: 'master', value: newSuccess },
      { id: 'grandmaster', value: newSuccess },
      { id: 'legend', value: newSuccess },
    ];

    achievementsToCheck.forEach(({ id, value }) => {
      const achievement = checkAchievement(id, value, achievementProgress);
      if (achievement) {
        setCurrentAchievement(achievement);
        setAchievementProgress(unlockAchievement(id, achievementProgress));
        setTimeout(() => setCurrentAchievement(null), 5000);
      }
    });

    // Special achievements
    if (isDark && !achievementProgress['night-owl']?.unlocked) {
      const achievement = checkAchievement('night-owl', 1, achievementProgress);
      if (achievement) {
        setCurrentAchievement(achievement);
        setAchievementProgress(unlockAchievement('night-owl', achievementProgress));
        setTimeout(() => setCurrentAchievement(null), 5000);
      }
    }
  };

  const changeStats = (stat: number) => {
    switch (stat) {
      case -1:
        setFails(fails + 1);
        setCurrentStreak(0);
        break;
      case 1:
        const newSuccess = success + 1;
        setSuccess(newSuccess);
        const newStreak = currentStreak + 1;
        setCurrentStreak(newStreak);
        const newBestStreak = newStreak > bestStreak ? newStreak : bestStreak;
        if (newStreak > bestStreak) {
          setBestStreak(newBestStreak);
        }

        // Calculate time bonus for timed modes
        const config = GAME_MODES[gameMode];
        let scoreGained = 10; // Base score
        if (config.speedBonus && config.timeLimit) {
          const bonus = calculateTimeBonus(timeRemaining, config.timeLimit);
          scoreGained += bonus;
        }
        setTotalScore(totalScore + scoreGained);

        // Check for achievements
        checkForAchievements(newSuccess, newStreak, newBestStreak);

        // Show confetti for streaks of 3, 5, 10, and every 10 after that
        if (newStreak === 3 || newStreak === 5 || newStreak % 10 === 0) {
          setShowConfetti(true);
          setTimeout(() => setShowConfetti(false), 3000);
        }
        break;
    }
  }

  return (
    <ConfigProvider
      theme={{
        algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
      }}
    >
      {showConfetti && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={500}
          gravity={0.3}
        />
      )}
      <AchievementNotification
        achievement={currentAchievement}
        onClose={() => setCurrentAchievement(null)}
      />
      <AchievementsModal
        visible={showAchievementsModal}
        onClose={() => setShowAchievementsModal(false)}
        progress={achievementProgress}
        currentStats={{
          success,
          currentStreak,
          bestStreak,
        }}
      />
      <div className="App" style={{display: 'flex', gap: '1rem', flexDirection: 'column', margin: '1rem', minHeight: '100vh', backgroundColor: isDark ? '#141414' : '#ffffff'}}>
        <Row justify="center" align="middle">
          <Col xs={{span: 20}} md={{span: 10}} lg={{span: 6}}>
            <Space style={{width: '100%'}} direction="vertical">
              <Space.Compact style={{width: '100%'}}>
                <Button
                  icon={isDark ? <BulbFilled /> : <BulbOutlined />}
                  onClick={toggleTheme}
                  size="large"
                  style={{width: '50%'}}
                >
                  {isDark ? 'Light' : 'Dark'}
                </Button>
                <Badge count={getUnlockedAchievements(achievementProgress).length} showZero>
                  <Button
                    icon={<TrophyOutlined />}
                    onClick={() => setShowAchievementsModal(true)}
                    size="large"
                    style={{width: '100%'}}
                  >
                    Achievements
                  </Button>
                </Badge>
              </Space.Compact>
              <Select
                value={gameMode}
                onChange={handleGameModeChange}
                size="large"
                style={{width: '100%'}}
                suffixIcon={<ClockCircleOutlined />}
              >
                <Select.Option value="classic">
                  <ClockCircleOutlined /> Classic - No timer
                </Select.Option>
                <Select.Option value="timed">
                  <ClockCircleOutlined /> Timed - 15s per question
                </Select.Option>
                <Select.Option value="speed">
                  <ThunderboltOutlined /> Speed - 5s per question
                </Select.Option>
              </Select>
              <Select
                value={difficulty}
                onChange={handleDifficultyChange}
                size="large"
                style={{width: '100%'}}
                suffixIcon={<TrophyOutlined />}
              >
                <Select.Option value="easy">
                  <Tag color={getDifficultyColor('easy')}>Easy</Tag> 50 common flags
                </Select.Option>
                <Select.Option value="medium">
                  <Tag color={getDifficultyColor('medium')}>Medium</Tag> All countries
                </Select.Option>
                <Select.Option value="hard">
                  <Tag color={getDifficultyColor('hard')}>Hard</Tag> Challenging flags
                </Select.Option>
                <Select.Option value="expert">
                  <Tag color={getDifficultyColor('expert')}>Expert</Tag> Similar flags
                </Select.Option>
              </Select>
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
      {GAME_MODES[gameMode].timeLimit && (
        <Row justify="center" align="middle">
          <Col xs={{span: 20}} md={{span: 10}} lg={{span: 6}}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Space direction="vertical" style={{width: '100%'}}>
                <Progress
                  percent={(timeRemaining / GAME_MODES[gameMode].timeLimit!) * 100}
                  strokeColor={timeRemaining <= 3 ? '#ff4d4f' : timeRemaining <= 5 ? '#faad14' : '#52c41a'}
                  showInfo={false}
                />
                <Statistic
                  title="Time Remaining"
                  value={timeRemaining}
                  suffix="seconds"
                  valueStyle={{ fontSize: '2rem', color: timeRemaining <= 3 ? '#ff4d4f' : undefined }}
                />
                {GAME_MODES[gameMode].speedBonus && (
                  <Statistic
                    title="Total Score"
                    value={totalScore}
                    prefix={<ThunderboltOutlined />}
                    valueStyle={{ color: '#faad14' }}
                  />
                )}
              </Space>
            </motion.div>
          </Col>
        </Row>
      )}
      <Row justify="center" align="middle">
        <Col xs={{span: 20}} md={{span: 10}} lg={{span: 6}}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Stats countries={randomCountries} fails={fails} success={success} currentStreak={currentStreak} bestStreak={bestStreak}/>
          </motion.div>
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
