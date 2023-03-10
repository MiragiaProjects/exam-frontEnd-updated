import Navigation from './Components/Navigation'
import { Routes, Route } from 'react-router-dom'
import './assets/scss/App.scss'
import ProductsPage from './Pages/ProductsPage'
import ProductPage from './Pages/ProductPage'
import FrontPage from './Pages/FrontPage'
import InfoPage from './Pages/InfoPage'


function App() {
  return (
    <div id="App">
      <Navigation />
      <Routes>
        <Route path="/" element={<FrontPage />} />
        <Route path="/products/:product_id" element={<ProductPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/info" element={<InfoPage />} />
      </Routes>
    </div>
  );
}

export default App;
