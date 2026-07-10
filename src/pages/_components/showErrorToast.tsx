import { AxiosError } from "axios";
import { toast } from "react-toastify";

interface ErrorResponse {
  message: string;
}

export const showErrorToast = (error: unknown) => {
  if (error instanceof AxiosError) {
    const axiosError = error as AxiosError<ErrorResponse>;

    toast.error(axiosError.response?.data?.message || "Something went wrong");
    return;
  }

  toast.error("Something went wrong");
};
