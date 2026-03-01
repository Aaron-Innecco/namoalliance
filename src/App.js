import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import News from './pages/News';
import Members from './pages/Members';
import Join from './pages/Join';
import Contact from './pages/Contact';
import Discussion from './pages/Discussion';
import CouncilDiscussion from './pages/CouncilDiscussion';
import Admin from './pages/Admin';
import Account from './pages/Account';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/news" element={<News />} />
          <Route path="/members" element={<Members />} />
          <Route path="/join" element={<Join />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/discussion" element={<Discussion />} />
          <Route path="/council" element={<CouncilDiscussion />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/account" element={<Account />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
