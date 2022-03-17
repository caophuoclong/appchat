import React from 'react';
import { Provider } from 'react-redux';
import { Chat } from './components/chatBoard';
import { store } from './store';
import "./app.css";
function App() {
  return (
    <Provider store={store}>
      <Chat/>
    </Provider>
  );
}

export default App;
