import React, { useState } from "react";
import RoleForm from "./RoleForm";

const Roles = () => {
  const [roles, setRoles] = useState([
    { id: 1, name: "Admin", description: "Full access to system" },
    { id: 2, name: "Teacher", description: "Manage classes and students" },
  ]);

  const [editingRole, setEditingRole] = useState(null);

  const handleAddOrUpdateRole = (role) => {
    if (editingRole) {
      // Update existing role
      setRoles((prev) =>
        prev.map((r) => (r.id === editingRole.id ? { ...r, ...role } : r))
      );
      setEditingRole(null);
    } else {
      // Add new role
      const newRole = { id: Date.now(), ...role };
      setRoles((prev) => [...prev, newRole]);
    }
  };

  const handleEdit = (role) => {
    setEditingRole(role);
  };

  const handleDelete = (id) => {
    setRoles((prev) => prev.filter((role) => role.id !== id));
  };

  return (
    <div className="p-6">
      <RoleForm onSubmit={handleAddOrUpdateRole} initialData={editingRole} />

      <h2 className="text-xl font-semibold mt-8 mb-4">Roles List</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border-b text-left">ID</th>
              <th className="py-2 px-4 border-b text-left">Name</th>
              <th className="py-2 px-4 border-b text-left">Description</th>
              <th className="py-2 px-4 border-b text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {roles.map((role) => (
              <tr key={role.id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b">{role.id}</td>
                <td className="py-2 px-4 border-b">{role.name}</td>
                <td className="py-2 px-4 border-b">{role.description}</td>
                <td className="py-2 px-4 border-b">
                  <button
                    onClick={() => handleEdit(role)}
                    className="text-blue-500 mr-2 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(role.id)}
                    className="text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {roles.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center py-4">
                  No roles available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Roles;
