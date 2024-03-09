import './App.css';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Header/Navbar';
import AnalysisPage from './components/Analysis/AnalysisPage';
import Products from './components/Products/Products';
import ProductDetails from './components/Products/ProductDetails';
import NewOrder from './components/OrderSystem/NewOrder';
import OrderDetails from './components/OrderSystem/OrderDetails';
import CheckedOrders from './components/OrderSystem/CheckedOrders';
import CheckedOrdersDetails from './components/OrderSystem/CheckedOrdersDetails';
import DoneOrders from './components/OrderSystem/DoneOrders';
import DoneOrdersDetails from './components/OrderSystem/DoneOrdersDetails';
import RejectedOrders from './components/OrderSystem/RejectedOrders';
import RejectedOrdersDetails from './components/OrderSystem/RejectedOrdersDetails';
import AddFilter from './components/Filter/AddFilter';
function App() {
  return (
    <div className='App'>

      <Navbar />
      <Routes>
        <Route path="/" element={<AnalysisPage />} />
        <Route path="/product" element={<Products />} />
        <Route path="/order/new" element={<NewOrder />} />
        <Route path="/order/checked" element={<CheckedOrders />} />
        <Route path="/order/done" element={<DoneOrders />} />
        <Route path="/order/rejected" element={<RejectedOrders />} />
        <Route path="/filter" element={<AddFilter />} />
      </Routes>
    </div>
  );
}

export default App;
