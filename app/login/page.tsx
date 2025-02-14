"use client";
import { useState, ChangeEvent } from "react";
import { login, signup } from "./actions";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";

interface AuthPageState {
  email: string;
  password: string;
  confirmPassword: string;
  error: string[];
  confirmPasswordError: string;
  isLogin: boolean;
}

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string[]>([]);
  const [confirmPasswordError, setConfirmPasswordError] = useState<string>("");

  const validatePassword = (password: string): string[] => {
    const errors: string[] = [];
    if (!/(?=.*[a-z])/.test(password)) {
      errors.push("ต้องมีตัวอักษรพิมพ์เล็ก");
    }
    if (!/(?=.*[A-Z])/.test(password)) {
      errors.push("ต้องมีตัวอักษรพิมพ์ใหญ่");
    }
    if (!/(?=.*\d)/.test(password)) {
      errors.push("ต้องมีตัวเลข");
    }
    if (!/(?=.*[@$!%*?&#])/.test(password)) {
      errors.push("ต้องมีอักขระพิเศษ");
    }
    if (password.length < 8) {
      errors.push("ต้องมีอย่างน้อย 8 ตัวอักษร");
    }
    return errors;
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const newPassword = e.target.value;
    setPassword(newPassword);

    if (!isLogin) {
      const passwordErrors = validatePassword(newPassword);
      setError(passwordErrors);
    }

    if (confirmPassword && confirmPassword !== newPassword) {
      setConfirmPasswordError("รหัสผ่านไม่ตรงกัน");
    } else {
      setConfirmPasswordError("");
    }
  };

  const handleConfirmPasswordChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const newConfirmPassword = e.target.value;
    setConfirmPassword(newConfirmPassword);

    if (newConfirmPassword !== password) {
      setConfirmPasswordError("รหัสผ่านไม่ตรงกัน");
    } else {
      setConfirmPasswordError("");
    }
  };

  const handleFormSwitch = (formType: boolean): void => {
    setIsLogin(formType);
    setEmail("");  // Clear email
    setPassword("");  // Clear password
    setConfirmPassword("");  // Clear confirm password
    setError([]);  // Clear error messages
    setConfirmPasswordError("");  // Clear confirm password error
  };

  return (
    <div className="flex justify-center items-center min-h-screen relative">
      <div className=""></div>
      <form className="relative backdrop-blur-2xl border border-white/30 shadow-2xl rounded-3xl p-8 w-96 transition transform hover:scale-105 hover:shadow-purple-500">
        <h2 className="text-3xl font-extrabold text-center text-white mb-6 tracking-wide">
          {isLogin ? "เข้าสู่ระบบ" : "สมัครสมาชิก"}
        </h2>

        <div className="">
          <div className="flex mb-6 border border-white/40 rounded-lg overflow-hidden">
            <button
              type="button"
              onClick={() => handleFormSwitch(true)}
              className={`flex-1 py-3 text-lg font-bold transition-all ${
                isLogin ? "bg-white text-purple-700 shadow-md" : "bg-transparent text-white"
              }`}
            >
              Login
            </button>
          </div>

          <div className="flex mb-6 border border-white/40 rounded-lg overflow-hidden">
            <button
              type="button"
              onClick={() => handleFormSwitch(false)}
              className={`flex-1 py-3 text-lg font-bold transition-all ${
                !isLogin ? "bg-white text-purple-700 shadow-md" : "bg-transparent text-white"
              }`}
            >
              Signup
            </button>
          </div>
        </div>

        <div className="mb-4 relative">
          <label htmlFor="email" className="text-white font-bold">
            Email Address:
            <FaEnvelope className="absolute left-4 mt-4 text-gray-300 text-lg" />
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 pl-12 py-3 border border-white/50 bg-white/10 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        </div>

        <div className="mb-4 relative">
          <label htmlFor="password" className="text-white font-bold">
            Password:
            <FaLock className="absolute left-4 mt-4 text-gray-300 text-lg" />
          </label>
          <input
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            required
            className="w-full px-4 pl-12 py-3 border border-white/50 bg-white/10 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          {error.length > 0 && !isLogin && (
            <ul className="text-red-400 text-sm mt-1">
              {error.map((err, index) => (
                <li key={index}>{err}</li>
              ))}
            </ul>
          )}
        </div>

        {!isLogin && (
          <div className="mb-4 relative">
            <label htmlFor="confirm-password" className="text-white font-bold">
              Confirm Password:
              <FaLock className="absolute left-4 mt-4 text-gray-300 text-lg" />
            </label>
            
            <input 
              id="confirm-password"
              name="confirm-password"
              type="password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              required
              className="w-full px-4 pl-12 py-3 border border-white/50 bg-white/10 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400" 
            />
            {confirmPasswordError && (
              <p className="text-red-400 text-sm mt-1">{confirmPasswordError}</p>
            )}
          </div>
        )}

        <button
          formAction={isLogin ? login : signup}
          
          disabled={
            (isLogin && error.length > 0) || !!confirmPasswordError || (!isLogin && password !== confirmPassword)
          }
          className={`w-full py-3 rounded-lg font-bold text-white text-lg transition-all duration-300 ${
            (isLogin && error.length > 0) || confirmPasswordError || (!isLogin && password !== confirmPassword)
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-purple-500 to-blue-500 hover:opacity-90 hover:shadow-lg hover:shadow-purple-400"
          }`}
        >
          {isLogin ? "Login" : "Signup"}
        </button>

        {isLogin && (
          <p className="text-center mt-4 text-white text-sm">
            Not a member? {" "}
            <span
              onClick={() => handleFormSwitch(false)}
              className="text-blue-300 cursor-pointer hover:underline"
            >
              Signup now
            </span>
          </p>
        )}
      </form>
    </div>
  );
}
