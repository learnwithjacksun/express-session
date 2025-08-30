import api from "@/config/api";
import type { LoginSchema, RegisterSchema } from "@/schemas/auth";
import { useAuthStore } from "@/store";
import { AxiosError } from "axios";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function useAuth() {
  const { setUser, user } = useAuthStore();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const onError = (error: AxiosError | Error) => {
    if (error instanceof AxiosError) {
      toast.error(error.response?.data.message);
    } else {
      toast.error((error as Error).message);
    }
  };
  const register = async (data: RegisterSchema) => {
    setLoading(true);
    try {
      const response = await api.post("/auth/register", data);
      if (response.data.success) {
        setUser(response.data.data);
        toast.success(response.data.message);
        navigate("/login");
      }
      return response.data;
    } catch (error) {
      onError(error as AxiosError | Error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (data: LoginSchema) => {
    setLoading(true);
    try {
      const response = await api.post("/auth/login", data);
      if (response.data.success) {
        setUser(response.data.data);
        toast.success(response.data.message);
        navigate("/");
      }
    } catch (error) {
      onError(error as AxiosError | Error);
    } finally {
      setLoading(false);
    }
  };
  const logout = async () => {
    setLoading(true);
    try {
      const response = await api.post("/auth/logout");
      if (response.data.success) {
        setUser(null);
        getUser();
        toast.success(response.data.message);
      }
    } catch (error) {
      onError(error as AxiosError | Error);
    } finally {
      setLoading(false);
    }
  };

  const getUser = useCallback(async () => {
    setIsChecking(true);
    try {
      const response = await api.get("/auth/me");
      if (response.data.success) {
        setUser(response.data.data);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.log(error);
      setUser(null);
    } finally {
      setIsChecking(false);
    }
  }, [setUser]);

  return {
    register,
    login,
    logout,
    loading,
    user,
    getUser,
    isChecking,
  };
}
