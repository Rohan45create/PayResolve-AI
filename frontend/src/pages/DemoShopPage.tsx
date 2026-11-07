import { useState } from 'react';
import { AppLayout } from '../components/AppLayout';

interface Product {
  id: string;
  name: string;
  price: number;
}

const products: Product[] = [
  { id: 'mug', name: 'Ceramic mug', price: 24.00 },
  { id: 'tote', name: 'Canvas tote', price: 38.50 },
  { id: 'notebook', name: 'Notebook set', price: 22.00 },
];

export default function DemoShopPage() {
  const [cart, setCart] = useState<{ [id: string]: number }>({
    mug: 1,
    tote: 1
  });

  // Fault switches
  const [failWebhook, setFailWebhook] = useState(true);
  const [dropWebhook, setDropWebhook] = useState(false);
  const [alterTotal, setAlterTotal] = useState(false);
  const [duplicateDelivery, setDuplicateDelivery] = useState(false);

  // Recent orders
  const [orders, setOrders] = useState([
    { id: '#10482', status: 'Pending' },
    { id: '#10479', status: 'Paid' },
    { id: '#10477', status: 'Paid' }
  ]);

  const addToCart = (id: string) => {
    setCart(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  const calculateTotal = () => {
    return Object.entries(cart).reduce((sum, [id, qty]) => {
      const prod = products.find(p => p.id === id);
      return sum + (prod ? prod.price * qty : 0);
    }, 0);
  };

  const handlePayPalCheckout = () => {
    const newOrderId = `#${Math.floor(10483 + Math.random() * 100)}`;
    const newStatus = failWebhook ? 'Pending' : 'Paid';
    
    setOrders(prev => [{ id: newOrderId, status: newStatus }, ...prev]);
    
    alert(`PayPal Sandbox order created! 
Capture executed: $${calculateTotal().toFixed(2)} USD.
${failWebhook ? 'Fault Switch Active: Webhook handler simulated failure. Order marked as PENDING in store.' : 'Order marked as PAID.'}`);
  };

  const handleResetState = () => {
    setFailWebhook(true);
    setDropWebhook(false);
    setAlterTotal(false);
    setDuplicateDelivery(false);
    alert('Fault switches reset to baseline demonstration state.');
  };

  return (
    <AppLayout>
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Demo shop
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              A tiny merchant for real Sandbox payments. Fault switches break it on purpose.
            </p>
          </div>

          <div>
            <span className="text-xs font-semibold px-3 py-1 rounded-full border border-blue-200 bg-blue-50 text-blue-700">
              Sandbox
            </span>
          </div>
        </div>

        {/* 2 Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Products & Checkout */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Product Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {products.map(prod => (
                <div key={prod.id} className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 flex items-center justify-between">
                  <div className="space-y-1">
                    <h4 className="font-bold text-slate-900 text-sm">{prod.name}</h4>
                    <div className="text-sm font-semibold text-slate-600 font-mono">${prod.price.toFixed(2)}</div>
                  </div>
                  <button
                    onClick={() => addToCart(prod.id)}
                    className="px-4 py-1.5 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold shadow-xs cursor-pointer"
                  >
                    Add
                  </button>
                </div>
              ))}
            </div>

            {/* Checkout Card */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-5">
              <h3 className="font-bold text-slate-900 text-base">Checkout</h3>

              <div className="divide-y divide-slate-100 text-xs sm:text-sm">
                {Object.entries(cart).map(([id, qty]) => {
                  const prod = products.find(p => p.id === id);
                  if (!prod || qty <= 0) return null;
                  return (
                    <div key={id} className="py-2.5 flex items-center justify-between">
                      <span className="text-slate-700">{prod.name} x {qty}</span>
                      <span className="font-mono text-slate-900 font-medium">${(prod.price * qty).toFixed(2)}</span>
                    </div>
                  );
                })}
              </div>

              <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-base font-bold text-slate-900">
                <span>Total</span>
                <span className="font-mono">${calculateTotal().toFixed(2)}</span>
              </div>

              <button
                onClick={handlePayPalCheckout}
                className="w-full py-3 px-4 rounded-xl bg-[#0066d6] hover:bg-blue-700 text-white font-semibold text-sm shadow-xs cursor-pointer flex items-center justify-center space-x-2"
              >
                <span>Pay with PayPal Sandbox</span>
              </button>

              <p className="text-[11px] text-slate-400 text-center">
                Approve with the sandbox buyer account. Capture happens on the server.
              </p>
            </div>

          </div>

          {/* Right: Fault Switches & Recent Orders */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Fault Switches Card */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-4">
              <div className="flex items-center space-x-2">
                <h3 className="font-bold text-slate-900 text-base">Fault switches</h3>
                <span className="text-[10px] font-semibold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                  Demo only
                </span>
              </div>

              <div className="space-y-4 pt-1">
                
                <label className="flex items-start space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={failWebhook}
                    onChange={(e) => setFailWebhook(e.target.checked)}
                    className="w-4 h-4 text-blue-600 rounded border-slate-300 mt-0.5"
                  />
                  <div>
                    <div className="text-xs font-bold text-slate-900">Fail webhook handler</div>
                    <div className="text-[11px] text-slate-500">Capture succeeds, order stays pending</div>
                  </div>
                </label>

                <label className="flex items-start space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={dropWebhook}
                    onChange={(e) => setDropWebhook(e.target.checked)}
                    className="w-4 h-4 text-blue-600 rounded border-slate-300 mt-0.5"
                  />
                  <div>
                    <div className="text-xs font-bold text-slate-900">Drop webhook</div>
                    <div className="text-[11px] text-slate-500">PayPal event never reaches the app</div>
                  </div>
                </label>

                <label className="flex items-start space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={alterTotal}
                    onChange={(e) => setAlterTotal(e.target.checked)}
                    className="w-4 h-4 text-blue-600 rounded border-slate-300 mt-0.5"
                  />
                  <div>
                    <div className="text-xs font-bold text-slate-900">Alter order total</div>
                    <div className="text-[11px] text-slate-500">Order total differs from the capture</div>
                  </div>
                </label>

                <label className="flex items-start space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={duplicateDelivery}
                    onChange={(e) => setDuplicateDelivery(e.target.checked)}
                    className="w-4 h-4 text-blue-600 rounded border-slate-300 mt-0.5"
                  />
                  <div>
                    <div className="text-xs font-bold text-slate-900">Duplicate delivery</div>
                    <div className="text-[11px] text-slate-500">Same event delivered twice</div>
                  </div>
                </label>

              </div>

              <div className="pt-2 border-t border-slate-100">
                <button
                  onClick={handleResetState}
                  className="px-4 py-2 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold shadow-xs cursor-pointer"
                >
                  Reset demo state
                </button>
              </div>
            </div>

            {/* Recent Orders Card */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-4">
              <h3 className="font-bold text-slate-900 text-base">Recent orders</h3>

              <div className="divide-y divide-slate-100 text-xs sm:text-sm">
                {orders.map((ord, idx) => (
                  <div key={idx} className="py-2.5 flex items-center justify-between">
                    <span className="font-mono text-slate-900 font-semibold">{ord.id}</span>
                    <span className={`text-[11px] font-medium px-2.5 py-0.5 rounded-full border ${
                      ord.status === 'Pending'
                        ? 'border-amber-300 text-amber-700 bg-amber-50/60'
                        : 'border-emerald-300 text-emerald-700 bg-emerald-50/60'
                    }`}>
                      {ord.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </AppLayout>
  );
}
