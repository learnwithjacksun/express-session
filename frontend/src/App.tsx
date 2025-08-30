import { Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import { ScrollToTop } from "@/components/ui";
import { Home, Register, Login } from "@/pages";
import { useAuth } from "./hooks";
import { useEffect } from "react";

export default function App() {
  const { getUser } = useAuth();
  useEffect(() => {
    getUser();
  }, [getUser]);
  return (
    <>
      <ScrollToTop />
      <Toaster position="top-center" richColors />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}
