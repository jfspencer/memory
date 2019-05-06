import React, {FC} from 'react';
import { GameBoard } from './component/GameBoard'
import './App.css';

const App: FC = () => {
  return (
    <div className="App">
      <GameBoard />
    </div>
  );
}

export default App;
