import moment from "moment";
import { useUserContext } from "../../context/USerContext";
import { Pagination, message } from "antd";
import { useState } from "react";
import { banUser, unbanUser } from "../../services/apiAdmin";

function Users() {
  const { fetchUsers, users, currentPage, totalUsers, dispatch, loadingUser } =
    useUserContext();

  const [isLoading, setIsLoading] = useState(false);
  function changePage(page) {
    dispatch({ type: "users/page", payload: page });
  }

  async function handelBanUser(id) {
    try {
      setIsLoading(true);
      const data = await banUser(id);
      if (data.isSuccess) {
        message.success(data.message);
        fetchUsers();
      }
    } catch (err) {
      message.error(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  async function handelUnBanUser(id) {
    try {
      setIsLoading(true);
      const data = await unbanUser(id);
      if (data.isSuccess) {
        message.success(data.message);
        fetchUsers();
      }
    } catch (err) {
      message.error(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section>
      <h1 className=" text-3xl font-semibold my-2">User List</h1>
      {loadingUser && <p className="text-blue-500 font-bold">Loading...</p>}

      {!loadingUser && (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 ">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 text-center ">
              <tr>
                <th scope="col" className="px-6 py-3 text-left">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Email
                </th>
                <th scope="col" className="px-6 py-3">
                  Role
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
                <th scope="col" className="px-6 py-3">
                  Create At
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="text-center">
              {users.length > 0 ? (
                <>
                  {users.map((user) => (
                    <tr className="bg-white border-b " key={user._id}>
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap text-left"
                      >
                        {user.name}
                      </th>
                      <td className="px-6 py-4">{user.email}</td>
                      <td className="px-6 py-4">
                        {user.role === "admin" ? (
                          <span className=" text-green-600 font-medium italic">
                            {user.role}
                          </span>
                        ) : (
                          <span className=" text-blue-600">{user.role}</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        {user.status === "pending" && (
                          <span className=" bg-yellow-400 text-xs p-1 rounded-md text-white">
                            {user.status}
                          </span>
                        )}
                        {user.status === "active" && (
                          <span className="bg-green-400 text-xs p-1 rounded-md text-white">
                            {user.status}
                          </span>
                        )}
                        {user.status === "banned" && (
                          <span className="bg-red-400 text-xs p-1 rounded-md text-white">
                            {user.status}
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        {moment(user.createdAt).format("L")}
                      </td>
                      <td className="px-6 py-4">
                        {user.status === "active" ? (
                          <button
                            disabled={isLoading}
                            type="button"
                            className="font-medium text-red-600 hover:underline me-4"
                            onClick={() => {
                              handelBanUser(user._id);
                            }}
                          >
                            Ban
                          </button>
                        ) : (
                          <button
                            disabled={isLoading}
                            type="button"
                            className="font-medium text-blue-600 hover:underline me-4"
                            onClick={() => {
                              handelUnBanUser(user._id);
                            }}
                          >
                            Unban
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </>
              ) : (
                <p>No proudcts added yet.</p>
              )}
            </tbody>
          </table>
        </div>
      )}
      <div className="flex justify-end my-10">
        <Pagination
          current={currentPage}
          total={totalUsers}
          onChange={changePage}
          defaultPageSize={4}
        />
      </div>
    </section>
  );
}

export default Users;
