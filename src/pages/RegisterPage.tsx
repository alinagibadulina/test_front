import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import { register } from "@/api/auth";
import { toast } from "react-toastify";
import { showErrorToast } from "./_components/showErrorToast";
import { Footer } from "./_components/Footer";
import { ROUTES } from "@/routes/router";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const RegisterPage = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const mutation = useMutation({
    mutationFn: register,
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();

    mutation.mutate(
      {
        name,
        email,
        password,
      },
      {
        onSuccess: () => {
          toast.success("Registered successfully!");
          navigate(ROUTES.LOGIN);
        },
        onError: showErrorToast,
      },
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f3f3f3]">
      <main className="flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-xl border border-gray-300 rounded bg-white p-6">
          <h1 className="text-3xl font-bold text-center mb-8">Register</h1>

          <form onSubmit={submit} className="space-y-5">
            <div>
              <label className="block text-lg font-semibold mb-2">Name</label>
              <Input
                placeholder="enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-lg font-semibold mb-2">Email</label>
              <Input
                placeholder="enter mail"
                type="email"
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
              />
            </div>

            <Button>Create account</Button>

            <div className="flex flex-row gap-3 justify-center">
              <p>Уже есть аккаунт?</p>

              <Link to={ROUTES.LOGIN} className="font-bold hover:text-gray-500">
                Войти
              </Link>
            </div>
          </form>

          {mutation.isError && (
            <p className="text-red-500 mt-4 text-center">Registration error</p>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};
