"use client";
import { useEffect, useState } from "react";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getData = async () => {
    try {
      const response = await fetch("https://dummyjson.com/users");
      const data = await response.json();
      setUsers(data.users);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  
  useEffect(() => {
    getData();
  }, []);

  if (isLoading) {
    return <p>loading...</p>;
  }
  return (
    <div className="overflow-x-auto rounded-xl shadow-lg border border-gray-200">
  <table className="min-w-full divide-y divide-gray-200 bg-white">
    
    <thead className="bg-gradient-to-r from-cyan-600 to-cyan-400 text-white">
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

  )
}
