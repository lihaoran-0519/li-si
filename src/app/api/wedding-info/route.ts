import { NextResponse } from 'next/server'

// 模拟婚礼信息数据
const mockWeddingInfo = {
  brideName: '李思',
  groomName: '黎浩然',
  weddingDate: '2026-02-21T15:00:00.000Z',
  weddingTime: '15:00',
  venue: '松滋凯瑞国际酒店言瑞厅',
  address: '湖北省松滋市新江口镇民主路88号',
  phone: '0716-6228888',
  capacity: '200人',
  features: [
    '豪华装修，典雅大气',
    '专业音响设备',
    'LED大屏幕',
    '中央空调',
    '独立化妆间',
    '新娘房休息室'
  ],
  timeline: [
    {
      time: '13:30-14:30',
      title: '宾客签到',
      description: '欢迎各位宾客到来，签到并领取座位卡',
      isActive: false,
    },
    {
      time: '14:30-15:00',
      title: '迎宾时间',
      description: '新人在门口迎接宾客，合影留念',
      isActive: false,
    },
    {
      time: '15:00-15:30',
      title: '婚礼仪式',
      description: '正式婚礼仪式，交换戒指，宣读誓言',
      isActive: false,
    },
    {
      time: '15:30-16:30',
      title: '拍照时间',
      description: '与宾客合影留念，记录美好瞬间',
      isActive: false,
    },
    {
      time: '16:30-17:00',
      title: '茶歇时间',
      description: '提供茶点，宾客自由交流',
      isActive: false,
    },
    {
      time: '17:00-19:00',
      title: '晚宴开始',
      description: '共进晚餐，举杯庆祝，分享喜悦',
      isActive: false,
    },
    {
      time: '19:00-20:00',
      title: '敬酒环节',
      description: '新人向宾客敬酒，感谢大家的祝福',
      isActive: false,
    },
    {
      time: '20:00-21:00',
      title: '送客时间',
      description: '感谢宾客的祝福，期待下次相聚',
      isActive: false,
    },
  ],
  contacts: [
    {
      id: 'planner',
      title: '婚礼策划师',
      name: '张策划师',
      role: '专业婚礼策划',
      phone: '138-0000-0000',
      wechat: 'wedding_planner_zhang',
      email: 'planner@example.com',
    },
    {
      id: 'venue',
      title: '场地经理',
      name: '李经理',
      role: '松滋凯瑞国际酒店',
      phone: '0716-6228888',
      wechat: 'kairui_hotel_li',
      email: 'venue@kairui-hotel.com',
    },
    {
      id: 'groom',
      title: '新郎',
      name: '黎浩然',
      role: '准新郎',
      phone: '138-0000-0001',
      wechat: 'lihaoran_wedding',
      email: 'lihaoran@example.com',
    },
    {
      id: 'bride',
      title: '新娘',
      name: '李思',
      role: '准新娘',
      phone: '138-0000-0002',
      wechat: 'lisi_wedding',
      email: 'lisi@example.com',
    }
  ],
  transportation: {
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
    ]
  },
  parking: {
    location: '酒店地下停车场',
    capacity: '200个停车位',
    fee: '免费停车',
    note: '请保留停车券，离场时出示'
  }
}

export async function GET() {
  try {
    // 在实际项目中，这里会从数据库获取数据
    // const weddingInfo = await prisma.weddingInfo.findFirst({
    //   orderBy: { createdAt: 'desc' },
    // })
    
    // 暂时返回模拟数据
    return NextResponse.json(mockWeddingInfo)
  } catch (error) {
    console.error('Error fetching wedding info:', error)
    return NextResponse.json(
      { error: 'Failed to fetch wedding info' },
      { status: 500 }
    )
  }
}
