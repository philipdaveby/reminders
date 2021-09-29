import React from 'react';
import Home from './components/Home/Home';
import NavBar from './components/NavBar/NavBar';

const App: React.FC = () => {
  return (
    <div className="flex w-full flex-col">
      <NavBar />
      <Home />
    </div>
  );
}

export default App;
