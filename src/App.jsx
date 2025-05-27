import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Home from './home/home';
import SignIn from './signin/signin';
import Register from './signin/register';
import Reviews from './reviews/reviews';
import ShoppingDetails from "./shopping-details/ShoppingDetails";
import ShoppingReview from "./shopping-details/ShoppingReview";
import Nav from "./navbar/nav"

const App = () => (
  <Router>
    <Nav/>
    <AuthProvider>
      <Routes>
          <Route path="/" element={<Reviews />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/register" element={<Register />} />
          <Route path="/shopping/:id" element={<ShoppingDetails />} />
          <Route path="/shopping/avaliar/:id" element={<ShoppingReview />} />
          <Route path="/perfil" element={<SignIn />} />
          <Route path="/favoritos" element={<Home />} />
          <Route path="/busca" element={<Home />} />
      </Routes>
    </AuthProvider>
  </Router>
);

export default App;