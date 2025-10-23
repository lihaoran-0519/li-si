'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

export function Transportation() {
  const [activeMode, setActiveMode] = useState('driving')

  const transportationModes = [
    {
      id: 'driving',
      name: '自驾',
      icon: '🚗',
      color: 'from-blue-500 to-blue-600',
      bgColor: 'from-blue-50 to-blue-100'
    },
    {
      id: 'bus',
      name: '公交',
      icon: '🚌',
      color: 'from-green-500 to-green-600',
      bgColor: 'from-green-50 to-green-100'
    },
    {
      id: 'taxi',
      name: '出租车',
      icon: '🚕',
      color: 'from-yellow-500 to-yellow-600',
      bgColor: 'from-yellow-50 to-yellow-100'
    },
    {
      id: 'walking',
      name: '步行',
      icon: '🚶',
      color: 'from-purple-500 to-purple-600',
      bgColor: 'from-purple-50 to-purple-100'
    }
  ]

  const routes = {
    driving: [
      {
        from: '松滋市区',
        time: '10分钟',
        distance: '5公里',
        route: '沿民主路直行，经过3个红绿灯后到达',
        tips: '建议提前30分钟出发，避开高峰期'
      },
      {
        from: '荆州方向',
        time: '30分钟',
        distance: '25公里',
        route: '走荆松一级公路，在松滋出口下高速',
        tips: '高速路况良好，注意限速标志'
      },
      {
        from: '宜昌方向',
        time: '1小时',
        distance: '60公里',
        route: '走沪渝高速，在松滋出口下高速后沿民主路行驶',
        tips: '建议使用导航，注意路况信息'
      }
    ],
    bus: [
      {
        line: '1路公交',
        from: '松滋汽车站',
        time: '15分钟',
        stop: '民主路站',
        walk: '步行3分钟',
        frequency: '每10分钟一班',
        tips: '首班车6:00，末班车21:30'
      },
      {
        line: '2路公交',
        from: '松滋火车站',
        time: '20分钟',
        stop: '凯瑞酒店站',
        walk: '步行1分钟',
        frequency: '每15分钟一班',
        tips: '直达酒店门口，最方便'
      },
      {
        line: '3路公交',
        from: '新江口镇中心',
        time: '12分钟',
        stop: '新江口站',
        walk: '步行5分钟',
        frequency: '每8分钟一班',
        tips: '班次最密集，等待时间短'
      }
    ],
    taxi: [
      {
        company: '松滋出租车公司',
        phone: '0716-1234567',
        time: '5-10分钟',
        cost: '起步价6元，每公里1.8元',
        tips: '建议提前预约，避免等待'
      },
      {
        company: '网约车服务',
        phone: '400-123-4567',
        time: '3-8分钟',
        cost: '根据距离和时段计费',
        tips: '支持微信、支付宝支付'
      }
    ],
    walking: [
      {
        from: '松滋市中心',
        time: '25分钟',
        distance: '2公里',
        route: '沿民主路直行，经过市政府、人民医院',
        tips: '适合天气好的时候，可以欣赏沿途风景'
      },
      {
        from: '新江口镇',
        time: '15分钟',
        distance: '1.2公里',
        route: '沿民主路向东步行',
        tips: '最近路线，适合住在附近的宾客'
      }
    ]
  }


  return (
    <div className="card">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="mb-8"
      >
        <h3 className="text-2xl font-bold text-gradient mb-2">交通指引</h3>
        <p className="text-gray-600">多种交通方式，总有一种适合您</p>
      </motion.div>

      {/* 交通方式选择 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        {transportationModes.map((mode) => (
          <button
            key={mode.id}
            onClick={() => setActiveMode(mode.id)}
            className={`flex flex-col items-center space-y-2 p-4 rounded-lg transition-all duration-300 ${
              activeMode === mode.id
                ? `bg-gradient-to-r ${mode.color} text-white shadow-lg`
                : `bg-gradient-to-r ${mode.bgColor} text-gray-700 hover:shadow-md`
            }`}
          >
            <span className="text-2xl">{mode.icon}</span>
            <span className="font-medium">{mode.name}</span>
          </button>
        ))}
      </div>

      {/* 路线详情 */}
      <motion.div
        key={activeMode}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="space-y-6"
      >
        {activeMode === 'driving' && (
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-6">
              <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <span className="mr-2">🚗</span>
                自驾路线
              </h4>
              <div className="space-y-4">
                {routes.driving.map((route, index) => (
                  <motion.div
                    key={`driving-${index}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-lg p-4 border border-blue-200"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h5 className="font-semibold text-gray-900">{route.from}</h5>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span>⏱️ {route.time}</span>
                        <span>📏 {route.distance}</span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-2">{route.route}</p>
                    <p className="text-sm text-blue-600 bg-blue-50 px-3 py-1 rounded-full inline-block">
                      💡 {route.tips}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeMode === 'bus' && (
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-6">
              <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <span className="mr-2">🚌</span>
                公交路线
              </h4>
              <div className="space-y-4">
                {routes.bus.map((route, index) => (
                  <motion.div
                    key={`bus-${index}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-lg p-4 border border-green-200"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h5 className="font-bold text-green-600 text-lg">{route.line}</h5>
                      <span className="text-sm text-gray-500">{route.frequency}</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                      <div>
                        <span className="text-sm text-gray-600">起点：</span>
                        <span className="font-medium">{route.from}</span>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">终点：</span>
                        <span className="font-medium">{route.stop}</span>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">车程：</span>
                        <span className="font-medium">{route.time}</span>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">步行：</span>
                        <span className="font-medium">{route.walk}</span>
                      </div>
                    </div>
                    <p className="text-sm text-green-600 bg-green-50 px-3 py-1 rounded-full inline-block">
                      💡 {route.tips}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeMode === 'taxi' && (
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg p-6">
              <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <span className="mr-2">🚕</span>
                出租车服务
              </h4>
              <div className="space-y-4">
                {routes.taxi.map((service, index) => (
                  <motion.div
                    key={`taxi-${index}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-lg p-4 border border-yellow-200"
                  >
                    <h5 className="font-semibold text-gray-900 mb-2">{service.company}</h5>
                    <div className="space-y-2 mb-3">
                      <div className="flex items-center space-x-2">
                        <span className="text-yellow-600">📞</span>
                        <span className="font-medium">{service.phone}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-yellow-600">⏱️</span>
                        <span>预计等待：{service.time}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-yellow-600">💰</span>
                        <span>{service.cost}</span>
                      </div>
                    </div>
                    <p className="text-sm text-yellow-600 bg-yellow-50 px-3 py-1 rounded-full inline-block">
                      💡 {service.tips}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeMode === 'walking' && (
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg p-6">
              <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <span className="mr-2">🚶</span>
                步行路线
              </h4>
              <div className="space-y-4">
                {routes.walking.map((route, index) => (
                  <motion.div
                    key={`walking-${index}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-lg p-4 border border-purple-200"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h5 className="font-semibold text-gray-900">{route.from}</h5>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span>⏱️ {route.time}</span>
                        <span>📏 {route.distance}</span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-2">{route.route}</p>
                    <p className="text-sm text-purple-600 bg-purple-50 px-3 py-1 rounded-full inline-block">
                      💡 {route.tips}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )}
      </motion.div>

      {/* 地图提示 */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        viewport={{ once: true }}
        className="mt-8 p-4 bg-rose-gold/5 rounded-lg border border-rose-gold/20"
      >
        <div className="flex items-center space-x-2 text-rose-gold">
          <span>🗺️</span>
          <p className="text-sm font-medium">
            建议使用手机地图导航，搜索"松滋凯瑞国际酒店"即可
          </p>
        </div>
      </motion.div>
    </div>
  )
}
