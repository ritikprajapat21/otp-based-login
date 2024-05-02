import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { useAuth } from "./context/auth";
import Button from "./components/Button";
import { toast } from "react-hot-toast";

function App() {
  const [count, setCount] = useState(0);
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth?.email) {
      navigate("/signin");
    }
  }, [auth, navigate]);

  const onClick = () => {
    setAuth({});
    toast.success("Logout Successful");
  };

  if (auth?.email) {
    return (
      <>
        <div>
          <Button onClick={onClick} className="absolute right-4 top-4">
            Logout
          </Button>
          <a href="https://vitejs.dev" target="_blank">
            <img src={viteLogo} className="logo" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </div>
        <h1>Vite + React</h1>
        <div className="card">
          <button onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </button>
          <p>
            Edit <code>src/App.jsx</code> and save to test HMR
          </p>
        </div>
        <p className="read-the-docs">
          Click on the Vite and React logos to learn more
        </p>
      </>
    );
  }
}

export default App;
