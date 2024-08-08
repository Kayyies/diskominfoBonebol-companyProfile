// useNavigation.ts
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const useNavigation = () => {
  const [previousPath, setPreviousPath] = useState("");
  const pathName = usePathname();

  useEffect(() => {
    if (pathName) {
      const finalSlashIndex = pathName.lastIndexOf("/");
      setPreviousPath(pathName.slice(0, finalSlashIndex));
    }
  }, [pathName]);

  const handleKembali = () => {
    if (previousPath) {
      console.log("Kembali ke halaman:", previousPath);
      window.location.href = previousPath;
    }
  };

  return { handleKembali, previousPath };
};

export default useNavigation;
