import { useState } from 'react';
import { GOOGLE_SCRIPT_URL } from '../config';
import { Link } from 'react-router-dom';

const Day = () => {
  const username = localStorage.getItem('username');
  const [dailyData, setDailyData] = useState([]);
  const [userData, setUserData] = useState({
    calories: '',
    steps: '',
    sleep: '',
    mood: '',
  });

  const [message, setMessage] = useState({
    text: '',
    error: false,
  });

  const handleChangeData = e => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmitData = async e => {
    e.preventDefault();
    if (!username) {
      setMessage({
        text: 'Пользователь не найден. Повторите вход.',
        error: true,
      });
      return;
    }

    if (
      !userData.calories &&
      !userData.steps &&
      !userData.sleep &&
      !userData.mood
    ) {
      alert('Заполните все поля');
      return;
    }

    const formData = {
      name: username,
      calories: userData.calories,
      steps: userData.steps,
      sleep: userData.sleep,
      mood: userData.mood,
    };

    fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain',
      },
      body: JSON.stringify(formData),
    });

    setMessage({
      error: false,
      text: 'Данные сохранены',
    });

    setTimeout(() => {
      setMessage({
        error: false,
        text: '',
      });
    }, 1500);

    setUserData({
      calories: '',
      steps: '',
      sleep: '',
      mood: '',
    });
  };

  const ShowDailyData = e => {
    e.preventDefault();

    console.log(username);
    fetch(`${GOOGLE_SCRIPT_URL}?sheet=DailyData&name=${username}`)
      .then(res => res.json())
      .then(data => {
        setDailyData(data);
      });
    console.log(dailyData);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <p className="text-2xl text-black">Привет, {username}</p>
      <p className="text-black w-150 m-5 text-center bg-blue-200 rounded-lg p-2">
        Здесь ты можешь сохранить информацию о своем дне: сколько
        шагов ты прошёл, сколько часов спал, как себя чувствуешь и
        сколько калорий потребил. Эти данные помогут тебе отслеживать
        прогресс и заботиться о себе каждый день.
      </p>
      <form className="bg-white p-8 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-4 text-black">
          Мой день
        </h2>
        <Link to="/tip" className="text-blue-500 ">
          Посмотреть совет дня
        </Link>
        <input
          name="calories"
          type="number"
          placeholder="Калории"
          value={userData.calories}
          onChange={handleChangeData}
          className="w-full p-2 border mb-4 border-black rounded-lg text-black"
        />
        <input
          name="steps"
          type="number"
          placeholder="Шаги"
          value={userData.steps}
          onChange={handleChangeData}
          className="w-full p-2 border mb-4 border-black rounded-lg text-black"
        />
        <input
          name="sleep"
          type="number"
          step="1"
          placeholder="Сон (в часах)"
          value={userData.sleep}
          onChange={handleChangeData}
          className="w-full p-2 border mb-4 border-black rounded-lg text-black"
        />
        <select
          name="mood"
          value={userData.mood}
          onChange={handleChangeData}
          className="w-full p-2 border mb-4 border-black rounded-lg text-black"
        >
          <option value="">Настроение</option>
          <option value="Хорошее">Хорошее</option>
          <option value="Среднее">Среднее</option>
          <option value="Плохое">Плохое</option>
        </select>

        <button
          onClick={handleSubmitData}
          className="w-full bg-green-500 p-2 rounded-lg hover:bg-green-600 cursor-pointer text-white"
        >
          Сохранить
        </button>
        <button
          onClick={ShowDailyData}
          className="block mx-auto w-50 bg-green-500 m-5 p-2 rounded-lg hover:bg-green-600 cursor-pointer text-white"
        >
          Посмотреть все записи
        </button>
        <p
          className={`${message.error ? 'text-red-500' : 'text-green-500'} mt-4 text-center`}
        >
          {message.text}
        </p>
      </form>
      <p className="text-black">
        <div className="text-black mt-6">
          {dailyData && dailyData.length > 0 ? (
            dailyData.map((value, index) => (
              <div
                key={index}
                className="mb-2 p-2 border border-gray-300 rounded"
              >
                <p>Дата: {value.timestamp}</p>
                <p>Калории:{value.calories}</p>
                <p>Шаги: {value.steps}</p>
                <p>Сон:{value.sleep} ч</p>
                <p>Настроение: {value.mood}</p>
              </div>
            ))
          ) : (
            <p>Нет записей</p>
          )}
        </div>
      </p>
    </div>
  );
};

export default Day;
