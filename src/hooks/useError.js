import { useSnackbar } from "notistack";
import { useCallback } from "react";

export default function useError() {
  const { enqueueSnackbar } = useSnackbar();
  const handleError = useCallback((message) => {
    enqueueSnackbar(message, { variant: 'error' });
  }, [enqueueSnackbar])
  return handleError 
}