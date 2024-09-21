import Home from "./pages/home";
import Customiser from "./pages/customiser";
import Canvas from "./canvas";

function App() {
  //const [count, setCount] = useState(0)

  return (
    <main className="app transion-all ease-in">
      <Home />
      <Canvas/>
      <Customiser/>
    </main>
  )
}


export default App
