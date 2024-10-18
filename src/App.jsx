import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import IELTSTestPage from './Components/IELTSTestPage';
import Payments from './Components/Payment/Payments'
import Test from './Components/Test/Tests';
import LogS from './Components/Log/LogS';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<IELTSTestPage />} />
        <Route path="/pay" element={<Payments />} />
        <Route path="/test" element={<Test />} />
        <Route path="/" element={<LogS />} />
      </Routes>
    </Router>
  );
}

export default App;
