import { BlockList } from './BlockList';
import {PostList} from "./PostList";
import "./styles.css";

export default function App() {
  return (
    <div className="App">
      <main>
        <section> Box Color ( using useRef and incremental )</section>
        <BlockList/>
      </main>
    </div>
  );
}
