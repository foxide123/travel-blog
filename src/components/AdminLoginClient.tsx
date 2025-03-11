"use client";

import { useState } from "react";
import { supabaseCreateClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

const supabase = supabaseCreateClient();

export default function AdminLoginClient() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();

  const handleLogin = async () => {
    if (!email || !password) alert("Email or Password is empty");

    console.log("handleLogin triggered");

    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    const result = await response.json();
    if(result.error) {
      console.error("Login failed:", result.error);
      return;
    }

    console.log("Session from API:", result.session);

    localStorage.setItem("supabase.auth.token", result.session.access_token);
    router.push("/admin/create-post");
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event != null) {
      setEmail(event.target.value);
    }
  };

  function handlePasswordChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (event != null) {
      setPassword(event.target.value);
    }
  }

  return (
    <div>
      <form className="h-[520px] w-[400px] bg-blue-900 absolute translate-[-50%] top-1/2 left-1/2 rounded-xl px-[50px] py-[35px] tracking-[0.5px] flex flex-col">
        <h3 className="text-3xl font-medium leading-[42px] text-center">
          Login
        </h3>
        <label htmlFor="username">Email</label>
        <input type="text" placeholder="Email" onChange={handleEmailChange} />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          placeholder="Password"
          id="password"
          onChange={handlePasswordChange}
        />

        <button type="button" onClick={handleLogin}>
          Log In
        </button>
      </form>

      <style jsx>
        {`
          form * {
            font-family: "Poppins", sans-serif;
            color: #ffffff;
            letter-spacing: 0.5px;
            outline: none;
            border: none;
          }

          ::placeholder {
            color: #e5e5e5;
          }

          label {
            display: block;
            margin-top: 30px;
            font-size: 16px;
            font-weight: 500;
          }

          input {
            display: block;
            height: 50px;
            width: 100%;
            background-color: rgba(255, 255, 255, 0.07);
            border-radius: 3px;
            padding: 0 10px;
            margin-top: 8px;
            font-size: 14px;
            font-weight: 300;
          }

          ::placeholder {
            color: #e5e5e5;
          }

          button {
            margin-top: 50px;
            width: 100%;
            background-color: #ffffff;
            color: black !important;
            padding: 15px 0;
            font-size: 18px;
            font-weight: 600;
            border-radius: 5px;
            cursor: pointer;
          }
        `}
      </style>
    </div>
  );
}
