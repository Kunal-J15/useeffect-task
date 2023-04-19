import React, {useContext} from 'react';
import AuthContext from './store/auth-context';
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';

function App() {
  const ctx = useContext(AuthContext);

  return (
    <>
    <MainHeader />
    <main>
        {!ctx.isLoggedIn && <Login onLogin={ctx.login} />}
        {ctx.isLoggedIn && <Home onLogout={ctx.logout} />}
    </main>
    </>

  );
}

export default App;
