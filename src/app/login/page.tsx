"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";

import { UserIcon, LockIcon } from "@/components/Icons";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { MainLayout } from "@/components/layouts/MainLayout";
import { loginSchema, LoginFormValues } from "@/lib/validations/auth";
import { useAuth } from "@/contexts/AuthContext";

export default function LoginPage() {
  const { login, isLoading } = useAuth();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      userId: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    setError(null);
    try {
      const success = await login({
        userId: data.userId,
        password: data.password,
      });

      if (success) {
        router.push("/profile");
      } else {
        setError("Giriş bilgileri yanlış. Lütfen tekrar deneyin.");
      }
    } catch (err) {
      setError("Bir hata oluştu. Lütfen tekrar deneyin.");
    }
  };

  return (
    <MainLayout>
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="mb-8 flex justify-center">
            <div className="relative w-52 h-16">
              <Image
                src="/images/image.png"
                alt="ORCA Softwares"
                fill
                priority
                style={{ objectFit: "contain" }}
              />
            </div>
          </div>

          <h1 className="text-2xl text-orange-500 font-bold text-center mb-6">
            LOG IN
          </h1>

          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              placeholder="User ID"
              icon={<UserIcon />}
              {...register("userId")}
              error={errors.userId?.message}
            />

            <Input
              type="password"
              placeholder="Password"
              icon={<LockIcon />}
              {...register("password")}
              error={errors.password?.message}
            />

            <div className="text-left">
              <Link href="#" className="text-black underline text-sm">
                Forgot Password
              </Link>
            </div>

            <Button
              type="submit"
              variant="primary"
              fullWidth
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Log In"}
            </Button>
          </form>

          <div className="mt-12 text-center">
            <p className="text-gray-700 mb-4">Register as</p>
            <div className="flex justify-center gap-4">
              <Button variant="secondary" className="px-8">
                Operator
              </Button>
              <Button variant="secondary" className="px-8">
                Seller
              </Button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
