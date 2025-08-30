import { Background } from "@/components/common";
import { ButtonWithLoader, InputWithoutIcon } from "@/components/ui";
import ModeToggle from "@/components/ui/mode-toggle";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, type RegisterSchema } from "@/schemas/auth";
import { useAuth } from "@/hooks";

export default function Register() {
  const { register: registerAuth, loading } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
  });
  const onSubmit = (data: RegisterSchema) => {
    registerAuth(data);
  };
  return (
    <Background>
      <div className="layout pt-10 space-y-4">
        <h1 className="text-2xl font-bold text-center">Registration Form</h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-background dark:bg-secondary shadow-md md:p-10 p-6 rounded-xl md:w-[480px] w-full mx-auto border border-line space-y-4"
        >
          <InputWithoutIcon
            type="text"
            label="Name"
            placeholder="e.g John Doe"
            className="bg-secondary dark:bg-foreground"
            {...register("name")}
            error={errors.name?.message}
          />
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
            loading={loading}
            type="submit"
            initialText="Register"
            loadingText="Registering..."
            className="btn-primary w-full h-10 rounded-xl mt-6"
          />
        </form>
        <div className="text-center text-muted">
          <p>
            Already have an account?{" "}
            <Link to="/login" className="text-main">
              Login
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
