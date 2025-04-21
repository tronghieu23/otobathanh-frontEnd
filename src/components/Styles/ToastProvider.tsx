import React, { createContext, useCallback, useState, useContext } from 'react';
import { Alert, Snackbar } from '@mui/material';

type ToastType = 'success' | 'error' | 'info' | 'warning';

interface ToastContextProps {
  showToast: (message: string, severity?: ToastType) => void;
}

const ToastContext = createContext<ToastContextProps | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toast, setToast] = useState<{ message: string; severity: ToastType; open: boolean }>({
    message: '',
    severity: 'success',
    open: false,
  });

  const showToast = useCallback((message: string, severity: ToastType = 'info') => {
    setToast({ message, severity, open: true });
  }, []);

  const handleClose = () => {
    setToast((prev) => ({ ...prev, open: false }));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <Snackbar
        open={toast.open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        style={{ top: '110px' }}
      >
        <Alert onClose={handleClose} severity={toast.severity} sx={{ width: '100%' }}>
          {toast.message}
        </Alert>
      </Snackbar>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context.showToast;
};