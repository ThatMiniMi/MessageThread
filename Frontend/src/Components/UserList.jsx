import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';

const fetchUsers = async (query = '') => {
  const response = await axios.get(`https://localhost:5215/api/users${query ? `/search?query=${query}` : ''}`);
  return response.data;
};

export default function UserList() {
  const [searchTerm, setSearchTerm] = useState('');
  const { data: users = [], refetch, isLoading } = useQuery({
    queryKey: ['users', searchTerm],
    queryFn: () => fetchUsers(searchTerm)
  });

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    refetch();
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Users</h2>
      <input
        type="text"
        placeholder="Search users..."
        value={searchTerm}
        onChange={handleSearch}
        className="p-2 border border-gray-300 rounded mb-4 w-full"
      />

      {isLoading ? (
        <p>Loading...</p>
      ) : users.length > 0 ? (
        <ul className="space-y-2">
          {users.map((user) => (
            <li key={user.id} className="p-2 bg-white shadow rounded">
              {user.username}
            </li>
          ))}
        </ul>
      ) : (
        <p>No users found.</p>
      )}
    </div>
  );
}
