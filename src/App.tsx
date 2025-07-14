import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import AdminDashboard from './components/AdminDashboard';
import AdminLogin from './components/AdminLogin';
import DriverLogin from './components/DriverLogin';

function App() {
  const [currentView, setCurrentView] = useState<'landing' | 'adminLogin' | 'driverLogin' | 'admin' | 'driver'>('landing');

  const handleLogin = (type: 'admin' | 'driver') => {
    if (type === 'admin') {
      setCurrentView('adminLogin');
    } else {
      setCurrentView('driverLogin');
    }
  };

  const handleSuccessfulLogin = (type: 'admin' | 'driver') => {
    setCurrentView(type);
  };

  const handleLogout = () => {
    setCurrentView('landing');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {currentView === 'landing' && <LandingPage onLogin={handleLogin} />}
      {currentView === 'adminLogin' && (
        <AdminLogin 
          onLogin={() => handleSuccessfulLogin('admin')} 
          onBack={() => setCurrentView('landing')} 
        />
      )}
      {currentView === 'driverLogin' && (
        <DriverLogin 
          onLogin={() => handleSuccessfulLogin('driver')} 
          onBack={() => setCurrentView('landing')} 
        />
      )}
      {currentView === 'admin' && <AdminDashboard onLogout={handleLogout} />}
      {currentView === 'driver' && (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Driver Portal</h2>
            <p className="text-gray-600 mb-6">Driver functionality coming soon...</p>
            <button
              onClick={handleLogout}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Back to Home
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;





// import React, { useState } from 'react';
// import LandingPage from './components/LandingPage';
// import AdminDashboard from './components/AdminDashboard';

// function App() {
//   const [currentView, setCurrentView] = useState<'landing' | 'admin' | 'driver'>('landing');

//   const handleLogin = (type: 'admin' | 'driver') => {
//     setCurrentView(type);
//   };

//   const handleLogout = () => {
//     setCurrentView('landing');
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {currentView === 'landing' && <LandingPage onLogin={handleLogin} />}
//       {currentView === 'admin' && <AdminDashboard onLogout={handleLogout} />}
//       {currentView === 'driver' && (
//         <div className="min-h-screen flex items-center justify-center">
//           <div className="text-center">
//             <h2 className="text-2xl font-bold text-gray-800 mb-4">Driver Portal</h2>
//             <p className="text-gray-600 mb-6">Driver functionality coming soon...</p>
//             <button
//               onClick={handleLogout}
//               className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
//             >
//               Back to Home
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;

