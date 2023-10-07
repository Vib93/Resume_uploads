import Home from "./pages/home";
import Customizer from "./pages/customizer";
import Canvas from "./canvas";

function App() {
  //const [count, setCount] = useState(0)

  return (
    <main className="app transion-all ease-in">
      <Home />
      <Canvas/>
      <Customizer />
    </main>
  )
}


export default App
