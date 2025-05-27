import './App.css';
import Home from './home/home';
import SignIn from './signin/signin';
import Nav from './navbar/nav';
import Reviews from './reviews/reviews';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Nav/>
        {/* <Home/> */}
        {/* <SignIn/> */}
        <Reviews/>
      </div>
    </AuthProvider>
  );
}

export default App;