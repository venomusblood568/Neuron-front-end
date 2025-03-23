import { Button } from "../Components/button";
import { Input } from "../Components/input";



export function Login() {
  
  return (
    <div className="h-screen w-screen bg-black flex justify-center items-center">
      <div className="bg-white rounded-xl min-w-72 p-8">
        <h1 className="text-center p-2 text-darkPurple text-[30px]">ᒪOᘜIᑎ</h1>
        <Input placeholder="Username" />
        <Input placeholder="Password"/>
        <div className="flex justify-center pt-4 gap-3">
          <Button loading={false} variant="primary" text="Login" />
        </div>
      </div>
    </div>
  );
}
