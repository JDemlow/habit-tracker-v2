import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import HabitPage from "./pages/HabitPage";

const App = () => {
  return (
    <div>
      <BrowserRouter
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/HabitPage" element={<HabitPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};
export default App;
