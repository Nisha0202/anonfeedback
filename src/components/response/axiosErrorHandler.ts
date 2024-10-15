// /utils/axiosErrorHandler.ts

import { AxiosError } from "axios";
import { ApiResponse } from "@/types/ApiResponse"; // Adjust the import path as necessary

// Utility for error handling
export const handleAxiosError = (error: AxiosError<ApiResponse>, toast: any) => {
  toast({
    title: "Failed",
    description: error.response?.data?.message || "Something went wrong.",
    variant: 'destructive'
  });
};

// handleAxiosError(error as AxiosError<ApiResponse>, toast);