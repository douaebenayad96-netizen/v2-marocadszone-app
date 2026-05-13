// src/components/DebugTest.tsx
import React from 'react';

const DebugTest: React.FC = () => {
  return (
    <div style={{ 
      padding: '20px', 
      margin: '20px', 
      border: '2px solid green', 
      textAlign: 'center' 
    }}>
      <h1>🎉 React is Working!</h1>
      <p>If you see this, React and TypeScript are working correctly.</p>
      <p>Current time: {new Date().toLocaleTimeString()}</p>
    </div>
  );
};

export default DebugTest;
