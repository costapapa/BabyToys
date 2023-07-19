import { useState } from 'react'
import SignUpForm from '../../components/SignUpForm/SignUpForm'
import LoginForm from '../../components/LogInForm/LogInForm'
import Logo from '../../components/Logo/Logo'
import './AuthPage.css'

function AuthPage({ setUser, }) {
  const [showLogin, setShowLogin] = useState(true)

  return (
    <main className="AuthPage">
      <div>
      <Logo />
      </div>
      {showLogin ? <LoginForm setUser={setUser} /> : <SignUpForm setUser={setUser} />}
      <button onClick={() => setShowLogin(!showLogin)}>{showLogin ? 'SIGN UP' : 'LOG IN'}</button>
    </main>
  );
}

export default AuthPage