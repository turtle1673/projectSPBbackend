"use client";
import { useState } from "react";
import { login, signup } from "./actions";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");  
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState([]);
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const validatePassword = (password) => {
    const errors = [];
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

  const handlePasswordChange = (e) => {
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

  const handleConfirmPasswordChange = (e) => {
    const newConfirmPassword = e.target.value;
    setConfirmPassword(newConfirmPassword);

    if (newConfirmPassword !== password) {
      setConfirmPasswordError("รหัสผ่านไม่ตรงกัน");
    } else {
      setConfirmPasswordError("");
    }
  };

  const handleFormSwitch = (formType) => {
    setIsLogin(formType);
    setEmail("");  // Clear email
    setPassword("");  // Clear password
    setConfirmPassword("");  // Clear confirm password
    setError([]);  // Clear error messages
    setConfirmPasswordError("");  // Clear confirm password error
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form className="bg-gray-300/20 border-2 border-white rounded-lg shadow-lg w-[1800px] max-w-full">
        <h2 className="text-2xl font-bold text-center text-white">
          {isLogin ? "เข้าสู่ระบบ" : "สมัครสมาชิก"}
        </h2>

        <div className="flex justify-center gap-4 mb-4 border rounded-lg">
  <div className="border rounded-lg flex-grow">
    <button
      type="button"
      onClick={() => handleFormSwitch(true)}
      className={`py-2 font-bold transition duration-300 ${
        isLogin ? "bg-blue-500 text-white" : "text-white"
      }`}
    >
      Login
    </button>
  </div>

  <div className="border rounded-lg flex-grow">
    <button
      type="button"
      onClick={() => handleFormSwitch(false)}
      className={`py-2 font-bold rounded-lg transition duration-300 ${
        !isLogin ? "bg-blue-500 text-white" : "text-white"
      }`}
    >
      Signup
    </button>
  </div>
</div>


        <div className="mb-4">
          <label htmlFor="email" className="block font-bold text-white">
            Email Address:
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block font-bold text-white">
            Password:
          </label>
          <input
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {error.length > 0 && !isLogin && (
            <ul className="text-red-500 text-sm mt-1">
              {error.map((err, index) => (
                <li key={index}>{err}</li>
              ))}
            </ul>
          )}
        </div>

        {!isLogin && (
          <div className="mb-4">
            <label htmlFor="confirm-password" className="block font-bold text-white">
              Confirm Password:
            </label>
            <input
              id="confirm-password"
              name="confirm-password"
              type="password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {confirmPasswordError && (
              <p className="text-red-500 text-sm mt-1">{confirmPasswordError}</p>
            )}
          </div>
        )}

        <button
          formAction={isLogin ? login : signup}
          disabled={
            (isLogin && error.length > 0) || confirmPasswordError || (!isLogin && password !== confirmPassword)
          }
          className={`w-full font-bold py-2 rounded-lg transition duration-300 ${
            (isLogin && error.length > 0) || confirmPasswordError || (!isLogin && password !== confirmPassword)
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          {isLogin ? "Login" : "Signup"}
        </button>

        {isLogin && (
          <p className="text-center mt-4 text-white">
            Not a member?{" "}
            <span
              onClick={() => handleFormSwitch(false)}
              className="text-blue-500 cursor-pointer hover:underline"
            >
              Signup now
            </span>
          </p>
        )}
      </form>
    </div>
  );
}
