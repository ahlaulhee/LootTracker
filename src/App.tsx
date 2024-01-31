import data from "../data.json";
import "./App.css";

function App() {
  return (
    <div>
      {data.map((e) => (
        <img src={e.Image} />
      ))}
    </div>
  );
}

export default App;
