import { useEffect, useState } from "react";

type Item = {
  id: number;
  sku: string;
  name: string;
  category: string;
  base_unit: string;
  stock_managed: boolean;
  note?: string;
  created_at?: string;
  updated_at?: string;
};

export default function App() {
  const [items, setItems] = useState<Item[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    fetch("/api/items")
      .then((res) => {
        if (!res.ok) throw new Error("API error");
        return res.json();
      })
      .then((data) => setItems(data))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto bg-white shadow rounded-xl p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          AppBase
        </h1>

        {error && (
          <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4">
            {error}
          </div>
        )}

        {items.length === 0 ? (
          <p className="text-gray-500">No items yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-200 text-left text-sm uppercase tracking-wider">
                  <th className="p-3">ID</th>
                  <th className="p-3">SKU</th>
                  <th className="p-3">Name</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">Unit</th>
                  <th className="p-3">Managed</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="p-3 text-sm text-gray-700">{item.id}</td>
                    <td className="p-3 font-mono text-sm">
                      {item.sku}
                    </td>
                    <td className="p-3 text-sm">{item.name}</td>
                    <td className="p-3 text-sm capitalize">
                      {item.category}
                    </td>
                    <td className="p-3 text-sm">{item.base_unit}</td>
                    <td className="p-3 text-sm">
                      {item.stock_managed ? (
                        <span className="text-green-600 font-semibold">
                          Yes
                        </span>
                      ) : (
                        <span className="text-gray-400">No</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
