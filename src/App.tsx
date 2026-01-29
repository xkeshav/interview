import { useState } from 'react';
// import { PostList } from "./PostList";
import "./styles.css";

const App = () => {

  const [count, setCount] = useState(0);

  const doClick = () => {
    setCount(count+1);
    setCount(count+1);
    setCount(count+1);
  }

   const doClickF = () => {
     setCount(c => c + 1);
     setCount(c =>c + 1);
     setCount(c => c + 1);
   };
  
  return (
    <div className="box">
      <p>Count: {count}</p>
      <button className="button is-primary" onClick={doClick}>
        click
      </button>
      <button className="button is-secondary" onClick={doClickF}>
        clickF
      </button>
      {/* <PostList /> */}

      <form className="box">
        <div className="field">
          <label className="label">Email</label>
          <div className="control">
            <input className="input" type="email" placeholder="e.g. alex@example.com" />
          </div>
        </div>

        <div className="field">
          <label className="label">Password</label>
          <div className="control">
            <input className="input" type="password" placeholder="********" />
          </div>
        </div>

        <button className="button is-primary">Sign in</button>
      </form>
    </div>
  );
}

export default App;