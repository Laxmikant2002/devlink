import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AddDeveloper from './pages/AddDeveloper';
import DeveloperDetail from './pages/DeveloperDetail';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <BrowserRouter>
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <h1 className="text-2xl font-bold text-gray-900">
                <span className="text-blue-600">Dev</span>Link
              </h1>
              <p className="text-gray-600 hidden sm:block">Connect with amazing developers</p>
            </div>
          </div>
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<AddDeveloper />} />
          <Route path="/developer/:id" element={<DeveloperDetail />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
