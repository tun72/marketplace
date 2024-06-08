import { createContext, useContext, useReducer } from "react";

const initialState = {
  activeTabKey: "1",
};
function reducer(state, action) {
  switch (action.type) {
    case "changekey":
      return { ...state, activeTabKey: action.payload };

    default:
      return { ...state };
  }
}
const AdminContext = createContext();
export function AdminProvider({ children }) {
  const [{ activeTabKey }, dispatch] = useReducer(reducer, initialState);

  return (
    <AdminContext.Provider
      value={{
        activeTabKey,
        dispatch,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export function useAdminContext() {
  const context = useContext(AdminContext);

  if (!context)
    throw new Error("Admin context is use outSide of the components");
  return context;
}
