import React, { useState } from 'react';

// Mock Database for Local Demo
const MOCK_ORDERS = [
    { id: '1', number: '25-05-13-021-ABC', status: 'Installed', updated: '2026-06-09 14:30', date: '2026-06-07', estDelivery: '2026-06-12', items: [{ name: 'Die & Base', color: 'Jet Black', qty: 1 }] },
    { id: '2', number: '26-02-16-001-XYZ', status: 'Completed', updated: '2026-06-05 11:15', date: '2026-06-01', estDelivery: '2026-06-05', items: [{ name: 'Slant', color: 'Barre Gray', qty: 2 }] },
    { id: '3', number: '26-02-16-003-DEF', status: 'Stock Enroute', updated: '2026-06-10 10:45', date: '2026-06-09', estDelivery: '2026-06-05', items: [{ name: 'Flush Marker', color: 'GA Gray', qty: 1 }] }
];

export default function OrderPortal() {
    const [currentPage, setCurrentPage] = useState('login'); // 'login', 'dashboard', 'details'
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    // Vector render of your circle badge graphic that avoids long hotlink text truncation
    const badgeLogo = "data:image/svg+xml;utf8,<svg viewBox='0 0 100 100' xmlns='http://w3.org'><circle cx='50' cy='50' r='46' fill='%23111827' stroke='%2334d399' stroke-width='2'/><circle cx='50' cy='50' r='38' fill='%23991b1b'/><text x='50' y='55' font-size='24' text-anchor='middle'>🌹</text></svg>";

    return (
        <div className="min-h-screen bg-gray-50 text-gray-900 font-sans flex flex-col justify-start items-center p-4">
            
            {/* PERSISTENT HEADER FOR DASHBOARD AND DETAILS */}
            {currentPage !== 'login' && (
                <div className="w-full max-w-4xl bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-4 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <img src={badgeLogo} alt="Logo" className="h-12 w-12 object-contain" />
                        <div className="flex flex-col text-left">
                            <span className="font-serif text-lg font-bold tracking-tight text-red-900">Abby Rose Inc.</span>
                            <span className="text-[10px] tracking-widest text-emerald-700 uppercase font-bold">Monuments and Memorials</span>
                        </div>
                    </div>
                    <button onClick={() => setCurrentPage('login')} className="text-sm font-medium text-gray-500 hover:text-red-600 transition">Logout</button>
                </div>
            )}

            {/* PAGE 1: LOGIN SCREEN */}
            {currentPage === 'login' && (
                <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md border border-gray-100 my-auto">
                    {/* CUSTOM ALIGNED LOGO ROW */}
                    <div className="flex items-center justify-start gap-4 mb-8 bg-gray-50 p-4 rounded-2xl border border-gray-100 shadow-inner">
                        {/* Circle Badge Logo Placed on Left */}
                        <img src={badgeLogo} alt="Abby Rose Logo" className="h-16 w-16 object-contain shrink-0" />
                        
                        {/* Typography Header Blocks Placed on Right */}
                        <div className="flex flex-col text-left">
                            <span className="font-serif text-2xl font-bold tracking-wide text-red-900 leading-tight">Abby Rose Inc.</span>
                            <span className="text-[10px] tracking-wider text-emerald-700 uppercase font-bold mt-1">Monuments and Memorials</span>
                        </div>
                    </div>
                    
                    <h2 className="text-xl font-bold text-center text-gray-800 mb-6">Customer Order Portal</h2>
                    <form onSubmit={(e) => { e.preventDefault(); if (username && password) setCurrentPage('dashboard'); }} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                            <input type="text" required value={username} onChange={e => setUsername(e.target.value)} className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-red-700 outline-none" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                            <input type="password" required value={password} onChange={e => setPassword(e.target.value)} className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-red-700 outline-none" />
                        </div>
                        <button type="submit" className="w-full bg-red-800 hover:bg-red-900 text-white font-medium py-2.5 rounded-lg transition shadow-sm">Sign In</button>
                    </form>
                </div>
            )}

            {/* PAGE 2: ORDER DASHBOARD */}
            {currentPage === 'dashboard' && (
                <div className="w-full max-w-4xl bg-white p-6 rounded-xl shadow-md border border-gray-100">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold text-gray-800">Your Orders</h2>
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
                                            <button onClick={() => { setSelectedOrder(order); setCurrentPage('details'); }} className="text-red-800 font-semibold hover:underline">
                                                {order.number}
                                            </button>
                                        </td>
                                        <td className="p-3">
                                            <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-red-50 text-red-800">
                                                {order.status}
                                            </span>
                                        </td>
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
                <div className="w-full max-w-4xl bg-white p-6 rounded-xl shadow-md border border-gray-100">
                    <button onClick={() => setCurrentPage('dashboard')} className="mb-4 text-red-800 hover:underline text-sm font-medium flex items-center gap-1">← Back to Dashboard</button>

                    <h2 className="text-xl font-bold mb-4 text-gray-800">Order Details: {selectedOrder.number}</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-b pb-6 mb-6 text-sm">
                        <div>
                            <p className="text-gray-500">Order Date</p>
                            <p className="font-medium text-base text-gray-800">{selectedOrder.date}</p>
                        </div>
                        <div>
                            <p className="text-gray-500">Estimated Delivery Date</p>
                            <p className="font-medium text-base text-green-700">{selectedOrder.estDelivery}</p>
                        </div>
                    </div>

                    <div className="mb-6">
                        <h3 className="font-bold text-gray-700 mb-2">Items Ordered</h3>
                        {selectedOrder.items.map((item, idx) => (
                            <div key={idx} className="flex justify-between items-center bg-gray-50 p-3 rounded-lg border text-sm">
                                <div>
                                    <p className="font-semibold text-gray-800">{item.name}</p>
                                    <p className="text-gray-500">Color: {item.color}</p>
                                </div>
                                <p className="font-medium text-gray-800">Qty: {item.qty}</p>
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
