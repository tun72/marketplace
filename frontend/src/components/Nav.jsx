import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getUser, setUser } from "../store/slices/userSlice";
import { BookmarkIcon } from "@heroicons/react/24/solid";

function Nav() {
  const user = useSelector(getUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log(user);

  const logout = () => {
    localStorage.removeItem("token");
    dispatch(setUser({}));
    navigate("/");
  };
  return (
    <header className=" flex items-center justify-between py-4 px-10">
      <h1 className="text-blue-600 font-bold lg:text-2xl text-lg uppercase">
        <Link to="/">TradeHub.Io</Link>
      </h1>
      <ul className="flex items-center gap-5 text-blue-600 font-bold lg:text-xl text-base">
        {!user?.userId && (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </>
        )}

        {user?.userId && (
          <>
            {user?.role === "user" && (
              <li>
                <Link to="/profile">Profile</Link>
              </li>
            )}

            {user?.role === "admin" && (
              <li>
                <Link to="/admin">Admin Pannel</Link>
              </li>
            )}
            <li>
              <Link to="/saved-products">
                <BookmarkIcon width={20} />
              </Link>
            </li>
            <li>
              <button
                to="/logout"
                onClick={logout}
                className="border-none outline-none"
              >
                Logout
              </button>
            </li>
          </>
        )}
      </ul>
    </header>
  );
}

export default Nav;
