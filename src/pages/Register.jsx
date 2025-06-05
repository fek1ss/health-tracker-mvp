import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import GOOGLE_SCRIPT_URL from '../config.js';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    weight: '',
    height: '',
    goal: '',
    email: '',
  });

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const res = await fetch(GOOGLE_SCRIPT_URL);
    const rows = await res.json();

    const userExists = rows.find(row => row.email === formData.email);
    console.log(userExists);
    if (userExists) {
      alert('Пользователь с такой почтой уже зарегистрирован ❤️( ◡‿◡ )');
    } else {
      fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain',
        },
        body: JSON.stringify(formData),
      });
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-sm">
        <h2 className="text-xl font-bold mb-4 text-black">Регистрация</h2>
        <input
          name="name"
          placeholder="Имя"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border mb-4 border border-black rounded-lg text-black"
          required
        />
        <input
          name="age"
          type="number"
          placeholder="Возраст"
          value={formData.age}
          onChange={handleChange}
          className="w-full p-2 border mb-4 border border-black rounded-lg text-black"
          required
        />
        <input
          name="weight"
          type="number"
          placeholder="Вес"
          value={formData.weight}
          onChange={handleChange}
          className="w-full p-2 border mb-4 border border-black rounded-lg text-black"
          required
        />
        <input
          name="height"
          type="number"
          placeholder="Рост"
          value={formData.height}
          onChange={handleChange}
          className="w-full p-2 border mb-4 border border-black rounded-lg text-black"
          required
        />
        <input
          name="goal"
          placeholder="Цель"
          value={formData.goal}
          onChange={handleChange}
          className="w-full p-2 border mb-4 border border-black rounded-lg text-black"
          required
        />
        <input
          name="email"
          placeholder="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 border mb-4 border border-black rounded-lg text-black"
          required
        />
        <button type="submit" className="w-full bg-green-500 p-2 rounded-lg hover:bg-green-600 cursor-pointer">
          Зарегистрироваться
        </button>
        <Link to="/login" className="text-green-500">
          Login
        </Link>
      </form>
    </div>
  );
};

export default Register;
