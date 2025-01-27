import { Button } from "./Components/button";
import "./App.css";

function App() {
 return (
   <>
     <Button
       variant="primary"
       text="Primary Button"
       startIcon={<span>🚀</span>}
     />

     {/* Secondary Button */}
     <Button
       variant="secondary"
       text="Secondary Button"
       endIcon={<span>👉</span>}
     />
   </>
 );
}

export default App;
