import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from "react";
import { getAllUsers } from "../services/apiAdmin";

const initialState = {
  users: [],
  currentPage: 1,
  totalPages: 0,
  totalUsers: 0,
  loadingUser: false,
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, loadingUser: action.payload };
    case "rejected":
      return { ...state, error: action.payload };
    case "users/page":
      return { ...state, currentPage: action.payload };
    case "users/loaded":
      return {
        ...state,
        users: [...action.payload.users],
        currentPage: action.payload.currentPage,
        totalUsers: action.payload.totalUsers,
      };

    default:
      return { ...state };
  }
}

const UserContext = createContext();

export function UserProvider({ children }) {
  const [{ users, currentPage, totalUsers, loadingUser, error }, dispatch] =
    useReducer(reducer, initialState);

  const fetchUsers = useCallback(
    async function () {
      try {
        dispatch({ type: "loading", payload: true });
        const data = await getAllUsers(currentPage);

        console.log(data);
        dispatch({ type: "users/loaded", payload: data });
      } catch (err) {
        return dispatch({ type: "rejected", payload: err.message });
      } finally {
        dispatch({ type: "loading", payload: false });
      }
    },
    [currentPage]
  );

  useEffect(
    function () {
      fetchUsers();
    },
    [fetchUsers]
  );

  return (
    <UserContext.Provider
      value={{
        users,
        currentPage,
        totalUsers,
        loadingUser,
        error,
        fetchUsers,
        dispatch,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  const context = useContext(UserContext);

  if (!context)
    throw new Error("User context is use outSide of the components");
  return context;
}
