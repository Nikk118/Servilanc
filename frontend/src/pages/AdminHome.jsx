import React from 'react'
import { useAdminStore } from '../store/useAdminStore'

function AdminHome() {
    const {authAdmin,adminLogout}=useAdminStore()
  return (
    <div>
      <h1>Admin: {authAdmin?.admin?.username || "Not Logged In"}</h1>

    <button onClick={adminLogout}>logout</button>
    </div>
  )
}

export default AdminHome
