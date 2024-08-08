import { useState, useCallback, useEffect } from "react";

interface DataItem {
  category?: string;
  title?: string;
  createdAt?: string;
  desc?: string;
  slugLink?: URL;
  logo?: string;
}

const useRefreshData = (
  initialData: DataItem[],
  fetchData: () => Promise<DataItem[]>,
): [DataItem[], boolean, () => void] => {
  const [data, setData] = useState<DataItem[]>(initialData);
  const [isLoading, setIsLoading] = useState(false);

  const refreshData = useCallback(async () => {
    setIsLoading(true);
    console.log("Fetching data...");

    setData([]); // Clear the data to show loading state

    try {
      const newData = await fetchData();
      setData(newData);
      console.log("Data fetched successfully.");
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setIsLoading(false);
    }
  }, [fetchData]);

  useEffect(() => {
    refreshData(); // Fetch data when the component mounts
  }, [refreshData]);

  return [data, isLoading, refreshData];
};

export default useRefreshData;
