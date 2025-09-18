import React, { useEffect, useState } from 'react'
import Header from '../components/header/Header'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Dashback() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const token = localStorage.getItem("token")
  const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;
  const navigate = useNavigate()

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // First check if user is authenticated
        if (!token || !user) {
          navigate('/login')
          return
        }

        // Check if user is admin
        if (user.role !== "admin") {
          setLoading(false)
          return
        }

        // Only fetch users if user is admin
        const res = await axios.get("http://localhost:4000/users", {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        setUsers(res.data)
        console.log(res.data);
        
      } catch (err) {
        console.log(err);
        // If token is invalid, redirect to login
        if (err.response?.status === 401 || err.response?.status === 403) {
          localStorage.removeItem('token')
          localStorage.removeItem('user')
          navigate('/login')
        }
      } finally {
        setLoading(false)
      }
    }
    fetchUsers()
  }, [token, navigate, user])

  // Show loading state
  if (loading) {
    return (
      <div>
        <Header />
        <div className='mt-14 flex justify-center items-center h-64'>
          <div className='text-lg'>Loading...</div>
        </div>
      </div>
    )
  }

  // If no user or not admin, show appropriate message
  if (!user || user.role !== "admin") {
    return (
      <div>
        <Header />
        <div className='mt-14 flex justify-center items-center h-64'>
          <div className='text-center'>
            <h2 className='text-2xl font-bold text-red-600 mb-4'>Access Denied</h2>
            <p className='text-lg text-gray-600'>Admin Only</p>
            <p className='text-sm text-gray-500 mt-2'>You need admin privileges to view this content</p>
          </div>
        </div>
      </div>
    )
  }

  // Admin user - show table
  return (
    <div>
      <Header />
      <div className='mt-14 p-6'>
        <h1 className='text-2xl font-bold mb-6 text-gray-800'>User Management Dashboard</h1>
        <div className='overflow-x-auto'>
          <table className='min-w-full bg-white border border-gray-300 rounded-lg shadow-md'>
            <thead className='bg-gray-50'>
              <tr>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b'>Name</th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b'>Email</th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b'>Role</th>
              </tr>
            </thead>
            <tbody className='bg-white divide-y divide-gray-200'>
              {users.map((data, index) => (
                <tr key={data._id || index} className='hover:bg-gray-50'>
                  <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>{data.name}</td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>{data.email}</td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      data.role === 'admin' 
                        ? 'bg-red-100 text-red-800' 
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {data.role}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Dashback