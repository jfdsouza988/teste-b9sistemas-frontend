import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Header from './components/Header';
import Home from './pages/Home';
import Cart from './pages/Cart';
import { persistor, store } from './store';
import GlobalStyle from './styles/global';

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </Router>
        <ToastContainer autoClose={3000} />
        <GlobalStyle />
      </PersistGate>
    </Provider>
  );
}

export default App;
