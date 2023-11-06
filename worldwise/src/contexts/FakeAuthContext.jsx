import { createContext, useContext, useReducer } from "react";

const AuthContext = createContext();

const FAKE_USER = [
  {
    name: "Jack",
    email: "jack@example.com",
    password: "qwerty",
    avatar: "https://i.pravatar.cc/100?u=zz",
  },
];

function reducer(state, action) {
  const { user, isAuthenticated } = state;
  const { type, payload } = action;
  switch (type) {
    case "login":
      return { ...state, user: payload, isAuthenticated: true };
    case "logout":
      return { ...state, user: null, isAuthenticated: false };
    default:
      throw new Error("AuthContext invalid action");
  }
}

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, {
    user: null,
    isAuthenticated: false,
  });
  const { user, isAuthenticated } = state;
  function login(email, password) {
    const user = FAKE_USER.find(
      (user) => user.email === email && user.password === password
    );
    if (user) dispatch({ type: "login", payload: user });
  }
  function logout() {
    dispatch({ type: "logout" });
  }
  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) throw new Error("Auth context used outside scope");
  return context;
}
