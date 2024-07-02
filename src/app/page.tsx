"use client";

import { useState } from "react";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        setCookie("authToken", data.authToken);
        router.push("/emoji");
      } else {
        const errorResponse = await response.json();
        setMessage(
          `Login failed: ${response.status} ${response.statusText} - ${errorResponse.error}`
        );
      }
    } catch (error) {
      setMessage(`Error during login: ${error}`);
    }
  };

  return (
    <main className="w-full min-h-screen flex justify-center items-center">
      <div className="container m-auto flex flex-col gap-2 bg-slate-400 p-8 rounded w-96">
        <h1 className="text-center text-white text-3xl">ログイン</h1>
        <input
          type="text"
          placeholder="マタモのユーザーネーム"
          value={username}
          className=" p-2 rounded focus:outline-none"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="マタモのパスワード"
          value={password}
          className=" p-2 rounded focus:outline-none"
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="flex justify-center items-center">
          <button
            onClick={handleLogin}
            className="bg-white px-4 py-2 inline-block rounded text-black hover:bg-orange-400 hover:text-white transition-all"
          >
            Login
          </button>
        </div>
        <p>{message}</p>
      </div>
    </main>
  );
}
