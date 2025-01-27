import { Button } from "./Components/button";
import { ShareIcon } from "./icon/shareIcon";
import { PlusIcon } from "./icon/plusIcon";
import "./App.css";

function App() {
 return (
   <>
     <Button 
        variant="primary" 
        text="Add Content" 
        startIcon={<PlusIcon />} />

     {/* Secondary Button */}
     <Button
       variant="secondary"
       text="Share"
       startIcon={<ShareIcon/>}
     />
   </>
 );
}

export default App;
