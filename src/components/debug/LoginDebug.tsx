import React, { useState } from 'react';
import { useLoginAuth } from '../../services/api/fetchAuth';
import { LoginUser } from '../../services/types/auth';
import axiosConfig from '../../services/config/axiosConfig';

interface TestResult {
  type: 'success' | 'error';
  method: string;
  data?: unknown;
  error?: string;
  status?: number;
  headers?: unknown;
  originalError?: unknown;
}

const LoginDebug: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [testResult, setTestResult] = useState<TestResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { mutateAsync } = useLoginAuth();

  const testDirectAxios = async () => {
    setIsLoading(true);
    setTestResult(null);
    
    try {
      console.log('🔍 Testing direct axios call...');
      const loginData = { email, password };
      console.log('📋 Login data:', loginData);
      console.log('🌐 API Base URL:', import.meta.env.VITE_API_URL);
      console.log('🔗 Full endpoint:', `${import.meta.env.VITE_API_URL}/login/announcer`);
      
      const response = await axiosConfig.post('/login/announcer', loginData);
      console.log('✅ Direct axios success:', response.data);
      
      setTestResult({
        type: 'success',
        method: 'Direct Axios',
        data: response.data,
        status: response.status,
        headers: response.headers
      });
    } catch (error: unknown) {
      console.error('❌ Direct axios error:', error);
      const axiosError = error as { message: string; response?: { status: number; data: unknown; headers: unknown } };
      setTestResult({
        type: 'error',
        method: 'Direct Axios',
        error: axiosError.message,
        status: axiosError.response?.status,
        data: axiosError.response?.data,
        headers: axiosError.response?.headers
      });
    } finally {
      setIsLoading(false);
    }
  };

  const testHookCall = async () => {
    setIsLoading(true);
    setTestResult(null);
    
    try {
      console.log('🔍 Testing useLoginAuth hook...');
      const loginData: LoginUser = { email, password };
      console.log('📋 Login data:', loginData);
      
      const response = await mutateAsync(loginData);
      console.log('✅ Hook call success:', response);
      
      setTestResult({
        type: 'success',
        method: 'useLoginAuth Hook',
        data: response
      });
    } catch (error: unknown) {
      console.error('❌ Hook call error:', error);
      const hookError = error as { message: string };
      setTestResult({
        type: 'error',
        method: 'useLoginAuth Hook',
        error: hookError.message,
        originalError: error
      });
    } finally {
      setIsLoading(false);
    }
  };

  const testRawFetch = async () => {
    setIsLoading(true);
    setTestResult(null);
    
    try {
      console.log('🔍 Testing raw fetch call...');
      const loginData = { email, password };
      console.log('📋 Login data:', loginData);
      
      const response = await fetch(`${import.meta.env.VITE_API_URL}/login/announcer`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(loginData)
      });
      
      const data = await response.json();
      console.log('📨 Fetch response:', data);
      
      if (response.ok) {
        setTestResult({
          type: 'success',
          method: 'Raw Fetch',
          data: data,
          status: response.status
        });
      } else {
        setTestResult({
          type: 'error',
          method: 'Raw Fetch',
          error: data.message || 'Unknown error',
          status: response.status,
          data: data
        });
      }
    } catch (error: unknown) {
      console.error('❌ Fetch error:', error);
      const fetchError = error as { message: string };
      setTestResult({
        type: 'error',
        method: 'Raw Fetch',
        error: fetchError.message
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Login Debug Tool</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Input Form */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-700">Test Credentials</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter test email"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter test password"
            />
          </div>
          
          <div className="space-y-2">
            <button
              onClick={testDirectAxios}
              disabled={isLoading || !email || !password}
              className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400"
            >
              Test Direct Axios
            </button>
            
            <button
              onClick={testHookCall}
              disabled={isLoading || !email || !password}
              className="w-full py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:bg-gray-400"
            >
              Test useLoginAuth Hook
            </button>
            
            <button
              onClick={testRawFetch}
              disabled={isLoading || !email || !password}
              className="w-full py-2 px-4 bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:bg-gray-400"
            >
              Test Raw Fetch
            </button>
          </div>
          
          {isLoading && (
            <div className="text-center py-4">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <p className="text-gray-600 mt-2">Testing...</p>
            </div>
          )}
        </div>
        
        {/* Results */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-700">Test Results</h3>
          
          <div className="bg-gray-50 p-4 rounded-md">
            <h4 className="font-medium text-gray-600 mb-2">Environment Info</h4>
            <div className="text-sm space-y-1">
              <div><strong>API URL:</strong> {import.meta.env.VITE_API_URL}</div>
              <div><strong>Login Endpoint:</strong> {import.meta.env.VITE_API_URL}/login/announcer</div>
              <div><strong>Mode:</strong> {import.meta.env.MODE}</div>
            </div>
          </div>
          
          {testResult && (
            <div className={`p-4 rounded-md ${
              testResult.type === 'success' ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
            } border`}>
              <h4 className={`font-medium mb-2 ${
                testResult.type === 'success' ? 'text-green-800' : 'text-red-800'
              }`}>
                {testResult.method} - {testResult.type === 'success' ? 'Success' : 'Error'}
              </h4>
              
              {testResult.status && (
                <div className="text-sm mb-2">
                  <strong>Status:</strong> {testResult.status}
                </div>
              )}
              
              <div className="text-sm">
                <strong>Response:</strong>
                <pre className="mt-1 p-2 bg-white rounded text-xs overflow-auto max-h-40">
                  {JSON.stringify(testResult.data || testResult.error || testResult.originalError, null, 2)}
                </pre>
              </div>
              
              {testResult.headers && (
                <div className="text-sm mt-2">
                  <strong>Headers:</strong>
                  <pre className="mt-1 p-2 bg-white rounded text-xs overflow-auto max-h-20">
                    {typeof testResult.headers === 'object' ? JSON.stringify(testResult.headers, null, 2) : String(testResult.headers)}
                  </pre>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginDebug;
