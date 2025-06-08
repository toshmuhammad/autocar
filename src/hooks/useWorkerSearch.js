import { useEffect, useState, useRef } from "react";

export function useWorkerSearch(cars) {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const workerRef = useRef(null);

  useEffect(() => {
    workerRef.current = new Worker(new URL("../workers/searchWorker.js", import.meta.url));
    workerRef.current.onmessage = (e) => {
      setResults(e.data);
      setLoading(false);
    };
    return () => {
      workerRef.current.terminate();
    };
  }, []);

  useEffect(() => {
    if (!searchTerm) {
      setResults(cars);
      setLoading(false);
      return;
    }
    setLoading(true);
    workerRef.current.postMessage({ cars, searchTerm });
  }, [searchTerm, cars]);

  return { searchTerm, setSearchTerm, results, loading };
}
