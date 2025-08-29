import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ApiTest from './ApiTest';
import './HomeStyles.css';

const Home = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  return (
    <div className="home-container">
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Керуйте своїми справами
            <span className="gradient-text"> ефективно</span>
          </h1>
          <p className="hero-description">
            Простий і зручний додаток для управління задачами. 
            Створюйте, редагуйте та відстежуйте виконання своїх справ.
          </p>
          
          <div className="hero-actions">
            {isAuthenticated ? (
              <div className="authenticated-section">
                <p className="welcome-message">
                  Привіт, {user?.username || user?.email}! 👋
                </p>
                <Link to="/todos" className="primary-button">
                  Переглянути мої задачі
                </Link>
              </div>
            ) : (
              <div className="auth-buttons">
                <Link to="/register" className="primary-button">
                  Почати безкоштовно
                </Link>
                <Link to="/login" className="secondary-button">
                  Увійти в акаунт
                </Link>
              </div>
            )}
          </div>
        </div>
        
        <div className="hero-image">
          <div className="feature-card">
            <div className="card-header">
              <h3>📝 Мої задачі</h3>
            </div>
            <div className="card-content">
              <div className="todo-item-preview">
                <div className="checkbox-preview checked"></div>
                <span>Завершити проект</span>
              </div>
              <div className="todo-item-preview">
                <div className="checkbox-preview"></div>
                <span>Підготувати презентацію</span>
              </div>
              <div className="todo-item-preview">
                <div className="checkbox-preview"></div>
                <span>Відвідати спортзал</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="features-section">
        <div className="features-container">
          <h2>Чому саме наш додаток?</h2>
          <div className="features-grid">
            <div className="feature-item">
              <div className="feature-icon">🚀</div>
              <h3>Швидкий старт</h3>
              <p>Почніть користуватися за лічені секунди. Інтуїтивний інтерфейс не потребує навчання.</p>
            </div>
            
            <div className="feature-item">
              <div className="feature-icon">🔒</div>
              <h3>Безпека даних</h3>
              <p>Ваші задачі захищені сучасними методами шифрування та аутентифікації.</p>
            </div>
            
            <div className="feature-item">
              <div className="feature-icon">📱</div>
              <h3>Адаптивний дизайн</h3>
              <p>Працює ідеально на всіх пристроях - від смартфона до робочого комп'ютера.</p>
            </div>
            
            <div className="feature-item">
              <div className="feature-icon">⚡</div>
              <h3>Миттєва синхронізація</h3>
              <p>Ваші зміни синхронізуються в реальному часі між усіма пристроями.</p>
            </div>
            
            <div className="feature-item">
              <div className="feature-icon">🎯</div>
              <h3>Фільтрація задач</h3>
              <p>Легко знаходьте потрібні задачі за допомогою зручних фільтрів.</p>
            </div>
            
            <div className="feature-item">
              <div className="feature-icon">📊</div>
              <h3>Статистика</h3>
              <p>Відстежуйте свій прогрес і продуктивність за допомогою детальної статистики.</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Тестовий компонент для розробки */}
      {process.env.NODE_ENV === 'development' && <ApiTest />}
    </div>
  );
};

export default Home;
