'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

export function VenueInfo() {
  const [activeTab, setActiveTab] = useState('venue')

  const venueInfo = {
    name: '松滋凯瑞国际酒店言瑞厅',
    address: '湖北省松滋市新江口镇民主路88号',
    phone: '0716-6228888',
    capacity: '可容纳200人',
    features: [
      '豪华装修，典雅大气',
      '专业音响设备',
      'LED大屏幕',
      '中央空调',
      '独立化妆间',
      '新娘房休息室'
    ]
  }

  const parkingInfo = {
    location: '酒店地下停车场',
    capacity: '200个停车位',
    fee: '免费停车',
    note: '请保留停车券，离场时出示'
  }

  const transportation = {
    subway: [
      '暂无地铁直达',
      '建议乘坐公交或自驾前往'
    ],
    bus: [
      '1路：民主路站下车，步行3分钟',
      '2路：凯瑞酒店站下车，步行1分钟',
      '3路：新江口站下车，步行5分钟'
    ],
    driving: [
      '从松滋市区：沿民主路直行约10分钟',
      '从荆州方向：走荆松一级公路，约30分钟',
      '从宜昌方向：走沪渝高速，约1小时'
    ]
  }

  const tabs = [
    { id: 'venue', label: '场地详情', icon: '🏨' },
    { id: 'parking', label: '停车信息', icon: '🅿️' },
    { id: 'transport', label: '交通指引', icon: '🚗' }
  ]

  return (
    <div className="card">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="mb-8"
      >
        <h3 className="text-2xl font-bold text-gradient mb-2">场地信息</h3>
        <p className="text-gray-600">松滋凯瑞国际酒店言瑞厅，为您提供完美的婚礼体验</p>
      </motion.div>

      {/* 标签页导航 */}
      <div className="flex flex-wrap gap-2 mb-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
              activeTab === tab.id
                ? 'bg-rose-gold text-white shadow-lg'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <span>{tab.icon}</span>
            <span className="font-medium">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* 内容区域 */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="space-y-6"
      >
        {activeTab === 'venue' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-rose-gold/10 to-rose-dark/10 rounded-lg p-6">
              <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <span className="mr-2">🏨</span>
                {venueInfo.name}
              </h4>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <span className="text-rose-gold font-medium">📍</span>
                  <div>
                    <p className="font-medium text-gray-900">地址</p>
                    <p className="text-gray-600">{venueInfo.address}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-rose-gold font-medium">📞</span>
                  <div>
                    <p className="font-medium text-gray-900">联系电话</p>
                    <p className="text-gray-600">{venueInfo.phone}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-rose-gold font-medium">👥</span>
                  <div>
                    <p className="font-medium text-gray-900">容纳人数</p>
                    <p className="text-gray-600">{venueInfo.capacity}</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h5 className="text-lg font-semibold text-gray-900 mb-4">场地特色</h5>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {venueInfo.features.map((feature, index) => (
                  <motion.div
                    key={`feature-${index}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center space-x-3 bg-white rounded-lg p-3 border border-gray-100"
                  >
                    <div className="w-2 h-2 bg-rose-gold rounded-full"></div>
                    <span className="text-gray-700">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'parking' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-6">
              <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <span className="mr-2">🅿️</span>
                停车信息
              </h4>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="font-medium text-gray-900 mb-1">停车位置</p>
                    <p className="text-gray-600">{parkingInfo.location}</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 mb-1">停车位数量</p>
                    <p className="text-gray-600">{parkingInfo.capacity}</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 mb-1">收费标准</p>
                    <p className="text-gray-600">{parkingInfo.fee}</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 mb-1">注意事项</p>
                    <p className="text-gray-600">{parkingInfo.note}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'transport' && (
          <div className="space-y-6">
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-6">
                <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                  <span className="mr-2">🚌</span>
                  公交路线
                </h4>
                <div className="space-y-2">
                  {transportation.bus.map((route, index) => (
                    <div key={`bus-${index}`} className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                        {index + 1}
                      </div>
                      <p className="text-gray-700">{route}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg p-6">
                <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                  <span className="mr-2">🚗</span>
                  自驾路线
                </h4>
                <div className="space-y-3">
                  {transportation.driving.map((route, index) => (
                    <div key={`driving-${index}`} className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                        {index + 1}
                      </div>
                      <p className="text-gray-700">{route}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg p-6">
                <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                  <span className="mr-2">🚇</span>
                  地铁信息
                </h4>
                <div className="space-y-2">
                  {transportation.subway.map((info, index) => (
                    <div key={`subway-${index}`} className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-purple-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                        {index + 1}
                      </div>
                      <p className="text-gray-700">{info}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </motion.div>

      {/* 底部提示 */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        viewport={{ once: true }}
        className="mt-8 p-4 bg-rose-gold/5 rounded-lg border border-rose-gold/20"
      >
        <div className="flex items-center space-x-2 text-rose-gold">
          <span>💡</span>
          <p className="text-sm font-medium">
            如有任何疑问，请随时联系我们的婚礼策划师
          </p>
        </div>
      </motion.div>
    </div>
  )
}
