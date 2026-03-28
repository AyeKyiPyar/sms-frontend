// src/pages/LoginPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/authService";


const LoginPage = () => {

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => 
  {
    e.preventDefault();
    setError("");

    try
    {
      const response = await AuthService.login(email, password);

      // Backend returns plain string on success
      if (response.status === 200) 
      {
        console.log(response.data); // "Admin login successfull!"
       // setIsLoggedIn(true);
        navigate("/dashboard");
      } 
      else 
      {
        // Just in case, fallback
        setError("Login failed");
      }
     
    }
    catch (error) 
    {
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
  //  <div className="min-h-screen flex items-center justify-center bg-gray-100">
  //     <form onSubmit={handleLogin} 
  //           className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm space-y-4">
  //     <h2 className="mb-6 text-center text-2xl font-bold text-blue-700">
  //         Login
  //       </h2>
  //       {error && (
  //         <p className="mb-4 text-center text-sm text-red-500">
  //           {error}
  //         </p>
  //       )}
  //       <input
  //         type="email"
  //         placeholder="Email"
  //         value={email}
  //         onChange={(e) => setEmail(e.target.value)}
  //         className="border p-2 mb-4 w-full"
  //         required
  //       />
  //       <input
  //         type="password"
  //         placeholder="Password"
  //         value={password}
  //         onChange={(e) => setPassword(e.target.value)}
  //         className="border p-2 mb-4 w-full"
  //         required
  //       />
  //       <button type="submit" className="bg-blue-500 text-white p-2 w-full rounded">
  //         Sign in
  //       </button>
  //     </form>
  //   </div>
  <div className="fixed inset-0 flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-xl">

        <h2 className="mb-6 text-center text-2xl font-bold text-blue-700">
          Admin Login
        </h2>

        {error && <div className="bg-red-100 text-red-700 p-2 mb-4 rounded">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="mt-1 w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-blue-600 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
              className="mt-1 w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-blue-600 focus:outline-none"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-blue-700 py-2 text-white hover:bg-blue-800 transition"
          >
            Sign In
          </button>
        </form>

      </div>
    </div>
  );
};

export default LoginPage;
