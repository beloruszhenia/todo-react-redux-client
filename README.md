# TODO React Redux Client

## 📋 Опис проекту

Це клієнтська частина повнофункціонального TODO додатка, створеного з використанням React, Redux Toolkit та сучасних веб-технологій. Додаток підтримує JWT авторизацію, Google OAuth, управління завданнями та має адаптивний дизайн.

## 🏗️ Архітектура проекту

### Основні технології:
- **React 19.1.1** - основний фреймворк
- **Redux Toolkit 2.0.1** - управління станом
- **React Router DOM 6.20.1** - маршрутизація
- **Axios 1.6.2** - HTTP клієнт для API запитів

### Структура проекту:

```
src/
├── components/           # React компоненти
│   ├── ApiTest.js       # Тестування API
│   ├── Home.js          # Головна сторінка
│   ├── Login.js         # Форма входу
│   ├── Register.js      # Форма реєстрації
│   ├── OAuthCallback.js # Обробка OAuth callback
│   ├── PrivateRoute.js  # Захищені маршрути
│   ├── TodoList.js      # Список завдань
│   ├── TodoItem.js      # Окреме завдання
│   ├── TodoForm.js      # Форма додавання завдань
│   └── TodoFilter.js    # Фільтр завдань
├── services/            # API сервіси
│   ├── api.js          # Конфігурація Axios
│   ├── authService.js  # Сервіс авторизації
│   └── todoService.js  # Сервіс управління завданнями
├── store/              # Redux store
│   ├── store.js        # Конфігурація store
│   └── slices/         # Redux slices
│       ├── authSlice.js # Стан авторизації
│       └── todoSlice.js # Стан завдань
├── App.js              # Головний компонент додатка
├── App.css             # Стилі додатка
└── index.js            # Точка входу
```

## 🔐 Система авторизації

### Підтримувані методи:
- **JWT авторизація** - стандартна авторизація з email/пароль
- **Google OAuth 2.0** - вхід через Google акаунт
- **Автоматичне оновлення токенів** - refresh token система
- **Захищені маршрути** - доступ тільки для авторизованих користувачів

### Функціонал авторизації:
- Реєстрація нових користувачів
- Вхід існуючих користувачів
- Автоматичне збереження стану авторизації
- Безпечний вихід з системи

## ✅ Функціонал TODO

### Основні можливості:
- **Створення завдань** - додавання нових TODO
- **Редагування завдань** - зміна тексту завдань
- **Відзначення виконаних** - toggle статус завершення
- **Видалення завдань** - повне видалення TODO
- **Фільтрація** - перегляд всіх/активних/завершених

### Стан завдань:
- `pending` - завдання в процесі
- `completed` - завершене завдання
- Автоматична синхронізація з сервером

## 🎨 UI/UX особливості

### Дизайн:
- **Адаптивний дизайн** - працює на всіх пристроях
- **Сучасний інтерфейс** - чистий та інтуїтивний
- **Анімації** - плавні переходи та ефекти
- **Українська локалізація** - повністю українською мовою

### Компоненти:
- Модальні вікна для редагування
- Інтерактивні кнопки та форми
- Індикатори завантаження
- Обробка помилок з user-friendly повідомленнями

## 🔧 Налаштування та запуск

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## 🚀 Доступні команди

### Запуск в режимі розробки:
```bash
npm start
```
Відкриває додаток у браузері за адресою [http://localhost:3000](http://localhost:3000)

### Запуск тестів:
```bash
npm test
```
Запускає тести в інтерактивному режимі

### Збірка для продакшн:
```bash
npm run build
```
Створює оптимізовану збірку у папці `build/`

## 🌐 Інтеграція з Backend

### API Endpoints:
- `POST /api/auth/register` - реєстрація користувача
- `POST /api/auth/login` - вхід користувача  
- `GET /api/auth/google` - Google OAuth
- `GET /api/auth/me` - інформація про користувача
- `GET /api/todos` - отримання всіх завдань
- `POST /api/todos` - створення завдання
- `PUT /api/todos/:id` - оновлення завдання
- `DELETE /api/todos/:id` - видалення завдання

### Змінні середовища:
```env
REACT_APP_API_URL=http://localhost:4000/api
PORT=3000
```

## 📱 Використання

1. **Реєстрація/Вхід** - створіть акаунт або увійдіть
2. **Google OAuth** - швидкий вхід через Google
3. **Додавання завдань** - використовуйте форму вгорі
4. **Управління** - клікайте на завдання для редагування
5. **Фільтрація** - використовуйте кнопки фільтрів

## 🛠️ Технічні деталі

### Redux Store:
- **authSlice** - стан користувача та авторизації
- **todoSlice** - стан завдань та операцій CRUD
- **Middleware** - автоматична обробка async thunks

### Роутинг:
- Публічні маршрути: `/login`, `/register`
- Захищені маршрути: `/`, `/todos`
- OAuth callback: `/auth/callback`

### Безпека:
- JWT токени зберігаються в localStorage
- Автоматична перевірка авторизації
- Захист від CSRF атак
- Валідація форм на клієнті

## 📚 Додаткові ресурси

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
