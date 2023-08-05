import Layout from '@/components/Layout';
import { useState } from 'react';

import axios from 'axios';
import { useRouter } from 'next/router';

export default function Login() {
  const router = useRouter();

  const [formValues, setFormValues] = useState({
    username: null,
    password: null,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://dummyjson.com/auth/login', {
        username: formValues.username,
        password: formValues.password,
      });
      if (response.status === 200) {
        localStorage.setItem('token', response.data.token);
        router.push('/products');
      }
    } catch (error) {
      console.log('response > ', error);
    }
  };

  return (
    <Layout>
      <form
        onSubmit={handleSubmit}
        className="mx-auto max-w-5xl min-h-screen w-full h-full flex justify-center items-center"
      >
        <div className="w-[50%] bg-slate-700 text-white rounded-lg p-6">
          <h1 className="font-bold text-2xl mb-6 block text-center">Login</h1>
          <label htmlFor="username" className="block mb-5">
            <span className="block mb-3">Username</span>
            <input
              type="text"
              className="bg-white p-3 w-full outline-none rounded-lg text-slate-700"
              name="username"
              id="username"
              onChange={(e) =>
                setFormValues({
                  username: e.target.value,
                  password: formValues.password,
                })
              }
              value={formValues?.username}
            />
          </label>
          <label htmlFor="password" className="block mb-5">
            <span className="block mb-3">Password</span>
            <input
              type="password"
              className="bg-white p-3 w-full outline-none rounded-lg text-slate-700"
              name="password"
              id="password"
              onChange={(e) =>
                setFormValues({
                  username: formValues.username,
                  password: e.target.value,
                })
              }
              value={formValues?.password}
            />
          </label>
          <button
            type="submit"
            className="block px-6 py-3 bg-emerald-600 hover:bg-emerald-700 rounded-lg w-full"
          >
            Go to my account
          </button>
        </div>
      </form>
    </Layout>
  );
}
