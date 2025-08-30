import { Background } from "@/components/common";
import { ButtonWithLoader } from "@/components/ui";
import ModeToggle from "@/components/ui/mode-toggle";
import { useAuth } from "@/hooks";
import { Info, Loader } from "lucide-react";
import { Link } from "react-router-dom";

const dateFormatter = (date: string | undefined) => {
  if (!date) return "N/A";
  return new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};

export default function Home() {
  const { user, isChecking, logout, loading } = useAuth();

  if (isChecking) {
    return (
      <Background>
        <div className="layout py-20 space-y-4">
          <div className="bg-background dark:bg-secondary shadow-md md:p-10 p-6 rounded-xl md:w-[480px] w-full mx-auto border border-line space-y-4 center">
            <div className="flex items-center gap-2">
              <Loader className="animate-spin text-yellow-500" size={20} />
              <p>Loading...</p>
            </div>
          </div>
        </div>
      </Background>
    );
  }
  return (
    <Background>
      <div className="layout py-20 space-y-4">
        <div className="md:w-[480px] w-full mx-auto">
          <h1 className="text-2xl font-bold">
            Welcome, {user?.name || "Guest"}
          </h1>
          {user && <p>You are currently logged in</p>}
          {!user && <p>You are currently logged out</p>}
        </div>

        {user && !isChecking && (
          <div className="bg-background dark:bg-secondary shadow-md md:p-10 p-6 rounded-xl md:w-[480px] w-full mx-auto border border-line space-y-4">
            <h3>Account Details</h3>
            <div>
              <div className="flex justify-between">
                <p className="text-muted">Name</p>
                <p className="text-right">{user?.name}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-muted">Email</p>
                <p className="text-right">{user?.email}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-muted">Session Time</p>
                <p className="text-right">{dateFormatter(user?.createdAt)}</p>
              </div>
            </div>

            <div className="flex justify-end border-t border-line pt-4">
              <ButtonWithLoader
                loading={loading}
                onClick={logout}
                initialText="Logout"
                loadingText="Logging out..."
                className="btn bg-red-500 text-white font-semibold text-sm w-fit px-4 rounded-xl py-2"
              />
            </div>
          </div>
        )}

        {!isChecking && !user && (
          <div className="bg-background dark:bg-secondary shadow-md md:p-10 p-6 rounded-xl md:w-[480px] w-full mx-auto border border-line space-y-4">
            <div className="center flex-col gap-4 h-30">
              <Info size={30} className="text-yellow-500" />
              <p>No sessions found</p>
            </div>
            <div className="flex gap-4 border-t border-line pt-4">
              <Link
                to="/login"
                className="btn btn-primary text-sm w-full rounded-xl py-2"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="btn border-line dark:border-line text-sm py-2 border rounded-xl w-full"
              >
                Register
              </Link>
            </div>
          </div>
        )}
      </div>
      <div className="fixed top-4 right-4">
        <ModeToggle />
      </div>
    </Background>
  );
}
