import { createContext, useState } from 'react';

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(
    localStorage.getItem('currentUserEmail')
      ? { email: localStorage.getItem('currentUserEmail') }
      : null,
  );

  function signUp(email, password) {
    // 1. Достаем строку из localStorage и ОБЯЗАТЕЛЬНО превращаем её в массив через JSON.parse
    const usersData = JSON.parse(localStorage.getItem('users') || '[]');

    // 2. Ищем по массиву usersData, а не по состоянию user
    if (usersData.find((u) => u.email === email)) {
      return { success: false, error: 'Email already exists' };
    }

    const newUser = { email, password };

    // 3. Добавляем пользователя в массив данных
    usersData.push(newUser);

    // 4. Сохраняем обновленный массив обратно в localStorage
    localStorage.setItem('users', JSON.stringify(usersData));

    // 5. Устанавливаем текущего вошедшего пользователя в состояние
    setUser({ email });

    return { success: true };
  }

  function login(email, password) {
    // Логика входа будет похожей: достать usersData и проверить email/password
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find((u) => u.email === email && u.password === password);

    if (!user) {
      return { success: false, error: 'Invalid email or password' };
    }

    localStorage.setItem('currentuserEmail', email);
    setUser({ email });

    return { success: true };
  }

  function logout() {
    localStorage.removeItem('currentUserEmail');
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ signUp, user, logout, login }}>{children}</AuthContext.Provider>
  );
}
