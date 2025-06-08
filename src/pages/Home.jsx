// import { useState } from "react";
import { useCars } from "../hooks/useCars";
import { useWorkerSearch } from "../hooks/useWorkerSearch";
import CarCard from "../components/CarCard";
import SkeletonCard from "../components/SkeletonCard";

export default function Home() {
  const {
    cars,
    loading,
    skip,
    setSkip,
    brand,
    setBrand,
    brands,
    deleteCar,
    fetchCars,
  } = useCars();

  const { searchTerm, setSearchTerm, results, loading: searchLoading } = useWorkerSearch(cars);

  const displayedCars = searchTerm ? results : cars;
  const isLoading = loading || searchLoading;

  return (
    <div className="max-w-5xl mx-auto p-4">
      <div className="flex flex-col sm:flex-row items-center gap-4 mb-4">
        <input
          type="text"
          placeholder="Model yoki brand bo'yicha qidirish..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="input flex-grow"
        />
        <select
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          className="select w-48"
        >
          <option value="">Barcha modellar</option>
          {brands.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {isLoading
          ? Array(5)
              .fill(0)
              .map((_, i) => <SkeletonCard key={i} />)
          : displayedCars.map((car) => (
              <CarCard
                key={car.id}
                car={car}
                onDelete={() => deleteCar(car.id)}
                onEdit={fetchCars}
              />
            ))}
      </div>

      <div className="flex justify-center gap-4 mt-6">
        <button
          onClick={() => setSkip(Math.max(0, skip - 5))}
          disabled={skip === 0}
          className="btn text-green-500"
        >
          Oldin
        </button>
        <button
          onClick={() => setSkip(skip + 5)}
          disabled={displayedCars.length < 5}
          className="btn text-red-500"
        >
          Keyin
        </button>
      </div>
    </div>
  );
}
