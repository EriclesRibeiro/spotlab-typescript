import { Route, Routes, Navigate } from "react-router-dom";
import SignIn from "./pages/SignIn";

const App = () => (
  <Routes>
    <Route index element={ <SignIn /> } />
  </Routes>
)

export default App;
