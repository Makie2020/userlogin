"use client"

import { 
  UserIcon, 
  CurrencyDollarIcon, 
  ShoppingCartIcon, 
  ChartBarIcon 
} from '@heroicons/react/24/outline'

const stats = [
  { name: 'Total Users', value: '2,543', icon: UserIcon, change: '+12.3%', changeType: 'increase' },
  { name: 'Revenue', value: '$45,234', icon: CurrencyDollarIcon, change: '+15.1%', changeType: 'increase' },
  { name: 'Sales', value: '1,234', icon: ShoppingCartIcon, change: '-2.3%', changeType: 'decrease' },
  { name: 'Conversion', value: '3.24%', icon: ChartBarIcon, change: '+4.3%', changeType: 'increase' },
]

export default function DashboardPage() {
  return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Welcome back, Admin</h1>
          <p className="mt-1 text-sm text-gray-500">Heres whats happening with your business today.</p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.name}
              className="bg-white overflow-hidden shadow rounded-lg"
            >
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <stat.icon className="h-6 w-6 text-gray-400" aria-hidden="true" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        {stat.name}
                      </dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">
                          {stat.value}
                        </div>
                        <div
                          className={`ml-2 flex items-baseline text-sm font-semibold
                            ${stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'}`}
                        >
                          {stat.change}
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Recent Activity
            </h3>
            <div className="mt-6">
              <div className="border-t border-gray-200">
                <p className="py-4 text-gray-500">No recent activity to display.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}