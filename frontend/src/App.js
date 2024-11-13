import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import api from './services/api';

// Import all pages
import { MainMenu } from './pages/menu';
import { KitchenMain } from './pages/kitchen';
import { ManagerMain } from './pages/manager';
import { KioskMain } from './pages/kiosk';
import { PosMain } from './pages/pos';
import { AuthMain } from './pages/auth';

function App() {
  const [array, setArray] = useState([]);

  // Fetch API data
  const fetchAPI = async () => {
    const response = await api.get("/api/users"); 
    setArray(response.data.users);
  };

  useEffect(() => {
    fetchAPI();
  }, []);

  return (
    <Router>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <header className="App-header">
                  <nav>
                    <Link to="/">Home</Link>
                  </nav>
                  <nav>
                    <Link to="/menu">Menu Board</Link> - <Link to="/kitchen">Kitchen</Link> - <Link to="/manager">Manager</Link>
                  </nav>
                  <nav>
                    <Link to="/kiosk">Customer Kiosk</Link> - <Link to="/pos">Cashier POS</Link> - <Link to="/auth">Login</Link>
                  </nav>
                </header>
                <div>
                  <p>{array.join(", ")}</p>
                </div>
              </>
            }
          />
          <Route path="/menu" element={<MainMenu />} />
          <Route path="/kitchen" element={<KitchenMain />} />
          <Route path="/manager" element={<ManagerMain />} />
          <Route path="/kiosk" element={<KioskMain />} />
          <Route path="/pos" element={<PosMain />} />
          <Route path="/auth" element={<AuthMain />} />
        </Routes>
    </Router>
  );
}

export default App;
