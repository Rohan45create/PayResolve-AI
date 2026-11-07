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
    tote: 1,
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
    { id: '#10477', status: 'Paid' },
  ]);

  const addToCart = (id: string) => {
    setCart((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  const handlePayPalCheckout = () => {
    const newOrderId = `#${Math.floor(10483 + Math.random() * 100)}`;
    const newStatus = failWebhook ? 'Pending' : 'Paid';
    setOrders((prev) => [{ id: newOrderId, status: newStatus }, ...prev]);
    const totalAmount = Object.entries(cart).reduce((sum, [pid, qty]) => {
      const p = products.find((x) => x.id === pid);
      return sum + (p ? p.price * qty : 0);
    }, 0);
    alert(
      `PayPal Sandbox payment submitted for $${totalAmount > 0 ? totalAmount.toFixed(2) : '62.50'}.\n${
        failWebhook
          ? 'Fault simulated: webhook failed handler. Order remains Pending in merchant store.'
          : 'Payment captured and marked Paid.'
      }`,
    );
  };

  const handleResetState = () => {
    setFailWebhook(true);
    setDropWebhook(false);
    setAlterTotal(false);
    setDuplicateDelivery(false);
  };

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto space-y-7">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
              Demo shop
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              A tiny merchant for real Sandbox payments. Fault switches break it on purpose.
            </p>
          </div>
          <div>
            <span className="px-3.5 py-1 rounded-full border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-normal">
              Sandbox
            </span>
          </div>
        </div>

        {/* 2-Column Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Column: Products & Checkout */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Products grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {products.map((prod) => (
                <div
                  key={prod.id}
                  className="bg-white dark:bg-[#0e1522] rounded-2xl border border-slate-200/90 dark:border-slate-800/90 p-6 flex items-center justify-between shadow-2xs"
                >
                  <div>
                    <h2 className="text-sm font-semibold text-slate-900 dark:text-white">{prod.name}</h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">${prod.price.toFixed(2)}</p>
                  </div>
                  <button
                    onClick={() => addToCart(prod.id)}
                    className="px-4 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-medium text-slate-700 dark:text-slate-300 cursor-pointer transition-colors"
                  >
                    Add
                  </button>
                </div>
              ))}
            </div>

            {/* Checkout Card */}
            <div className="bg-white dark:bg-[#0e1522] rounded-2xl border border-slate-200/90 dark:border-slate-800/90 p-6 space-y-4 shadow-2xs">
              <h2 className="text-base font-bold text-slate-900 dark:text-white">Checkout</h2>

              <div className="divide-y divide-slate-100 dark:divide-slate-800/70 text-sm">
                <div className="py-2.5 flex items-center justify-between text-slate-700 dark:text-slate-300">
                  <span>Ceramic mug x 1</span>
                  <span>$24.00</span>
                </div>
                <div className="py-2.5 flex items-center justify-between text-slate-700 dark:text-slate-300">
                  <span>Canvas tote x 1</span>
                  <span>$38.50</span>
                </div>
                <div className="py-3 flex items-center justify-between font-semibold text-slate-900 dark:text-white">
                  <span>Total</span>
                  <span>$62.50</span>
                </div>
              </div>

              <div className="pt-2 space-y-2">
                <button
                  onClick={handlePayPalCheckout}
                  className="px-5 py-2.5 rounded-lg bg-[#0066cc] hover:bg-blue-600 active:scale-[0.98] text-white font-medium text-xs sm:text-sm shadow-sm cursor-pointer transition-all"
                >
                  Pay with PayPal Sandbox
                </button>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Approve with the sandbox buyer account. Capture happens on the server.
                </p>
              </div>
            </div>

          </div>

          {/* Right Column: Fault Switches & Recent Orders */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Fault Switches Card */}
            <div className="bg-white dark:bg-[#0e1522] rounded-2xl border border-slate-200/90 dark:border-slate-800/90 p-6 space-y-5 shadow-2xs">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-bold text-slate-900 dark:text-white">Fault switches</h2>
                <span className="px-2.5 py-0.5 rounded-full border border-amber-600/50 text-amber-600 dark:text-amber-400 text-xs font-normal">
                  Demo only
                </span>
              </div>

              <div className="space-y-4 text-xs sm:text-sm">
                {/* Switch 1 */}
                <label className="flex items-start space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={failWebhook}
                    onChange={(e) => setFailWebhook(e.target.checked)}
                    className="mt-0.5 w-4 h-4 rounded text-blue-600 border-slate-300 focus:ring-blue-500"
                  />
                  <div>
                    <span className="font-semibold text-slate-900 dark:text-white block">Fail webhook handler</span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">Capture succeeds, order stays pending</span>
                  </div>
                </label>

                {/* Switch 2 */}
                <label className="flex items-start space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={dropWebhook}
                    onChange={(e) => setDropWebhook(e.target.checked)}
                    className="mt-0.5 w-4 h-4 rounded text-blue-600 border-slate-300 focus:ring-blue-500"
                  />
                  <div>
                    <span className="font-semibold text-slate-900 dark:text-white block">Drop webhook</span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">PayPal event never reaches the app</span>
                  </div>
                </label>

                {/* Switch 3 */}
                <label className="flex items-start space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={alterTotal}
                    onChange={(e) => setAlterTotal(e.target.checked)}
                    className="mt-0.5 w-4 h-4 rounded text-blue-600 border-slate-300 focus:ring-blue-500"
                  />
                  <div>
                    <span className="font-semibold text-slate-900 dark:text-white block">Alter order total</span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">Order total differs from the capture</span>
                  </div>
                </label>

                {/* Switch 4 */}
                <label className="flex items-start space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={duplicateDelivery}
                    onChange={(e) => setDuplicateDelivery(e.target.checked)}
                    className="mt-0.5 w-4 h-4 rounded text-blue-600 border-slate-300 focus:ring-blue-500"
                  />
                  <div>
                    <span className="font-semibold text-slate-900 dark:text-white block">Duplicate delivery</span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">Same event delivered twice</span>
                  </div>
                </label>
              </div>

              <div className="pt-2">
                <button
                  onClick={handleResetState}
                  className="px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer shadow-2xs"
                >
                  Reset demo state
                </button>
              </div>
            </div>

            {/* Recent Orders Card */}
            <div className="bg-white dark:bg-[#0e1522] rounded-2xl border border-slate-200/90 dark:border-slate-800/90 p-6 space-y-4 shadow-2xs">
              <h2 className="text-base font-bold text-slate-900 dark:text-white">Recent orders</h2>

              <div className="divide-y divide-slate-100 dark:divide-slate-800/70 text-xs sm:text-sm">
                {orders.map((ord) => (
                  <div key={ord.id} className="py-3 flex items-center justify-between first:pt-0 last:pb-0">
                    <span className="font-mono text-slate-700 dark:text-slate-300">{ord.id}</span>
                    <span
                      className={`px-3 py-0.5 rounded-full border text-xs font-normal ${
                        ord.status === 'Pending'
                          ? 'border-amber-600/60 text-amber-600 dark:text-amber-400'
                          : 'border-emerald-600/60 text-emerald-600 dark:text-emerald-400'
                      }`}
                    >
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
