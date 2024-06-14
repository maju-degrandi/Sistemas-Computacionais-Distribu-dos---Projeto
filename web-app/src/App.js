import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TablePage from './pages/TablePage';
import LogPage from "./pages/LogPage";

export default function App() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<TablePage />}></Route>
          <Route path="/log" element={<LogPage />}></Route>
        </Routes>
      </BrowserRouter>
    );
  }

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);