
import React, { useEffect, useState } from 'react';

export const SeasonalEffects: React.FC = () => {
  const [isDecember, setIsDecember] = useState(false);
  const [isNewYear, setIsNewYear] = useState(false);

  useEffect(() => {
    const checkDate = () => {
      const now = new Date();
      const month = now.getMonth(); // 0-indexed, 11 = Dec
      const day = now.getDate();
      
      setIsDecember(month === 11);
      setIsNewYear((month === 11 && day === 31) || (month === 0 && day === 1));
    };

    checkDate();
    const timer = setInterval(checkDate, 60000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!isDecember) return;

    const createSnowflake = () => {
      const snowflake = document.createElement('div');
      snowflake.classList.add('snow-particle');
      
      const size = Math.random() * 5 + 2 + 'px';
      snowflake.style.width = size;
      snowflake.style.height = size;
      snowflake.style.left = Math.random() * 100 + 'vw';
      snowflake.style.opacity = (Math.random() * 0.7 + 0.3).toString();
      snowflake.style.animationDuration = Math.random() * 3 + 2 + 's';
      
      document.body.appendChild(snowflake);
      
      setTimeout(() => {
        snowflake.remove();
      }, 5000);
    };

    const interval = setInterval(createSnowflake, 150);
    return () => clearInterval(interval);
  }, [isDecember]);

  useEffect(() => {
    if (!isNewYear) return;

    const createFirework = () => {
      const firework = document.createElement('div');
      firework.classList.add('firework');
      firework.style.left = Math.random() * 100 + 'vw';
      firework.style.top = Math.random() * 100 + 'vh';
      firework.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 70%)`;
      
      document.body.appendChild(firework);
      setTimeout(() => firework.remove(), 1000);
    };

    const interval = setInterval(createFirework, 500);
    return () => clearInterval(interval);
  }, [isNewYear]);

  return null;
};
