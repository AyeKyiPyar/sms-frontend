import React, { useState } from "react";

const RoleForm = ({ onSubmit, initialData }) => {
  const [roleName, setRoleName] = useState(initialData?.name || "");
  const [description, setDescription] = useState(initialData?.description || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!roleName.trim()) return;
    onSubmit({ name: roleName, description });
    setRoleName("");
    setDescription("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto"
    >
      <h2 className="text-xl font-semibold mb-4">{initialData ? "Edit Role" : "Add Role"}</h2>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">Role Name</label>
        <input
          type="text"
          value={roleName}
          onChange={(e) => setRoleName(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter role name"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter role description"
        />
      </div>

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
      >
        {initialData ? "Update Role" : "Add Role"}
      </button>
    </form>
  );
};

export default RoleForm;
