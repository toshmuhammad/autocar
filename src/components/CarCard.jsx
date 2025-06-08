import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CarModal from "./CarModal";

export default function CarCard({ car, onDelete }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="border rounded-xl p-4 space-y-2 shadow">
      <img
        src={car.thumbnail}
        alt={car.model}
        className="w-full h-48 object-cover rounded cursor-pointer"
        onClick={() => navigate(`/car/${car.id}`)}
      />
      <h2 className="text-lg font-bold">
        {car.brand} {car.model}
      </h2>
      <p>{car.price} $</p>
      <div className="flex gap-2">
        <button className="btn" onClick={() => setOpen(true)}>
          Tahrirlash
        </button>
        <button className="btn btn-error" onClick={() => onDelete(car.id)}>
          O‘chirish
        </button>
      </div>
      <CarModal open={open} setOpen={setOpen} defaultData={car} />
    </div>
  );
}
