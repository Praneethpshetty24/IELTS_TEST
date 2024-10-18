import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import IELTSTestPage from './Components/IELTSTestPage';
import Payments from './Components/Payment/Payments'
import Test from './Components/Test/Tests';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<IELTSTestPage />} />
        <Route path="/pay" element={<Payments />} />
        <Route path="/test" element={<Test />} />
      </Routes>
    </Router>
  );
}

export default App;
