import { useRef, useState } from 'react';

const useCountdown = () => {
  const timer = useRef(null);

  const [countDown, setCountDown] = useState(0);

  const updateCountdown = setCountDown;

  const startCountdown: any = () => {
    const interval = setInterval(() => {
      setCountDown((previousState: number) => { 
        return previousState + 1
      });
    }, 1000);

    timer.current = interval;
  }

  const stopCountdown: any = () => {
    clearInterval(timer.current);
  }

  return [...getReturnValues(countDown), startCountdown, stopCountdown, updateCountdown];
};

const getReturnValues = (countDown) => {
  const hours = Math.floor((countDown / 60) / 60);
  const minutes = Math.floor(countDown / 60) % 60;
  const seconds = countDown % 60;

  return [hours, minutes, seconds];
};

export { useCountdown };