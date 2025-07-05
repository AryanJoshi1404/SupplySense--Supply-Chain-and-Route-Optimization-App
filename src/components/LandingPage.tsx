import React from 'react';
import { Truck, Shield, ArrowRight } from 'lucide-react';

interface LandingPageProps {
  onLogin: (type: 'admin' | 'driver') => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onLogin }) => {
  return (
    <div className="min-h-screen relative">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 113, 206, 0.7), rgba(0, 113, 206, 0.7)), url('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80')`
        }}
      />
      
      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <Truck className="h-16 w-16 text-yellow-400 mr-4" />
            <h1 className="text-4xl md:text-6xl font-bold text-white">
              Supply Chain Pro
            </h1>
          </div>
          <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-2xl">
            Streamline your logistics operations with our advanced supply chain management platform
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-6 w-full max-w-md">
          <button
            onClick={() => onLogin('admin')}
            className="group flex items-center justify-center bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            <Shield className="h-6 w-6 mr-3" />
            Admin Login
            <ArrowRight className="h-5 w-5 ml-3 group-hover:translate-x-1 transition-transform" />
          </button>
          
          <button
            onClick={() => onLogin('driver')}
            className="group flex items-center justify-center bg-yellow-400 text-blue-900 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-yellow-300 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            <Truck className="h-6 w-6 mr-3" />
            Driver Login
            <ArrowRight className="h-5 w-5 ml-3 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="mt-16 text-center text-blue-100">
          <p className="text-sm">Trusted by leading logistics companies worldwide</p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;