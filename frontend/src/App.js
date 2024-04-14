import Body from "./components/Body";
import Home from "./components/Home";
// import {Provider}
import {Toaster } from 'react-hot-toast'
function App() {
  return (
    <div className="box-border w-full">
      <Body/>
      <Toaster/>
    </div>
  );
}

export default App;
