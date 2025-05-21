import './App.css';
import PollManager from './components/PollManager';

const title = "Pole Manager";

const App = () =>  (
    <div className="App">
      <h1>{title}</h1>
      <PollManager />
    </div>
  );

export default App;
