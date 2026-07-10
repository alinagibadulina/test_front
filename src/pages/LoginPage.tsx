import { useMutation } from "@tanstack/react-query";
import { login } from "../api/auth";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import { showErrorToast } from "./_components/showErrorToast";
import { Footer } from "./_components/Footer";
import { ROUTES } from "@/routes/router";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const LoginPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const mutation = useMutation({
    mutationFn: login,
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();

    mutation.mutate(
      {
        email,
        password,
      },
      {
        onSuccess: () => {
          sessionStorage.setItem("isAuth", "true");
          toast.success("Logged in successfully!");
          navigate(ROUTES.HOME);
        },
        onError: showErrorToast,
      },
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f3f3f3]">
      <main className="flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-xl border border-gray-300 rounded bg-white p-6">
          <h1 className="text-3xl font-bold text-center mb-8">Login</h1>

          <form onSubmit={submit} className="space-y-5">
            <div>
              <label className="block text-lg font-semibold mb-2">Email</label>

              <Input
                type="email"
                placeholder="enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-lg font-semibold mb-2">
                Password
              </label>

              <Input
                type="password"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
            </div>

            <Button type="submit" disabled={mutation.isPending}>
              {mutation.isPending ? "Loading..." : "Login"}
            </Button>

            <div className="flex flex-row flex-wrap gap-3 justify-center">
              <p>Нет аккаунта?</p>
              <Link to="/register" className="font-bold hover:text-gray-500">
                Зарегистрироваться
              </Link>
            </div>

            {mutation.isError && (
              <p className="text-red-500 text-sm text-center">
                Invalid email or password
              </p>
            )}
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};
