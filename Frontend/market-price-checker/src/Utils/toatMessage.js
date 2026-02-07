import { toast } from 'react-toastify';

export const handleSuccess = (msg) => {
        if (!toast.isActive("success-toast")) {
            toast.success(msg, {
                position: "top-center",
                toastId: "success-toast",
                autoClose: 1000,
                hideProgressBar: true,
                theme: "colored"
            });
        }
    }

    export const handleError = (msg) => {
        if (!toast.isActive("error-toast")) {
            toast.error(msg, {
                position: "top-center",
                toastId: "error-toast",
                autoClose: 1000,
                hideProgressBar: true,
                theme: "colored"
            });
        }
    }
