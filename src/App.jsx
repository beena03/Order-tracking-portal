import React, { useState } from 'react';

const MOCK_ORDERS = [
    { id: '1', number: '25-05-13-021-ABC', status: 'Installed', updated: '2026-06-09 14:30', date: '2026-06-07', estDelivery: '2026-06-12', items: [{ name: 'Die & Base', color: 'Jet Black', qty: 1 }] },
    { id: '2', number: '26-02-16-001-XYZ', status: 'Completed', updated: '2026-06-05 11:15', date: '2026-06-01', estDelivery: '2026-06-05', items: [{ name: 'Slant', color: 'Barre Gray', qty: 2 }] },
    { id: '3', number: '26-02-16-003-DEF', status: 'Stock Enroute', updated: '2026-06-10 10:45', date: '2026-06-09', estDelivery: '2026-06-05', items: [{ name: 'Flush Marker', color: 'GA Gray', qty: 1 }] }
];

export default function OrderPortal() {
    const [currentPage, setCurrentPage] = useState('login');
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const logoUrl = "https://clearbit.com";
    const steps = ['Stock Enroute', 'Stock Arrived', 'Sandblasting', 'Completed', 'Installed'];

    return (
        <div className="min-h-screen bg-gray-50 text-gray-900 font-sans flex flex-col items-center p-4">
            {currentPage !== 'login' && (
                <div className="w-full max-w-4xl bg-white p-4 rounded-xl shadow-sm border mb-4 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <img src={logoUrl} alt="Logo" className="h-10 w-10 object-contain rounded-full bg-gray-900" />
                        <div className="flex flex-col text-left">
                            <span className="font-serif text-lg font-bold text-red-900 leading-tight">Abby Rose Inc.</span>
                            <span className="text-[10px] tracking-widest text-emerald-700 font-bold uppercase">Monuments and Memorials</span>
                        </div>
                    </div>
                    <button onClick={() => setCurrentPage('login')} className="text-sm font-medium text-gray-500 hover:text-red-600">Logout</button>
                </div>
            )}

            {currentPage === 'login' && (
                <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md border border-gray-100 my-auto">
                    <div className="flex items-center justify-start gap-4 mb-8 bg-gray-50 p-4 rounded-2xl border border-gray-100 shadow-inner">
                        <img src={logoUrl} alt="Logo" className="h-14 w-14 object-contain rounded-full bg-gray-900 shrink-0 shadow-md" />
                        <div className="flex flex-col text-left">
                            <span className="font-serif text-xl font-bold tracking-wide text-red-900 leading-tight">Abby Rose Inc.</span>
                            <span className="text-[10px] tracking-wider text-emerald-700 font-bold uppercase mt-1">Monuments and Memorials</span>
                        </div>
                    </div>
                    <h2 className="text-xl font-bold text-center text-gray-800 mb-6">Customer Order Portal</h2>
                    <form onSubmit={(e) => { e.preventDefault(); if (username && password) setCurrentPage('dashboard'); }} className="space-y-4">
                        <input type="text" placeholder="Username" required value={username} onChange={e => setUsername(e.target.value)} className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-red-700 outline-none" />
                        <input type="password" placeholder="Password" required value={password} onChange={e => setPassword(e.target.value)} className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-red-700 outline-none" />
                        <button type="submit" className="w-full bg-red-800 hover:bg-red-900 text-white font-medium py-2.5 rounded-lg transition shadow-sm">Sign In</button>
                    </form>
                </div>
            )}

            {currentPage === 'dashboard' && (
                <div className="w-full max-w-4xl bg-white p-6 rounded-xl shadow-md border border-gray-100">
                    <h2 className="text-xl font-bold mb-4">Your Orders</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b text-gray-500 text-sm bg-gray-50"><th className="p-3">Order Number</th><th className="p-3">Current Status</th><th className="p-3">Last Updated</th></tr>
                            </thead>
                            <tbody>
                                {MOCK_ORDERS.map(order => (
                                    <tr key={order.id} className="border-b hover:bg-gray-50 transition">
                                        <td className="p-3"><button onClick={() => { setSelectedOrder(order); setCurrentPage('details'); }} className="text-red-800 font-semibold hover:underline">{order.number}</button></td>
                                        <td className="p-3"><span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-red-50 text-red-800">{order.status}</span></td>
                                        <td className="p-3 text-sm text-gray-600">{order.updated}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {currentPage === 'details' && selectedOrder && (
                <div className="w-full max-w-4xl bg-white p-6 rounded-xl shadow-md border border-gray-100">
                    <button onClick={() => setCurrentPage('dashboard')} className="mb-4 text-red-800 hover:underline text-sm font-medium flex items-center gap-1">← Back to Dashboard</button>
                    <h2 className="text-xl font-bold mb-4">Order Details: {selectedOrder.number}</h2>
                    <div className="grid grid-cols-2 gap-4 border-b pb-6 mb-6 text-sm">
                        <div><p className="text-gray-500">Order Date</p><p className="font-medium text-base">{selectedOrder.date}</p></div>
                        <div><p className="text-gray-500">Estimated Delivery Date</p><p className="font-medium text-base text-green-700">{selectedOrder.estDelivery}</p></div>
                    </div>
                    <div className="mb-6">
                        <h3 className="font-bold text-gray-700 mb-2">Items Ordered</h3>
                        {selectedOrder.items.map((item, idx) => (
                            <div key={idx} className="flex justify-between items-center bg-gray-50 p-3 rounded-lg border text-sm">
                                string<div><p className="font-semibold">{item.name}</p><p className="text-gray-500">Color: {item.color}</p></div>
                                <p className="font-medium">Qty: {item.qty}</p>
                            </div>
                        ))}
                    </div>
                    <div className="border-t pt-4">
                        <h3 className="font-bold text-gray-700 mb-3">Status Progress</h3>
                        <div className="grid grid-cols-5 gap-2 text-center text-[10px] font-bold">
                            {steps.map((step, idx) => (
                                <div key={step} className={`p-2 rounded border ${idx <= steps.indexOf(selectedOrder.status) ? 'bg-red-800 text-white border-red-900' : 'bg-gray-100 text-gray-400 border-gray-200'}`}>{step}</div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
