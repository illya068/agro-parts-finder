import React, { useState } from 'react';
import { parts, categories } from './data';
import { Search, Phone, ShoppingCart } from 'lucide-react';

export default function App() {
  const [activeCategory, setActiveCategory] = useState("Усі");
  const [search, setSearch] = useState("");

  const filteredParts = parts.filter(p => 
    (activeCategory === "Усі" || p.category === activeCategory) &&
    (p.name.toLowerCase().includes(search.toLowerCase()) || p.sku.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <header className="bg-blue-900 text-white p-4 shadow-md">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-black tracking-tighter">ЗАХІД ГЕНПОСТАЧ</h1>
          <a href="tel:+380506884095" className="bg-yellow-500 text-black px-4 py-2 rounded-full font-bold flex items-center gap-2">
            <Phone size={18}/> Зателефонувати
          </a>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-4">
        <div className="my-6 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 text-gray-400" size={20}/>
            <input 
              type="text" 
              placeholder="Пошук запчастин за назвою або номером..." 
              className="w-full p-3 pl-10 border-2 border-gray-200 rounded-xl focus:border-yellow-500 outline-none"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
            {categories.map(cat => (
              <button 
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-lg whitespace-nowrap font-medium transition ${activeCategory === cat ? 'bg-yellow-500 text-black' : 'bg-white border border-gray-200'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredParts.map(part => (
            <div key={part.id} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="aspect-video bg-gray-100 rounded-xl mb-4 flex items-center justify-center text-gray-400 font-medium">Фото додається</div>
              <h3 className="font-bold text-lg leading-tight mb-1">{part.name}</h3>
              <p className="text-blue-700 font-mono text-sm mb-3">Код: {part.sku}</p>
              <div className="flex justify-between items-center pt-4 border-t">
                <span className="text-2xl font-black text-gray-900">{part.price} ₴</span>
                <button className="bg-blue-900 text-white p-3 rounded-xl hover:bg-blue-800 transition">
                  <ShoppingCart size={20}/>
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
