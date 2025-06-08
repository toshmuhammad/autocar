import { useEffect, useState } from "react";

export function useCars() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [skip, setSkip] = useState(0);
  const [brand, setBrand] = useState("");
  const [brands, setBrands] = useState([]);

  const extractArray = (raw) =>
    Array.isArray(raw?.data)
      ? raw.data
      : Array.isArray(raw?.cars)
      ? raw.cars
      : Array.isArray(raw)
      ? raw
      : [];

  const fetchCars = async () => {
    try {
      setLoading(true);

      const url = `https://json-api.uz/api/project/fn37/cars?skip=${skip}&limit=5${brand ? `&brand=${brand}` : ""}`;
      const res = await fetch(url);
      const data = await res.json();

      const currentCars = extractArray(data);
      setCars(currentCars);
      console.log("Fetched cars:", currentCars);

      const allRes = await fetch("https://json-api.uz/api/project/fn37/cars");
      const allData = await allRes.json();
      const allCars = extractArray(allData);

      const uniqueBrands = [...new Set(allCars.map((c) => c.brand))];
      setBrands(uniqueBrands);
    } catch (error) {
      console.error("Xatolik fetchCars funksiyasida:", error);
      setCars([]);
      setBrands([]);
    } finally {
      setLoading(false);
    }
  };

  const deleteCar = async (id) => {
    try {
      await fetch(`https://json-api.uz/api/project/fn37/cars/${id}`, {
        method: "DELETE",
      });
      fetchCars();
    } catch (error) {
      console.error("Xatolik deleteCar funksiyasida:", error);
    }
  };

  useEffect(() => {
    fetchCars();
  }, [skip, brand]);

  return {
    cars,
    loading,
    skip,
    setSkip,
    brand,
    setBrand,
    brands,
    fetchCars,
    deleteCar,
  };
}
