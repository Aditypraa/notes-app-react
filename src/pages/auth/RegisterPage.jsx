import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { BiUserPlus } from "react-icons/bi";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { register } from "../../utils/apiUtils";
import Input from "../../components/Elements/Input";
import Button from "../../components/Elements/Button";

function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};

    if (!name.trim()) {
      newErrors.name = "Nama tidak boleh kosong";
    } else if (name.length < 2) {
      newErrors.name = "Nama minimal 2 karakter";
    }

    if (!email.trim()) {
      newErrors.email = "Email tidak boleh kosong";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Format email tidak valid";
    }

    if (!password.trim()) {
      newErrors.password = "Password tidak boleh kosong";
    } else if (password.length < 6) {
      newErrors.password = "Password minimal 6 karakter";
    }

    if (!confirmPassword.trim()) {
      newErrors.confirmPassword = "Konfirmasi password tidak boleh kosong";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Password tidak cocok";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    try {
      const result = await register({ name, email, password });

      if (!result.error) {
        navigate("/login", {
          state: {
            message: "Registrasi berhasil! Silakan login dengan akun Anda.",
          },
        });
      } else {
        setErrors({ submit: "Registrasi gagal. Coba lagi." });
      }
    } catch (error) {
      console.error("Registration error:", error);
      setErrors({ submit: "Terjadi kesalahan. Coba lagi." });
    } finally {
      setLoading(false);
    }
  };

  const clearError = (field) => {
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-blue-100">
            <span className="text-2xl">📑</span>
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Buat Akun Baru
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Atau{" "}
            <Link
              to="/login"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              masuk dengan akun yang sudah ada
            </Link>
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <Input
                name="name"
                type="text"
                value={name}
                onChange={(value) => {
                  setName(value);
                  clearError("name");
                }}
                placeholder="Nama lengkap"
                className={errors.name ? "border-red-500" : ""}
                disabled={loading}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            <div>
              <Input
                name="email"
                type="text"
                value={email}
                onChange={(value) => {
                  setEmail(value);
                  clearError("email");
                }}
                placeholder="Email address"
                className={errors.email ? "border-red-500" : ""}
                disabled={loading}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div className="relative">
              <Input
                name="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(value) => {
                  setPassword(value);
                  clearError("password");
                }}
                placeholder="Password"
                className={errors.password ? "border-red-500 pr-12" : "pr-12"}
                disabled={loading}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible className="h-5 w-5 text-gray-400" />
                ) : (
                  <AiOutlineEye className="h-5 w-5 text-gray-400" />
                )}
              </button>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            <div className="relative">
              <Input
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(value) => {
                  setConfirmPassword(value);
                  clearError("confirmPassword");
                }}
                placeholder="Konfirmasi password"
                className={
                  errors.confirmPassword ? "border-red-500 pr-12" : "pr-12"
                }
                disabled={loading}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <AiOutlineEyeInvisible className="h-5 w-5 text-gray-400" />
                ) : (
                  <AiOutlineEye className="h-5 w-5 text-gray-400" />
                )}
              </button>
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.confirmPassword}
                </p>
              )}
            </div>
          </div>

          {errors.submit && (
            <div className="rounded-md bg-red-50 p-4">
              <p className="text-sm text-red-800">{errors.submit}</p>
            </div>
          )}

          <div>
            <Button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Memproses...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <BiUserPlus /> Daftar
                </span>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
