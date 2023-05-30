"use client";
import { ToastOptions, toast } from "react-toastify";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

const ToastContainerFunction = () => {
  return (
    <ToastContainer/>
  )
};
export default ToastContainerFunction

export const optionsConfig: ToastOptions = {
  position: "top-left",
  theme: "light",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
}

export function toastDefault(message: string) {
  toast(message, optionsConfig)
}

export function toastInfo(message: string) {
  toast.info(message, optionsConfig)
}

export function toastSuccess(message: string) {
  toast.success(message, optionsConfig)
}

export function toastWarning(message: string) {
  toast.warning(message, optionsConfig)
}

export function toastError(message: string) {
  toast.error(message, optionsConfig)
}
