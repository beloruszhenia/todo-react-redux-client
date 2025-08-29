import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser, registerUser } from '../store/slices/authSlice';

const ApiTest = () => {
  const [testResult, setTestResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const testConnection = async () => {
    setIsLoading(true);
    setTestResult('Тестування підключення...');
    
    try {
      // Спробуємо простий запит до auth endpoints, оскільки health може не існувати
      const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:4000/api'}/auth/google`);
      if (response.status === 200 || response.status === 302) { // 302 для редирекста
        setTestResult('✅ З\'єднання з API успішне!');
      } else {
        setTestResult(`❌ Помилка API: ${response.status}`);
      }
    } catch (error) {
      setTestResult(`❌ Помилка з'єднання: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const testRegister = async () => {
    setIsLoading(true);
    setTestResult('Тестування реєстрації...');
    
    try {
      const result = await dispatch(registerUser({
        name: 'testuser' + Date.now(),
        email: 'test' + Date.now() + '@example.com',
        password: 'password123'
      }));
      
      if (result.type.endsWith('/fulfilled')) {
        setTestResult('✅ Реєстрація успішна!');
      } else {
        setTestResult(`❌ Помилка реєстрації: ${result.payload}`);
      }
    } catch (error) {
      setTestResult(`❌ Помилка реєстрації: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', margin: '20px', borderRadius: '8px' }}>
      <h3>🧪 Тестування API</h3>
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <button 
          onClick={testConnection} 
          disabled={isLoading}
          style={{ padding: '10px 20px', borderRadius: '4px', border: '1px solid #ccc' }}
        >
          Тест з'єднання
        </button>
        <button 
          onClick={testRegister} 
          disabled={isLoading}
          style={{ padding: '10px 20px', borderRadius: '4px', border: '1px solid #ccc' }}
        >
          Тест реєстрації
        </button>
      </div>
      <div style={{ 
        padding: '10px', 
        backgroundColor: '#f5f5f5', 
        borderRadius: '4px',
        minHeight: '40px',
        display: 'flex',
        alignItems: 'center'
      }}>
        {testResult}
      </div>
    </div>
  );
};

export default ApiTest;
