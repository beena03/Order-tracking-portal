import React, { useState } from 'react';

// Mock Database for Local Demo
const MOCK_ORDERS = [
    { id: '1', number: 'ORD-2026-001', status: 'Installed', updated: '2026-06-09 14:30', date: '2026-06-07', estDelivery: '2026-06-12', items: [{ name: 'Die & Base', color: 'Jet Black', qty: 1 }] },
    { id: '2', number: 'ORD-2026-002', status: 'Completed', updated: '2026-06-05 11:15', date: '2026-06-01', estDelivery: '2026-06-05', items: [{ name: 'Slant', color: 'Barre Gray', qty: 2 }] }
];

export default function OrderPortal() {
    const [currentPage, setCurrentPage] = useState('login'); // 'login', 'dashboard', 'details'
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        if (username && password) setCurrentPage('dashboard');
    };

    return (
        <div className="min-h-screen bg-gray-50 text-gray-900 font-sans flex flex-col justify-center items-center p-4">

            {/* PAGE 1: LOGIN SCREEN */}
            {currentPage === 'login' && (
                <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md border border-gray-100">
                    <h2 className="text-2xl font-bold text-center mb-6">Customer Order Portal</h2>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                            <input type="text" required value={username} onChange={e => setUsername(e.target.value)} className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                            <input type="password" required value={password} onChange={e => setPassword(e.target.value)} className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                        </div>
                        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg transition">Sign In</button>
                    </form>
                </div>
            )}

            {/* PAGE 2: ORDER DASHBOARD */}
            {currentPage === 'dashboard' && (
                <div className="w-full max-w-4xl bg-white p-6 rounded-xl shadow-md border border-gray-100">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold">Your Orders</h2>
                        <button onClick={() => setCurrentPage('login')} className="text-sm text-gray-500 hover:text-red-600">Logout</button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b text-gray-500 text-sm bg-gray-50">
                                    <th className="p-3">Order Number</th>
                                    <th className="p-3">Current Status</th>
                                    <th className="p-3">Last Updated</th>
                                </tr>
                            </thead>
                            <tbody>
                                {MOCK_ORDERS.map(order => (
                                    <tr key={order.id} className="border-b hover:bg-gray-50 transition">
                                        <td className="p-3">
                                            <button onClick={() => { setSelectedOrder(order); setCurrentPage('details'); }} className="text-blue-600 font-semibold hover:underline">
                                                {order.number}
                                            </button>
                                        </td>
                                        <td className="p-3"><span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700">{order.status}</span></td>
                                        <td className="p-3 text-sm text-gray-600">{order.updated}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* PAGE 3: DETAILED ORDER VIEW */}
            {currentPage === 'details' && selectedOrder && (
                <div className="w-full max-w-3xl bg-white p-6 rounded-xl shadow-md border border-gray-100">
                    <button onClick={() => setCurrentPage('dashboard')} className="mb-4 text-blue-600 hover:underline text-sm font-medium flex items-center gap-1">← Back to Dashboard</button>

                    <h2 className="text-xl font-bold mb-4">Order Details: {selectedOrder.number}</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-b pb-6 mb-6 text-sm">
                        <div>
                            <p className="text-gray-500">Order Date</p>
                            <p className="font-medium text-base">{selectedOrder.date}</p>
                        </div>
                        <div>
                            <p className="text-gray-500">Estimated Delivery Date</p>
                            <p className="font-medium text-base text-green-600">{selectedOrder.estDelivery}</p>
                        </div>
                    </div>

                    <div className="mb-6">
                        <h3 className="font-bold text-gray-700 mb-2">Items Ordered</h3>
                        {selectedOrder.items.map((item, idx) => (
                            <div key={idx} className="flex justify-between items-center bg-gray-50 p-3 rounded-lg border text-sm">
                                <div>
                                    <p className="font-semibold">{item.name}</p>
                                    <p className="text-gray-500">Color: {item.color}</p>
                                </div>
                                <p className="font-medium">Qty: {item.qty}</p>
                            </div>
                        ))}
                    </div>

                    <div>
                        <h3 className="font-bold text-gray-700 mb-4">Status Tracking Flow</h3>
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 relative">
                            {['Stock Enroute', 'Stock Arrived', 'Sandblasting', 'Completed', 'Installed'].map((step, idx) => {
                                const steps = ['Stock Enroute', 'Stock Arrived', 'Sandblasting', 'Completed', 'Installed'];
                                const currentIdx = steps.indexOf(selectedOrder.status);
                                const isCompleted = idx <= currentIdx;
                                return (
                                    <div key={step} className="flex sm:flex-col items-center gap-2 flex-1 w-full">
                                        <div className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-bold ${isCompleted ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-400'}`}>
                                            {isCompleted ? '✓' : idx + 1}
                                        </div>
                                        <span className={`text-xs font-semibold ${isCompleted ? 'text-blue-600' : 'text-gray-400'}`}>{step}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
