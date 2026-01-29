import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Package, DollarSign, Users, Activity } from 'lucide-react';

const SALES_DATA = [
  { name: 'Mon', sales: 4000 },
  { name: 'Tue', sales: 3000 },
  { name: 'Wed', sales: 2000 },
  { name: 'Thu', sales: 2780 },
  { name: 'Fri', sales: 1890 },
  { name: 'Sat', sales: 2390 },
  { name: 'Sun', sales: 3490 },
];

const ELEMENT_DATA = [
  { name: 'Base', val: 400 },
  { name: 'Scholar', val: 300 },
  { name: 'Kinetic', val: 300 },
  { name: 'Home', val: 200 },
];

export const AdminDashboard = () => {
  return (
    <div className="pt-24 min-h-screen bg-concrete-100 dark:bg-concrete-950 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="font-display font-bold text-3xl mb-8">COMMAND CENTER</h1>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'REVENUE', val: '₫157.3M', icon: DollarSign, color: 'text-amber-500' },
            { label: 'ORDERS', val: '1,247', icon: Package, color: 'text-blue-500' },
            { label: 'CUSTOMERS', val: '3,421', icon: Users, color: 'text-green-500' },
            { label: 'QC PASS RATE', val: '98.2%', icon: Activity, color: 'text-purple-500' },
          ].map((stat, idx) => (
             <div key={idx} className="bg-concrete-50 dark:bg-concrete-900 p-6 border border-concrete-200 dark:border-concrete-800">
               <div className="flex justify-between items-start mb-4">
                 <span className="font-mono text-xs font-bold text-concrete-500">{stat.label}</span>
                 <stat.icon className={stat.color} size={20} />
               </div>
               <div className="font-display font-bold text-3xl">{stat.val}</div>
             </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           {/* Main Chart */}
           <div className="lg:col-span-2 bg-concrete-50 dark:bg-concrete-900 p-6 border border-concrete-200 dark:border-concrete-800">
              <h3 className="font-mono font-bold text-sm mb-6">REVENUE TRAJECTORY (7 DAYS)</h3>
              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={SALES_DATA}>
                    <defs>
                      <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#FFB300" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#FFB300" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                    <XAxis dataKey="name" stroke="#666" fontSize={12} tickLine={false} />
                    <YAxis stroke="#666" fontSize={12} tickLine={false} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#111', borderColor: '#333', color: '#fff' }}
                      itemStyle={{ color: '#FFB300' }}
                    />
                    <Area type="monotone" dataKey="sales" stroke="#FFB300" fillOpacity={1} fill="url(#colorSales)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
           </div>

           {/* Secondary Chart */}
           <div className="bg-concrete-50 dark:bg-concrete-900 p-6 border border-concrete-200 dark:border-concrete-800">
              <h3 className="font-mono font-bold text-sm mb-6">SALES BY ELEMENT</h3>
              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={ELEMENT_DATA}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                    <XAxis dataKey="name" stroke="#666" fontSize={10} />
                    <Tooltip cursor={{fill: '#222'}} contentStyle={{ backgroundColor: '#111', borderColor: '#333' }} />
                    <Bar dataKey="val" fill="#333" activeBar={{ fill: '#FFB300' }} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
           </div>
        </div>
        
        {/* Recent Orders Table */}
        <div className="mt-8 bg-concrete-50 dark:bg-concrete-900 border border-concrete-200 dark:border-concrete-800">
           <div className="p-6 border-b border-concrete-200 dark:border-concrete-800">
             <h3 className="font-mono font-bold text-sm">RECENT TRANSMISSIONS</h3>
           </div>
           <div className="overflow-x-auto">
             <table className="w-full text-left font-mono text-sm">
               <thead className="bg-concrete-100 dark:bg-concrete-950 text-concrete-500">
                 <tr>
                   <th className="p-4">ORDER ID</th>
                   <th className="p-4">CUSTOMER</th>
                   <th className="p-4">STATUS</th>
                   <th className="p-4">TOTAL</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-concrete-200 dark:divide-concrete-800">
                 <tr>
                   <td className="p-4">#EL-9921</td>
                   <td className="p-4">Nguyen Van A</td>
                   <td className="p-4"><span className="text-amber-500">PROCESSING</span></td>
                   <td className="p-4">₫1,250,000</td>
                 </tr>
                 <tr>
                   <td className="p-4">#EL-9920</td>
                   <td className="p-4">Tran Thi B</td>
                   <td className="p-4"><span className="text-green-500">DISPATCHED</span></td>
                   <td className="p-4">₫890,000</td>
                 </tr>
                 <tr>
                   <td className="p-4">#EL-9919</td>
                   <td className="p-4">Le C</td>
                   <td className="p-4"><span className="text-blue-500">DELIVERED</span></td>
                   <td className="p-4">₫2,400,000</td>
                 </tr>
               </tbody>
             </table>
           </div>
        </div>

      </div>
    </div>
  );
};