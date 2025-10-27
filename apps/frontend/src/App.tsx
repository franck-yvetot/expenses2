import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ExpenseReportListPage } from './pages/ExpenseReportListPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ExpenseReportListPage />} />
        <Route path="/reports/:id" element={<div>Report Details - Coming Soon</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;