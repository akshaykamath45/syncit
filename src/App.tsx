import "./App.css";
import { auth } from "./firebase-config";
import { signInAnonymously, onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import TextEditor from "./components/TextEditor.tsx";
function App() {
  useEffect(() => {
    signInAnonymously(auth);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("User is signed in", user.uid);
      } else {
        console.log("User is signed out");
      }
    });
  }, []);

  return (
    <div className="App">
      <header>
        <h1>Syncit</h1>
      </header>
      <TextEditor/>
    </div>
  );
}

export default App;
