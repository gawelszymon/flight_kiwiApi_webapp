import { useState, useEffect } from 'react'
import './App.css'

function App() {

  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('/api/admin/')
      .then((response) => response.json())
      .then((data) => setMessage(data.message))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <h1>Type Analizer</h1>
      <p>Message from Django: {message}</p>
    </div>
  )
}

export default App;
