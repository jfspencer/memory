import React, {FC} from 'react';
import { GameBoard } from './component/GameBoard'
import { Provider } from 'react-redux'
import { store } from './state'
import './App.css';

const App: FC = () => {
  return (
    <div className="App">
      <Provider store={store}>
        <GameBoard />
      </Provider>
    </div>
  );
}

export default App;
