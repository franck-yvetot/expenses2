import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ExpenseReportListPage } from './pages/ExpenseReportListPage';
import { ExpenseReportDetailPage } from './pages/ExpenseReportDetailPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ExpenseReportListPage />} />
        <Route path="/reports/:id" element={<ExpenseReportDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;