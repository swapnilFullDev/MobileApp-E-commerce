import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";
import Toast from "../components/common/Toast";

export type ToastType = "success" | "error" | "info" | "warning";
export type ToastPosition = "top" | "bottom";
export type AnimationType = "slide" | "fade" | "bounce" | "zoom";

type ToastOptions = {
  message: string;
  title?: string;
  type?: ToastType;
  duration?: number;
  position?: ToastPosition;
  animationType?: AnimationType;
  showProgress?: boolean;
};

type ToastState =
  | (ToastOptions & {
      id: number;
      visible: boolean;
    })
  | null;

type ToastContextValue = {
  showToast: (options: ToastOptions) => void;
  showSuccess: (message: string, title?: string, duration?: number) => void;
  showError: (message: string, title?: string, duration?: number) => void;
  showWarning: (message: string, title?: string, duration?: number) => void;
  showInfo: (message: string, title?: string, duration?: number) => void;
  hideToast: () => void;
  isVisible: boolean;
};

const DEFAULT_DURATION = 3200;

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export function ToastProvider({
  children,
  defaultAnimationType = "slide",
  defaultDuration = DEFAULT_DURATION,
  defaultPosition = "top",
}: PropsWithChildren<{
  defaultPosition?: ToastPosition;
  defaultAnimationType?: AnimationType;
  defaultDuration?: number;
}>) {
  const [toastState, setToastState] = useState<ToastState>(null);
  const queueRef = useRef<ToastOptions[]>([]);
  const idRef = useRef(0);
  const isShowingRef = useRef(false);

  const showToastInternal = useCallback(
    (options: ToastOptions) => {
      idRef.current += 1;
      isShowingRef.current = true;
      setToastState({
        id: idRef.current,
        visible: true,
        message: options.message,
        title: options.title,
        type: options.type ?? "info",
        duration: options.duration ?? defaultDuration,
        position: options.position ?? defaultPosition,
        animationType: options.animationType ?? defaultAnimationType,
        showProgress:
          options.showProgress === undefined ? true : options.showProgress,
      });
    },
    [defaultAnimationType, defaultDuration, defaultPosition]
  );

  const processQueue = useCallback(() => {
    if (queueRef.current.length === 0) {
      return;
    }
    const nextToast = queueRef.current.shift();
    if (nextToast) {
      showToastInternal(nextToast);
    }
  }, [showToastInternal]);

  const showToast = useCallback(
    (options: ToastOptions) => {
      if (isShowingRef.current) {
        queueRef.current.push(options);
        return;
      }
      showToastInternal(options);
    },
    [showToastInternal]
  );

  const hideToast = useCallback(() => {
    setToastState((current) =>
      current ? { ...current, visible: false } : current
    );
  }, []);

  const handleToastHidden = useCallback(() => {
    isShowingRef.current = false;
    setToastState(null);
    processQueue();
  }, [processQueue]);

  const showSuccess = useCallback(
    (message: string, title?: string, duration?: number) => {
      showToast({
        message,
        type: "success",
        title: title ?? "Success",
        duration,
        animationType: "bounce",
      });
    },
    [showToast]
  );

  const showError = useCallback(
    (message: string, title?: string, duration?: number) => {
      showToast({
        message,
        type: "error",
        title: title ?? "Error",
        duration: duration ?? defaultDuration + 800,
        animationType: "slide",
      });
    },
    [defaultDuration, showToast]
  );

  const showWarning = useCallback(
    (message: string, title?: string, duration?: number) => {
      showToast({
        message,
        type: "warning",
        title: title ?? "Warning",
        duration,
        animationType: "slide",
      });
    },
    [showToast]
  );

  const showInfo = useCallback(
    (message: string, title?: string, duration?: number) => {
      showToast({
        message,
        type: "info",
        title,
        duration,
        // animationType: "fade",
        animationType: "slide",
      });
    },
    [showToast]
  );

  const contextValue = useMemo<ToastContextValue>(
    () => ({
      showToast,
      showSuccess,
      showError,
      showWarning,
      showInfo,
      hideToast,
      isVisible: Boolean(toastState?.visible),
    }),
    [
      hideToast,
      showError,
      showInfo,
      showSuccess,
      showToast,
      showWarning,
      toastState?.visible,
    ]
  );

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      <Toast
        visible={Boolean(toastState?.visible)}
        message={toastState?.message ?? ""}
        type={toastState?.type}
        duration={toastState?.duration}
        title={toastState?.title}
        position={toastState?.position}
        animationType={toastState?.animationType}
        showProgress={toastState?.showProgress}
        onHide={handleToastHidden}
        onDismiss={hideToast}
      />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}
