import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GOOGLE_SCRIPT_URL from '../config.js';

const Login = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const [isLoading, setIsloading] = useState(false);

  const handleLogin = async e => {
    e.preventDefault();

    if (!name && !email) {
      alert('Заполните все поля');
      return;
    }

    setIsloading(true);

    const res = await fetch(GOOGLE_SCRIPT_URL);
    const rows = await res.json();
    const userExists = rows.find(row => row.email === email);

    if (userExists) {
      setIsloading(false);
      localStorage.setItem('username', name);
      localStorage.setItem('email', email);
      navigate('/day');
    } else {
      alert('Пользователь не найден 💔( ◡︵◡ )');
      setEmail('');
      setName('');
      setIsloading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-4 text-black">Login</h2>
        <input
          className="w-full p-2 border mb-4 border border-black rounded-lg text-black"
          type="text"
          placeholder="Ваше имя: "
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <input
          className="w-full p-2 border mb-4 border border-black rounded-lg text-black"
          type="email"
          placeholder="Почта: "
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <button type="submit" className="w-full bg-green-500 p-2 rounded-lg hover:bg-green-600 cursor-pointer">
          Login
        </button>
        {isLoading && <p className="text-black">Секунду... ❤️( ◡‿◡ )</p>}
        {}
      </form>
    </div>
  );
};

export default Login;
