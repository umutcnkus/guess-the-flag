import {Modal, Card, Row, Col, Progress, Typography, Badge} from 'antd';
import {TrophyOutlined} from '@ant-design/icons';
import {ACHIEVEMENTS, AchievementProgress, getUnlockedAchievements} from '../utils/achievements';

const {Title, Text} = Typography;

interface AchievementsModalProps {
  visible: boolean;
  onClose: () => void;
  progress: AchievementProgress;
  currentStats: {
    success: number;
    currentStreak: number;
    bestStreak: number;
  };
}

function AchievementsModal({visible, onClose, progress, currentStats}: AchievementsModalProps) {
  const unlockedAchievements = getUnlockedAchievements(progress);
  const totalAchievements = ACHIEVEMENTS.length;
  const completionPercentage = Math.round((unlockedAchievements.length / totalAchievements) * 100);

  const getCategoryLabel = (category: string) => {
    const labels: Record<string, string> = {
      streak: 'Streak',
      accuracy: 'Accuracy',
      speed: 'Speed',
      mastery: 'Mastery',
      special: 'Special',
    };
    return labels[category] || category;
  };

  const getAchievementProgress = (achievement: any) => {
    const achievementProgress = progress[achievement.id];
    if (achievementProgress?.unlocked) return 100;

    // Calculate progress based on category
    switch (achievement.category) {
      case 'streak':
        return Math.min(100, (currentStats.bestStreak / achievement.requirement) * 100);
      case 'mastery':
        return Math.min(100, (currentStats.success / achievement.requirement) * 100);
      default:
        return 0;
    }
  };

  const groupedAchievements = ACHIEVEMENTS.reduce((acc, achievement) => {
    if (!acc[achievement.category]) {
      acc[achievement.category] = [];
    }
    acc[achievement.category].push(achievement);
    return acc;
  }, {} as Record<string, typeof ACHIEVEMENTS>);

  return (
    <Modal
      title={
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <TrophyOutlined style={{ fontSize: '24px' }} />
          <span>Achievements</span>
          <Badge count={`${unlockedAchievements.length}/${totalAchievements}`} />
        </div>
      }
      open={visible}
      onCancel={onClose}
      footer={null}
      width={800}
    >
      <div style={{ marginBottom: '20px' }}>
        <Text>Overall Progress</Text>
        <Progress percent={completionPercentage} status="active" />
      </div>

      {Object.entries(groupedAchievements).map(([category, achievements]) => (
        <div key={category} style={{ marginBottom: '24px' }}>
          <Title level={5}>{getCategoryLabel(category)}</Title>
          <Row gutter={[16, 16]}>
            {achievements.map((achievement) => {
              const isUnlocked = progress[achievement.id]?.unlocked;
              const progressPercent = getAchievementProgress(achievement);

              return (
                <Col xs={24} sm={12} md={8} key={achievement.id}>
                  <Card
                    size="small"
                    style={{
                      opacity: isUnlocked ? 1 : 0.6,
                      border: isUnlocked ? '2px solid #52c41a' : '1px solid #d9d9d9',
                    }}
                  >
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '3rem', marginBottom: '8px' }}>
                        {achievement.icon}
                      </div>
                      <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>
                        {achievement.title}
                      </div>
                      <div style={{ fontSize: '12px', color: '#8c8c8c', marginBottom: '8px' }}>
                        {achievement.description}
                      </div>
                      {!isUnlocked && (
                        <Progress
                          percent={progressPercent}
                          size="small"
                          showInfo={false}
                        />
                      )}
                      {isUnlocked && (
                        <div style={{ color: '#52c41a', fontWeight: 'bold' }}>
                          ✓ Unlocked
                        </div>
                      )}
                    </div>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </div>
      ))}
    </Modal>
  );
}

export default AchievementsModal;
