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

    // EMBEDDED LOGO: Hardcoded text representation of your transparent graphic
    const logoUrl = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAAAwCAYAAACGv6XNAAAACXBIWXMAAAsTAAALEwEAmpwYAAADwElEQVR4nO2az2sTQRDFX0VFEfSgVvEgIiKCeCh48FSqooKiVvEg/gEePHgQDx7EqlZRLIqieBAVvYgHwYMH8SDoQfEg/gEeBAsVb89Mskm3m2yS3SST7isMhGZmd77z9mXm7WwGg8FgMBgMBoNBiwGwC+A9gG9N9v0VwGfW9006GgA7bNAnv986gAcA6v7t7wE89Yv9Zg3MvYI/v89Z7DOnVb37AL75df8A4KTf1zMAdwF89gW9BfC16b0D0GHjPtt0L7+feYAnAJ77v98D2OPXexvAW9/W5wDeNbGHAHbZsM9p8T39N6gN90DqWbyX30OtcVvU4gA7bNjntPiaXnNfW3vTADwAsMsGffL7reunbYsD7LBhn9Pia3rNoM7WfG8AHLZBn/x+6wCeO6gN99w9VwNoZ4M++X3XzYx69wB8svasBfDI2vO6Z60eADts0Ce/3zqAFwG9DwAetfC9v6w9DwE8b+F7f6w9p8X33L1XA+Bpa89vWftI+6w9p7XPr9byR3u3Wv6ofZ5ay68D2NfC95Za/qh9Xlr+qH2eWv6ofT9p+UvWf8g2Dq33vG2Z/wXfOLLenG0cWv/S2vML9R8H2GHD/tS2DkXN6rGNDRsbNjZsbNjYsLFhY8PGho0NGxs2Nmxs2NiwHULvAdR8X4v/BvWhfCzfHMDfPvfFmO9h8Yshnzf897Xf41w+L878D32f05Xf5yN+nw3/+3zl3//U55r+bH7qM6XfN9XnWv7fPtd0V6rPNf2Fv8/U13T3+m7/fU13v3+eXp/TPUf9e6gN97x7rgZwn+7/uG9Xg+D5V/OPhu7/uN9u0PyreS3d/3GfrrscwH3A9wXv7W7Q/Bf67R5w90F3Z3g36D7gX/XbUf9Oen9QG+4t3L2mNnSvaY8G0ZvvbeHeG3p/UBvupXuvN3Cvae4Dvc6rXpX96v90O/WbBf+VfvsF99g99n79/lK3ZepYmZepYwV9F9x99D+6Hw3feWrvA73Oidof6PVf9YvA8w/56vT+7wN7TdfbH9Tf6X667gO9v9N16lqZl6lrBV7vU/XN0Meeep/T+556f8g2zPscWn7K+j/5xvEw9GfWNxzC0PInbOPhEPon2zjEDgbyM89gMBgMBoPBoEX8BRF7VvOnA9XIAAAAAElFTkSuQmCC";

    const handleLogin = (e) => {
        e.preventDefault();
        if (username && password) setCurrentPage('dashboard');
    };

    return (
        <div className="min-h-screen bg-gray-50 text-gray-900 font-sans flex flex-col justify-start items-center p-4">
            
            {/* PERSISTENT HEADER FOR AUTHENTICATED PAGES */}
            {currentPage !== 'login' && (
                <div className="w-full max-w-4xl bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-4 flex justify-between items-center">
                    <img 
                        src={logoUrl} 
                        alt="Abby Rose Inc." 
                        className="h-10 md:h-12 object-contain"
                    />
                    <span className="font-serif text-lg font-bold text-red-900 md:block hidden">Abby Rose Inc.</span>
                    <button onClick={() => setCurrentPage('login')} className="text-sm font-medium text-gray-500 hover:text-red-600 transition">Logout</button>
                </div>
            )}

            {/* PAGE 1: LOGIN SCREEN */}
            {currentPage === 'login' && (
                <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md border border-gray-100 my-auto">
                    {/* Centered Logo Frame */}
                    <div className="flex flex-col items-center justify-center mb-6 bg-gray-50 p-4 rounded-xl border border-gray-100">
                        <img 
                            src={logoUrl} 
                            alt="Abby Rose Inc." 
                            className="h-14 w-auto object-contain"
                        />
                    </div>
                    
                    <h2 className="text-xl font-bold text-center text-gray-800 mb-6">Customer Order Portal</h2>
                    <form onSubmit={handleLogin} className="space-y-4">
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
                    
