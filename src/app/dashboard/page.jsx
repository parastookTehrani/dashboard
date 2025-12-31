"use client";
import { useEffect, useState } from "react";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true; 

    const fetchUsers = async () => {
      try {
        const response = await fetch("https://dummyjson.com/users");
        const data = await response.json();
        if (isMounted) {
          setUsers(data.users);
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchUsers();

    return () => {
      isMounted = false; 
    };
  }, []);

  if (isLoading) {
   
    return (
      <div className="overflow-x-auto rounded-xl shadow-lg border border-gray-200 p-6">
        <table className="min-w-full bg-white">
          <thead className="bg-linear-to-r from-cyan-600 to-cyan-400 text-white">
            <tr>
              <th className="py-3 px-6 text-left">ID</th>
              <th className="py-3 px-6 text-left">First Name</th>
              <th className="py-3 px-6 text-left">Last Name</th>
              <th className="py-3 px-6 text-left">Email</th>
            </tr>
          </thead>

          <tbody>
            {[1, 2, 3, 4, 5].map((i) => (
              <tr key={i} className="animate-pulse">
                <td className="py-4 px-6">
                  <div className="h-4 w-10 bg-gray-200 rounded"></div>
                </td>
                <td className="py-4 px-6">
                  <div className="h-4 w-32 bg-gray-200 rounded"></div>
                </td>
                <td className="py-4 px-6">
                  <div className="h-4 w-32 bg-gray-200 rounded"></div>
                </td>
                <td className="py-4 px-6">
                  <div className="h-4 w-52 bg-gray-200 rounded"></div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }


  return (
    <div className="overflow-x-auto rounded-xl shadow-lg border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200 bg-white">
        <thead className="bg-linear-to-r from-cyan-600 to-cyan-400 text-white">
          <tr className="uppercase text-sm font-medium tracking-wider">
            <th className="py-3 px-6 text-left">ID</th>
            <th className="py-3 px-6 text-left">First Name</th>
            <th className="py-3 px-6 text-left">Last Name</th>
            <th className="py-3 px-6 text-left">Email</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-100">
          {users.map(({ id, firstName, lastName, email }) => (
            <tr
              key={id}
              className="transition hover:bg-cyan-50 cursor-pointer"
            >
              <td className="py-4 px-6 font-semibold">{id}</td>
              <td className="py-4 px-6">{firstName}</td>
              <td className="py-4 px-6">{lastName}</td>
              <td className="py-4 px-6 text-gray-700">{email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
