import './App.css';
import Home from './home/home';
import SignIn from './signin/signin';
import Nav from './navbar/nav';

function App() {
  return (
    <div className="App">
      <Nav/>
      {/* <Home/> */}
      <SignIn/>
    </div>
  );
}

export default App;