"use client";
import { useEffect, useState, useMemo } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortColumn, setSortColumn] = useState("id");
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const [debouncedQuery, setDebouncedQuery] = useState(searchQuery);
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedQuery(searchQuery), 300);
    return () => clearTimeout(handler);
  }, [searchQuery]);

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

    return () => { isMounted = false; };
  }, []);

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortOrder("asc");
    }
  };

  const filteredUsers = useMemo(() =>
    users.filter(user =>
      user.firstName.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
      user.lastName.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(debouncedQuery.toLowerCase())
    ), [users, debouncedQuery]
  );

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    let valA = a[sortColumn];
    let valB = b[sortColumn];
    if (typeof valA === "string") valA = valA.toLowerCase();
    if (typeof valB === "string") valB = valB.toLowerCase();
    if (valA < valB) return sortOrder === "asc" ? -1 : 1;
    if (valA > valB) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedUsers = sortedUsers.slice(startIndex, startIndex + rowsPerPage);
  const totalPages = Math.ceil(filteredUsers.length / rowsPerPage);

  if (isLoading) {
    return (
      <div className="overflow-x-auto rounded-xl shadow-lg border border-gray-200 p-6">
        <table className="min-w-full bg-white">
          <thead className="bg-gradient-to-r from-cyan-600 to-cyan-400 text-white">
            <tr>
              <th className="py-3 px-6 text-left">ID</th>
              <th className="py-3 px-6 text-left">First Name</th>
              <th className="py-3 px-6 text-left">Last Name</th>
              <th className="py-3 px-6 text-left">Email</th>
            </tr>
          </thead>
          <tbody>
            {[1,2,3,4,5].map(i => (
              <tr key={i} className="animate-pulse">
                <td className="py-4 px-6"><div className="h-4 w-10 bg-gray-200 rounded"></div></td>
                <td className="py-4 px-6"><div className="h-4 w-32 bg-gray-200 rounded"></div></td>
                <td className="py-4 px-6"><div className="h-4 w-32 bg-gray-200 rounded"></div></td>
                <td className="py-4 px-6"><div className="h-4 w-52 bg-gray-200 rounded"></div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl shadow-lg border border-gray-200 p-4">
      <input
        type="text"
        placeholder="Search users..."
        value={searchQuery}
        onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
        className="mb-4 p-2 rounded border border-gray-300 w-full sm:w-1/2"
      />

      <table className="min-w-full divide-y divide-gray-200 bg-white">
        <thead className="bg-gradient-to-r from-cyan-600 to-cyan-400 text-white">
          <tr className="uppercase text-sm font-medium tracking-wider">
            <th className="py-3 px-6 cursor-pointer">
              <span className="inline-flex items-center" onClick={() => handleSort("id")}>
                ID {sortColumn === "id" && (sortOrder==="asc"?<ChevronUp className="w-4 h-4 ml-1"/>:<ChevronDown className="w-4 h-4 ml-1"/>)}
              </span>
            </th>
            <th className="py-3 px-6 cursor-pointer">
              <span className="inline-flex items-center" onClick={() => handleSort("firstName")}>
                First Name {sortColumn === "firstName" && (sortOrder==="asc"?<ChevronUp className="w-4 h-4 ml-1"/>:<ChevronDown className="w-4 h-4 ml-1"/>)}
              </span>
            </th>
            <th className="py-3 px-6 cursor-pointer">
              <span className="inline-flex items-center" onClick={() => handleSort("lastName")}>
                Last Name {sortColumn === "lastName" && (sortOrder==="asc"?<ChevronUp className="w-4 h-4 ml-1"/>:<ChevronDown className="w-4 h-4 ml-1"/>)}
              </span>
            </th>
            <th className="py-3 px-6 cursor-pointer">
              <span className="inline-flex items-center" onClick={() => handleSort("email")}>
                Email {sortColumn === "email" && (sortOrder==="asc"?<ChevronUp className="w-4 h-4 ml-1"/>:<ChevronDown className="w-4 h-4 ml-1"/>)}
              </span>
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-100">
          {paginatedUsers.map(({id, firstName, lastName, email}) => (
            <tr key={id} className="transition hover:bg-cyan-50 cursor-pointer">
              <td className="py-4 px-6 font-semibold">{id}</td>
              <td className="py-4 px-6">{firstName}</td>
              <td className="py-4 px-6">{lastName}</td>
              <td className="py-4 px-6 text-gray-700">{email}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-center gap-4 mt-4">
        <button disabled={currentPage===1} onClick={()=>setCurrentPage(prev=>prev-1)} className="px-3 py-1 bg-cyan-500 text-white rounded disabled:opacity-50">Prev</button>
        <span className="px-3 py-1">{currentPage}/{totalPages}</span>
        <button disabled={currentPage===totalPages} onClick={()=>setCurrentPage(prev=>prev+1)} className="px-3 py-1 bg-cyan-500 text-white rounded disabled:opacity-50">Next</button>
      </div>
    </div>
  );
}
