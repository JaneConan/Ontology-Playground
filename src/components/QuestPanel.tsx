import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useAppStore } from '../store/appStore';
import { Trophy, Star, X, CheckCircle, Lightbulb, Target } from 'lucide-react';
import { localizeQuest, localizeDifficulty } from '../data/questTranslations';

export function QuestPanel() {
  const { t, i18n } = useTranslation();
  const {
    availableQuests,
    activeQuest,
    currentStepIndex,
    completedQuests,
    earnedBadges,
    totalPoints,
    startQuest,
    abandonQuest,
    currentOntology
  } = useAppStore();

  return (
    <div className="quest-panel">
      <div className="panel-header">
          <h3 className="panel-title">
            <Target size={16} style={{ marginRight: 8 }} />
            {t('quest.title')}
          </h3>
      </div>

      {/* Active Quest Display */}
      <AnimatePresence>
        {activeQuest && (() => {
          const lq = localizeQuest(activeQuest, i18n.language, currentOntology);
          return (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="active-quest-panel"
          >
            <div className="active-quest-title">
              <Target size={18} />
              {lq.title}
            </div>

            <div className="quest-progress">
              <div className="progress-bar">
                <motion.div
                  className="progress-fill"
                  initial={{ width: 0 }}
                  animate={{ width: `${((currentStepIndex + 1) / lq.steps.length) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              <span className="progress-text">
                {currentStepIndex + 1} / {lq.steps.length}
              </span>
            </div>

            <motion.div
              key={currentStepIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="current-step"
            >
              <div className="step-instruction">
                {lq.steps[currentStepIndex].instruction}
              </div>
              {lq.steps[currentStepIndex].hint && (
                <div className="step-hint">
                  <Lightbulb size={12} style={{ marginRight: 4 }} />
                  {lq.steps[currentStepIndex].hint}
                </div>
              )}
            </motion.div>

            <div className="quest-actions">
              <button className="btn btn-secondary" onClick={abandonQuest}>
                <X size={16} />
                {t('quest.abandon')}
              </button>
            </div>
          </motion.div>
        ); })()}
      </AnimatePresence>

      {/* Quest List */}
      <div className="quest-list">
        {availableQuests.map(quest => {
          const isCompleted = completedQuests.includes(quest.id);
          const isActive = activeQuest?.id === quest.id;
          const lq = localizeQuest(quest, i18n.language, currentOntology);

          return (
            <motion.div
              key={quest.id}
              className={`quest-card ${isCompleted ? 'completed' : ''} ${isActive ? 'active' : ''}`}
              onClick={() => !isCompleted && !isActive && startQuest(quest.id)}
              whileHover={{ scale: isCompleted || isActive ? 1 : 1.02 }}
              whileTap={{ scale: isCompleted || isActive ? 1 : 0.98 }}
            >
              <div className="quest-header">
                <span className="quest-title">
                  {isCompleted && <CheckCircle size={16} style={{ marginRight: 6, color: 'var(--ms-green)' }} />}
                  {lq.title}
                </span>
                <span className={`quest-badge ${quest.difficulty}`}>
                  {localizeDifficulty(quest.difficulty, i18n.language)}
                </span>
              </div>
              <p className="quest-description">{lq.description}</p>
              <div className="quest-reward">
                <Trophy size={14} />
                <span>{quest.reward.badgeIcon} {lq.reward.badge}</span>
                <span className="quest-points">+{quest.reward.points} {t('quest.pts')}</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Badges Panel */}
      {earnedBadges.length > 0 && (
        <div className="badges-panel">
          <div className="section-title">
            <Star size={14} />
            {t('quest.earnedBadges', { count: earnedBadges.length })}
          </div>
          <div className="badges-grid">
            {earnedBadges.map((badge, index) => (
              <motion.div
                key={index}
                className="badge-item"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <span>{badge.icon}</span>
                <span>{badge.badge}</span>
              </motion.div>
            ))}
          </div>
          <div style={{ marginTop: 8, fontSize: 12, color: 'var(--ms-yellow)', fontWeight: 600 }}>
            {t('quest.totalPoints', { points: totalPoints })}
          </div>
        </div>
      )}
    </div>
  );
}
