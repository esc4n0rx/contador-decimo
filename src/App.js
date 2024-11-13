import React, { useState, useEffect } from 'react';
import moment from 'moment';
import Confetti from 'react-confetti';
import { useSpring, animated } from 'react-spring';
import './DecimoCountdown.css';

const DecimoCountdown = () => {
  const targetDate = moment('2024-11-21 05:00');
  const [timeLeft, setTimeLeft] = useState(targetDate.diff(moment()));
  const [showConfetti, setShowConfetti] = useState(false);
  const [message, setMessage] = useState('Faltam alguns dias, mas calma!');

  useEffect(() => {
    const interval = setInterval(() => {
      const now = moment();
      const diff = targetDate.diff(now);
      setTimeLeft(diff);

      if (diff <= 0) {
        setShowConfetti(true);
        setMessage('É HOJE! 🤑');
        clearInterval(interval);
      } else if (diff < 86400000) { // Menos de um dia
        setMessage('Aguenta aí! Faltam só algumas horas!');
      } else if (diff < 604800000) { // Menos de uma semana
        setMessage('Tá chegando! Faltam menos de uma semana!');
      } else {
        setMessage('Falta um tempinho, mas vai valer a pena!');
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  const messageAnimation = useSpring({
    opacity: 1,
    transform: 'translateY(0)',
    from: { opacity: 0, transform: 'translateY(10px)' },
    reset: true,
    config: { duration: 500 },
  });

  const formatTime = (milliseconds) => {
    const duration = moment.duration(milliseconds);
    return {
      days: String(duration.days()).padStart(2, '0'),
      hours: String(duration.hours()).padStart(2, '0'),
      minutes: String(duration.minutes()).padStart(2, '0'),
      seconds: String(duration.seconds()).padStart(2, '0'),
    };
  };

  const time = formatTime(timeLeft);

  return (
    <div className="countdown-container">
      <h1 className="title">🎉 Contagem Regressiva para o 13° 🎉</h1>
      <animated.div style={messageAnimation} className="message">
        {message}
      </animated.div>
      <div className="countdown">
        {['Dias', 'Horas', 'Minutos', 'Segundos'].map((unit, index) => (
          <div key={index} className="countdown-unit">
            <div className="countdown-number" data-value={time[unit]}>
              {time[unit]}
            </div>
            <span className="unit-label">{unit}</span>
          </div>
        ))}
      </div>
      {showConfetti && <Confetti />}
    </div>
  );
};

export default DecimoCountdown;
