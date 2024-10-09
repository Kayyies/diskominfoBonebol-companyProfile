"use client";

import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export const useFormHandlers = (
  formData: Record<string, any>,
  section: string,
  initialData: Record<string, any> = {}, // Optional: Nilai awal untuk mode edit
) => {
  const [isFormDirty, setIsFormDirty] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [pendingNavigation, setPendingNavigation] = useState<string | null>(
    null,
  );
  const [actionType, setActionType] = useState<"reset" | "back" | "navigation">(
    "reset",
  );

  const router = useRouter();
  const pathname = usePathname();

  // Menentukan apakah form data sama dengan initial data (untuk mode edit)
  const isResetDisabled = Object.keys(formData).every(
    (key) => formData[key] === (initialData[key] || ""),
  );

  const handleBack = () => {
    if (isFormDirty) {
      setActionType("back");
      setShowModal(true);
    } else {
      router.push(`/admin/${section}`);
    }
  };

  const confirmBack = () => {
    router.push(`/admin/${section}`);
    setShowModal(false);
    setIsFormDirty(false);
  };

  const handleReset = (resetForm: () => void) => {
    if (isFormDirty) {
      setActionType("reset");
      setShowModal(true);
    } else {
      resetForm();
    }
  };

  const confirmReset = (resetForm: () => void) => {
    resetForm();
    setShowModal(false);
    setIsFormDirty(false);
  };

  const handleNavigation = (path: string) => {
    if (isFormDirty) {
      setPendingNavigation(path);
      setActionType("navigation");
      setShowModal(true);
    } else {
      router.push(path);
    }
  };

  const confirmNavigation = () => {
    console.log("Pending Navigation:", pendingNavigation);
    if (pendingNavigation) {
      router.push(pendingNavigation);
      setPendingNavigation(null);
      setShowModal(false);
      setIsFormDirty(false);
    }
  };

  // Warn user before closing or refreshing the browser
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isFormDirty) {
        e.preventDefault();
        e.returnValue = ""; // Trigger browser's confirmation dialog
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isFormDirty]);

  // Detect navigation attempts and show confirmation
  useEffect(() => {
    const currentPath = pathname;
    const handleRouteChange = (nextPath: string) => {
      if (nextPath !== currentPath && isFormDirty) {
        setActionType("navigation");
        setPendingNavigation(nextPath);
        setShowModal(true);
        throw "Navigation aborted"; // Cancel navigation
      }
    };

    router.prefetch(pathname); // Prefetch for optimization

    return () => {
      // Cleanup if component unmounts
    };
  }, [isFormDirty, pathname]);

  return {
    isFormDirty,
    setIsFormDirty,
    showModal,
    setShowModal,
    actionType,
    handleBack,
    confirmBack,
    handleReset,
    confirmReset,
    handleNavigation,
    confirmNavigation,
    isResetDisabled,
  };
};
