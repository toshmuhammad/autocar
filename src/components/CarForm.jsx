import { useState } from "react";
import { toast } from "sonner";

export default function CarForm({ onSuccess, defaultData = {} }) {
  const [form, setForm] = useState({
    brand: defaultData.brand || "",
    model: defaultData.model || "",
    price: defaultData.price || "",
    thumbnail: defaultData.thumbnail || ""
  });
  const [loading, setLoading] = useState(false);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("https://json-api.uz/api/project/fn37/upload", {
      method: "POST",
      body: formData
    });
    const data = await res.json();
    setForm({ ...form, thumbnail: data.url });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.brand || !form.model || !form.price || !form.thumbnail) {
      return toast.error("Barcha maydonlarni to‘ldiring");
    }
    setLoading(true);
    const method = defaultData.id ? "PATCH" : "POST";
    const url = defaultData.id
      ? `https://json-api.uz/api/project/fn37/cars/${defaultData.id}`
      : "https://json-api.uz/api/project/fn37/cars";
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });
    setLoading(false);
    if (res.ok) {
      toast.success("Muvaffaqiyatli saqlandi");
      onSuccess?.();
    } else {
      toast.error("Xatolik yuz berdi");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <input
        className="input w-full"
        placeholder="Brand"
        value={form.brand}
        onChange={(e) => setForm({ ...form, brand: e.target.value })}
      />
      <input
        className="input w-full"
        placeholder="Model"
        value={form.model}
        onChange={(e) => setForm({ ...form, model: e.target.value })}
      />
      <input
        className="input w-full"
        placeholder="Narxi"
        type="number"
        value={form.price}
        onChange={(e) => setForm({ ...form, price: e.target.value })}
      />
      <input type="file" onChange={handleUpload} />
      {form.thumbnail && (
        <img src={form.thumbnail} alt="preview" className="h-32 mt-2 rounded" />
      )}
      <button className="btn w-full" disabled={loading}>
        {loading ? "Yuklanmoqda..." : "Saqlash"}
      </button>
    </form>
  );
}
