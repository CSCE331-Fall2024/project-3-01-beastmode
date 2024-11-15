import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

// Import all pages
import { MenuMain } from './pages/menu';
import { KitchenMain } from './pages/kitchen';
import { ManagerMain,XReports,ZReports, RestockReports, Employees, Products, Inventory} from './pages/manager';
import { KioskMain, KioskLanding, OrderSelection, DrinkSelection, AppsAndMoreSelection } from './pages/kiosk';
import { PosMain } from './pages/pos';
import { AuthMain, SignUpPage, SignUpError, SignUpSuccess, SignInError } from './pages/auth';

// Cart Context API
import { CartProvider } from './pages/kiosk/components/CartContext';
import KioskOrderLayout from './pages/kiosk/KioskOrderLayout';

function App() {
  /* Reload the page when kiosk is clicked, so that google translate element will initialize*/
  /*Reset default language to English */
  const translateLoad = () =>{
    window.location.reload()
    document.cookie="googtrans=/en/en;"
  }
  return (
    <CartProvider>
      <Router>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <div className="container-fluid d-flex justify-content-center vh-100 pt-5">
                    <header className="App-header">
                      <nav><Link to="/menu">Menu Board</Link></nav>
                      <nav><Link to="/kitchen">Kitchen</Link></nav>
                      <nav><Link to="/manager">Manager</Link></nav>
                      <button onClick={translateLoad}>
                      <nav><Link to="/kiosk">Customer Kiosk</Link></nav>
                      </button>
                    
                    <nav><Link to="/pos">Cashier POS</Link></nav>
                      <nav><Link to="/auth">Login</Link></nav>
                    </header>
                  </div>
                </>
              }
            />
            <Route path="/menu" element={<MenuMain />} />

            <Route path="/kitchen" element={<KitchenMain />} />

          <Route path="/manager" element={<ManagerMain />} />
          <Route path="/manager/xreports" element={<XReports />} />
          <Route path="/manager/zreports" element={<ZReports />} />
          <Route path="/manager/restockreports" element={<RestockReports />} />
          <Route path="/manager/employees" element={<Employees />} />
          <Route path="/manager/products" element={<Products/>} />
          <Route path="/manager/inventory" element={<Inventory />} />
            <Route path="/manager" element={<ManagerMain />} />

          {/* ... other routes */}
          <Route path="/kiosk" element={<KioskLanding />} />
          <Route path="/kiosk/order/*" element={<KioskOrderLayout />}>
            <Route index element={<KioskMain />} />
            <Route path=":itemName" element={<OrderSelection />} />
            <Route path="drink" element={<DrinkSelection />} />
            <Route path="appetizers-&-more" element={<AppsAndMoreSelection />} />
          </Route>
          {/* ... other routes */}

            <Route path="/pos" element={<PosMain />} />

          <Route path="/auth" element={<AuthMain />} />
          <Route path="/auth/signup" element={<SignUpPage />}></Route>
          <Route path="/auth/signup/error" element={<SignUpError />}></Route>
          <Route path="/auth/signup/success" element={<SignUpSuccess />}></Route>
          <Route path="/auth/signin/error" element={<SignInError />}></Route>
        </Routes>
    </Router>
    </CartProvider>
  );
}

export default App;
