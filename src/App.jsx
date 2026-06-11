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
    const [password] = useState('');

    return (
        <div className="min-h-screen bg-gray-50 text-gray-900 font-sans flex flex-col items-center p-4">
            {currentPage !== 'login' && (
                <div className="w-full max-w-4xl bg-white p-4 rounded-xl shadow-sm border mb-4 flex justify-between items-center">
                    <div>
                        <div className="font-serif text-lg font-bold text-red-900">Abby Rose Incorporated</div>
                        <div className="text-[10px] tracking-widest text-emerald-700 font-bold uppercase">Monuments and Memorials</div>
                    </div>
                    <button onClick={() => setCurrentPage('login')} className="text-sm text-gray-500 hover:text-red-600">Logout</button>
                </div>
            )}

            {currentPage === 'login' && (
                <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md border my-auto">
                    <div className="flex flex-col items-center mb-6 bg-gray-900 py-4 px-2 rounded-xl text-center shadow">
                        <span className="font-serif text-xl font-bold text-gray-100">Abby Rose Incorporated</span>
                        <span className="text-[9px] tracking-widest text-emerald-400 font-bold uppercase mt-1">Monuments and Memorials</span>
                    </div>
                    <h2 className="text-md font-bold text-center mb-4 text-gray-800">Customer Order Portal</h2>
                    <form onSubmit={(e) => { e.preventDefault(); if(username && password) setCurrentPage('dashboard'); }} className="space-y-4">
                        <input type="text" placeholder="Username" required value={username} onChange={e => setUsername(e.target.value)} className="w-full p-2 border rounded" />
                        <input type="password" placeholder="Password" required value={password} onChange={e => setPassword(e.target.value)} className="w-full p-2 border rounded" />
                        <button type="submit" className="w-full bg-red-800 text-white py-2 rounded font-medium hover:bg-red-900">Sign In</button>
                    </form>
                </div>
            )}

            {currentPage === 'dashboard' && (
                <div className="w-full max-w-4xl bg-white p-6 rounded-xl shadow border">
                    <h2 className="text-lg font-bold mb-4">Your Orders</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b bg-gray-50 text-sm text-gray-500"><th className="p-3">Order Number</th><th className="p-3">Status</th><th className="p-3">Updated</th></tr>
                            </thead>
                            <tbody>
                                {MOCK_ORDERS.map(order => (
                                    <tr key={order.id} className="border-b hover:bg-gray-50">
                                        <td className="p-3"><button onClick={() => { setSelectedOrder(order); setCurrentPage('details'); }} className="text-red-800 font-semibold hover:underline">{order.number}</button></td>
                                        <td className="p-3"><span className="px-2 py-0.5 rounded bg-red-50 text-red-800 text-xs font-bold">{order.status}</span></td>
                                        <td className="p-3 text-sm text-gray-600">{order.updated}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {currentPage === 'details' && selectedOrder && (
                <div className="w-full max-w-4xl bg-white p-6 rounded-xl shadow border">
                    <button onClick={() => setCurrentPage('dashboard')} className="mb-4 text-red-800 hover:underline text-sm font-medium">← Back to Dashboard</button>
                    <h2 className="text-lg font-bold mb-4">Order Details: {selectedOrder.number}</h2>
                    <div className="grid grid-cols-2 gap-4 border-b pb-4 mb-4 text-sm">
                        <div><p className="text-gray-500">Order Date</p><p className="font-medium">{selectedOrder.date}</p></div>
                        <div><p className="text-gray-500">Est. Delivery</p><p className="font-medium text-green-700">{selectedOrder.estDelivery}</p></div>
                    </div>
                    <div className="mb-4">
                        <h3 className="font-bold text-gray-700 mb-2">Items</h3>
                        {selectedOrder.items.map((item, idx) => (
                            <div key={idx} className="bg-gray-50 p-3 rounded border text-sm flex justify-between">
                                <div><p className="font-semibold">{item.name}</p><p className="text-xs text-gray-500">Color: {item.color}</p></div>
                                <p className="font-medium">Qty: {item.qty}</p>
                            </div>
                        ))}
                    </div>
                    <div className="bg-red-50 p-4 rounded border border-red-100 text-center">
                        <span className="text-xs font-bold text-gray-500 block uppercase tracking-wider">Current Production Progress</span>
                        <span className="text-xl font-bold text-red-900 block mt-1">{selectedOrder.status}</span>
                    </div>
                </div>
            )}
        </div>
    );
}
