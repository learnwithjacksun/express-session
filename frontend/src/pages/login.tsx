import { Background } from "@/components/common";
import { ButtonWithLoader, InputWithoutIcon } from "@/components/ui";
import ModeToggle from "@/components/ui/mode-toggle";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginSchema } from "@/schemas/auth";

export default function Login() {
  const { login, loading } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });
  const onSubmit = (data: LoginSchema) => {
    login(data);
  };
  return (
    <Background>
      <div className="layout pt-10 space-y-4">
        <h1 className="text-2xl font-bold text-center">Login Form</h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-background dark:bg-secondary shadow-md md:p-10 p-6 rounded-xl md:w-[480px] w-full mx-auto border border-line space-y-4"
        >
          <InputWithoutIcon
            type="email"
            label="Email"
            placeholder="e.g john.doe@example.com"
            className="bg-secondary dark:bg-foreground"
            {...register("email")}
            error={errors.email?.message}
          />
          <InputWithoutIcon
            type="password"
            label="Password"
            placeholder="e.g **********"
            className="bg-secondary dark:bg-foreground"
            {...register("password")}
            error={errors.password?.message}
          />
          <ButtonWithLoader
            initialText="Login"
            loadingText="Logging in..."
            className="btn-primary w-full h-10 rounded-xl mt-6"
            loading={loading}
            type="submit"
          />
        </form>
        <div className="text-center text-muted">
          <p>
            Don't have an account?{" "}
            <Link to="/register" className="text-main">
              Register
            </Link>
          </p>
        </div>
      </div>
      <div className="fixed top-4 right-4">
        <ModeToggle />
      </div>
    </Background>
  );
}
