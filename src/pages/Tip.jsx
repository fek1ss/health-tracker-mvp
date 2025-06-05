import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import GOOGLE_SCRIPT_URL from '../config.js';

const Tip = () => {
  const [tip, setTip] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${GOOGLE_SCRIPT_URL}?sheet=Tips`)
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        throw new Error('Сервер вернул ошибку');
      })
      .then(data => {
        setTip(data.tip);
        setLoading(false);
      })
      .catch(err => {
        console.error('Ошибка при получении совета', err);
        setTip('Не удалось загрузить совет 😢');
        setLoading(false);
      });
  }, []);

  return (
    <div className="tip-day flex flex-col items-center justify-start min-h-screen m-10">
      <Link to="/day" className="text-blue-500 m">
        Day
      </Link>
      <h1 className="text-black text-2xl">Совет дня</h1>
      <div className="bg-green-400 w-200 h-40 rounded-lg flex flex-col items-center justify-center">
        <p className="text-lg text-gray-700">{loading ? 'Загрузка...' : tip}</p>
        ❤️( ◡‿◡ )
      </div>
    </div>
  );
};

export default Tip;
