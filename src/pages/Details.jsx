import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CarSlider from "../components/CarSlider";
import SkeletonCard from "../components/SkeletonCard";

export default function Details() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCar() {
      setLoading(true);
      const res = await fetch(`https://json-api.uz/api/project/fn37/cars/${id}`);
      if (!res.ok) {
        navigate("/");
        return;
      }
      const data = await res.json();
      setCar(data);
      setLoading(false);
    }
    fetchCar();
  }, [id, navigate]);

  if (loading) return <SkeletonCard />;

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-bold">{car.brand} {car.model}</h1>
      <CarSlider images={car.images || [car.thumbnail]} />
      <p className="text-lg">Narxi: {car.price} $</p>
      <p className="text-gray-700">{car.description || "Ta'rif mavjud emas."}</p>
    </div>
  );
}
