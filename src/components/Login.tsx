import axios from 'axios';
import React, { useState } from 'react';

type Props = {
  setToken: any
}

async function loginUser(credentials: any) {
  const headers = { 'Content-Type': 'application/json' }
  return axios.post(
    'http://localhost:5000/login.php', { credentials }, { headers: headers }
  ).then((response: any) => {
    console.log(response['data']);
    if (response.data['token']) {
      return response.data
    }
  }).catch(() => {
    console.log('feeehler')
  })

}

export default function Login(props: Props) {
  const [username, setUserName] = useState<string>()
  const [password, setPassword] = useState<string>()
  const [error, setError] = useState<string>()

  const handleSubmit = async function (e: any) {
    e.preventDefault();

    const credentials = {
      username,
      password
    };
    try {
      const token = await loginUser(credentials)
      props.setToken(token)
    } catch (error) {
      setError('Login Fehlgeschlagen')
      props.setToken(null)
    }

  }

  return (
    <> {error}
      <form onSubmit={handleSubmit}>
        <label>
          <p>Benutzername</p>
          <input type="text" onChange={e => setUserName(e.target.value)} />
        </label>
        <label>
          <p>Passwort</p>
          <input type="password" onChange={e => setPassword(e.target.value)} />
        </label>
        <div>
          <button type="submit">Login</button>
        </div>
      </form>
    </>
  )
}
