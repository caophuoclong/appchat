import React from 'react';
import { Provider } from 'react-redux';
import { Chat } from './components/chatBoard';
import { store } from './store';
import "./app.css";
function App() {
  React.useEffect(()=>{
    const lang = window.localStorage.getItem("lang");
    if(!lang) window.localStorage.setItem("lang","vn");
  },[])
  return (
    <Provider store={store}>
      <Chat/>
    </Provider>
  );
}

export default App;
