// src/components/common/CircleTimer/CircleTimer.tsx
import React, { useEffect, useState, useCallback } from 'react';
import { Button, BUTTON_VARIANTS } from '../../Button/Button';
import { IoClose } from "react-icons/io5";
import styles from './CircleTimer.module.scss';

interface CircleTimerProps {
  onClose: () => void;
  duration?: number;
}

const CircleTimer: React.FC<CircleTimerProps> = ({ 
  onClose,
  duration = 30 
}) => {
  const [remainingTime, setRemainingTime] = useState(duration);
  const [angle, setAngle] = useState(360);
  const [isRunning, setIsRunning] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [animationFrameId, setAnimationFrameId] = useState<number | null>(null);

  const stopTimer = useCallback(() => {
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
    }
    setIsRunning(false);
    setStartTime(null);
  }, [animationFrameId]);

  const startTimer = useCallback(() => {
    setStartTime(Date.now());
    setIsRunning(true);
    setRemainingTime(duration);
    setAngle(360);
  }, [duration]);

  useEffect(() => {
    if (!isRunning || !startTime) return;

    const animate = () => {
      const currentTime = Date.now();
      const elapsed = currentTime - startTime;
      const remaining = Math.max(0, duration - elapsed / 1000);
      const currentAngle = (remaining / duration) * 360;

      setRemainingTime(remaining);
      setAngle(currentAngle);

      if (remaining > 0) {
        const id = requestAnimationFrame(animate);
        setAnimationFrameId(id);
      } else {
        stopTimer();
      }
    };

    const id = requestAnimationFrame(animate);
    setAnimationFrameId(id);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isRunning, startTime, duration, stopTimer]);

  const minutes = Math.floor(remainingTime / 60);
  const seconds = Math.floor(remainingTime % 60);

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>
          <IoClose size={24} />
        </button>

        <div className={styles.circleContainer}>
          <div 
            className={styles.semicircleLeft}
            style={{ 
              transform: `rotate(${Math.min(180, angle)}deg)`,
            }}
          />
          <div 
            className={styles.semicircleRight}
            style={{ 
              transform: `rotate(${Math.max(180, angle)}deg)`,
            }}
          />
          <div 
            className={styles.maskCircle}
            style={{ 
              display: angle <= 180 ? 'block' : 'none',
              transform: `rotate(${angle}deg)`
            }}
          />
          <div className={styles.innermostCircle}>
            <div className={styles.timerContainer}>
              <div className={styles.timer}>
                <div>{String(minutes).padStart(2, '0')}</div>
                <div className={styles.timerColon}>:</div>
                <div>{String(seconds).padStart(2, '0')}</div>
              </div>
            </div>
          </div>
        </div>
        
        {!isRunning && (
          <div className={styles.startButtonContainer}>
            <Button 
              variant={BUTTON_VARIANTS.START_TIMER}
              onClick={startTimer}
              ariaLabel="Запустити таймер"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CircleTimer;