import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage } from '@pages/';
import NotFound from './pages/NotFound';
import { checkEnvironmentVariables } from './utils/envCheck';
import './App.css';

function App() {
  useEffect(() => {
    // 개발 환경에서만 환경변수 확인
    if (import.meta.env.DEV) {
      checkEnvironmentVariables();
    }
  }, []);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
