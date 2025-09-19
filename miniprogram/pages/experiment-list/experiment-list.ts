// experiment-list.ts
// 其他实验列表页面

// 实验数据接口
interface Experiment {
  id: string;
  title: string;
  description: string;
  icon: string;
  difficulty: 'easy' | 'medium' | 'hard';
  duration: string;
  category: string;
  categoryId: string;
}

// 分类数据接口
interface Category {
  id: string;
  name: string;
  icon: string;
}

Page({
  data: {
    currentCategory: 'all',
    categories: [
      { id: 'all', name: '全部', icon: '📚' },
      { id: 'mechanics', name: '力学', icon: '⚖️' },
      { id: 'electricity', name: '电学', icon: '⚡' },
      { id: 'optics', name: '光学', icon: '🔍' },
      { id: 'thermodynamics', name: '热学', icon: '🌡️' },
      { id: 'modern', name: '现代物理', icon: '🔬' }
    ] as Category[],
    experiments: [
      // 力学实验
      {
        id: 'density-measurement',
        title: '密度测量',
        description: '测量物质的密度，掌握基本测量方法',
        icon: '⚖️',
        difficulty: 'easy',
        duration: '60分钟',
        category: '力学',
        categoryId: 'mechanics'
      },
      {
        id: 'solid-density',
        title: '固体密度测量',
        description: '使用不同方法测量固体物质的密度',
        icon: '🧱',
        difficulty: 'easy',
        duration: '45分钟',
        category: '力学',
        categoryId: 'mechanics'
      },
      {
        id: 'air-density',
        title: '空气密度与气体普适常数测量',
        description: '测量空气密度并验证气体普适常数',
        icon: '🌬️',
        difficulty: 'medium',
        duration: '90分钟',
        category: '力学',
        categoryId: 'mechanics'
      },
      {
        id: 'youngs-modulus',
        title: '杨氏弹性模量的测定',
        description: '测定材料的杨氏弹性模量',
        icon: '📐',
        difficulty: 'medium',
        duration: '75分钟',
        category: '力学',
        categoryId: 'mechanics'
      },
      {
        id: 'air-track',
        title: '气轨上的物理实验',
        description: '利用气轨进行各种力学实验',
        icon: '🛤️',
        difficulty: 'medium',
        duration: '90分钟',
        category: '力学',
        categoryId: 'mechanics'
      },
      {
        id: 'moment-inertia',
        title: '物体转动惯量测定',
        description: '测定物体的转动惯量',
        icon: '🔄',
        difficulty: 'medium',
        duration: '75分钟',
        category: '力学',
        categoryId: 'mechanics'
      },
      {
        id: 'torsion-pendulum',
        title: '扭摆法验证转动惯量平行轴定理',
        description: '用扭摆验证平行轴定理',
        icon: '🌀',
        difficulty: 'hard',
        duration: '120分钟',
        category: '力学',
        categoryId: 'mechanics'
      },
      {
        id: 'three-wire-pendulum',
        title: '三线摆法测量物体的转动惯量',
        description: '用三线摆测量转动惯量',
        icon: '⏰',
        difficulty: 'medium',
        duration: '90分钟',
        category: '力学',
        categoryId: 'mechanics'
      },
      {
        id: 'collision-momentum',
        title: '碰撞过程中冲量的研究',
        description: '研究碰撞过程中的冲量变化',
        icon: '💥',
        difficulty: 'medium',
        duration: '75分钟',
        category: '力学',
        categoryId: 'mechanics'
      },
      {
        id: 'harmonic-motion',
        title: '简谐振动与弹簧劲度系数的测量',
        description: '研究简谐振动规律并测量弹簧劲度系数',
        icon: '🌊',
        difficulty: 'medium',
        duration: '75分钟',
        category: '力学',
        categoryId: 'mechanics'
      },
      {
        id: 'surface-tension',
        title: '液体表面张力系数的测定',
        description: '测定液体的表面张力系数',
        icon: '💧',
        difficulty: 'medium',
        duration: '60分钟',
        category: '力学',
        categoryId: 'mechanics'
      },
      {
        id: 'sound-velocity',
        title: '空气中声速的测量',
        description: '测量声音在空气中的传播速度',
        icon: '🔊',
        difficulty: 'easy',
        duration: '60分钟',
        category: '力学',
        categoryId: 'mechanics'
      },
      {
        id: 'collision-target',
        title: '碰撞打靶实验',
        description: '研究碰撞过程的物理规律',
        icon: '🎯',
        difficulty: 'medium',
        duration: '75分钟',
        category: '力学',
        categoryId: 'mechanics'
      },
      
      // 电学实验
      {
        id: 'iv-characteristic',
        title: '电子元件的伏安特性',
        description: '测量电子元件的伏安特性曲线',
        icon: '📊',
        difficulty: 'medium',
        duration: '75分钟',
        category: '电学',
        categoryId: 'electricity'
      },
      {
        id: 'dc-bridge',
        title: '直流电桥测电阻',
        description: '使用直流电桥精确测量电阻值',
        icon: '🌉',
        difficulty: 'medium',
        duration: '60分钟',
        category: '电学',
        categoryId: 'electricity'
      },
      {
        id: 'thermistor',
        title: '热敏电阻与热电阻温度特性的研究',
        description: '研究热敏电阻的温度特性',
        icon: '🌡️',
        difficulty: 'medium',
        duration: '75分钟',
        category: '电学',
        categoryId: 'electricity'
      },
      {
        id: 'double-arm-bridge',
        title: '直流双臂电桥测低值电阻',
        description: '使用双臂电桥测量低值电阻',
        icon: '🔌',
        difficulty: 'hard',
        duration: '90分钟',
        category: '电学',
        categoryId: 'electricity'
      },
      {
        id: 'potentiometer-voltage',
        title: '电位差计精确测量电压或电动势',
        description: '用电位差计精确测量电压',
        icon: '⚡',
        difficulty: 'hard',
        duration: '90分钟',
        category: '电学',
        categoryId: 'electricity'
      },
      {
        id: 'multimeter',
        title: '万用表的使用',
        description: '学习万用表的正确使用方法',
        icon: '📱',
        difficulty: 'easy',
        duration: '45分钟',
        category: '电学',
        categoryId: 'electricity'
      },
      {
        id: 'oscilloscope',
        title: '示波器的使用',
        description: '掌握示波器的基本操作',
        icon: '📺',
        difficulty: 'medium',
        duration: '75分钟',
        category: '电学',
        categoryId: 'electricity'
      },
      {
        id: 'hall-effect-solenoid',
        title: '霍尔效应法测量螺线管磁场',
        description: '用霍尔效应测量螺线管内磁场',
        icon: '🧲',
        difficulty: 'medium',
        duration: '75分钟',
        category: '电学',
        categoryId: 'electricity'
      },
      {
        id: 'hall-effect',
        title: '霍尔效应及其应用',
        description: '研究霍尔效应的原理和应用',
        icon: '🔋',
        difficulty: 'medium',
        duration: '75分钟',
        category: '电学',
        categoryId: 'electricity'
      },
      {
        id: 'rectifier-filter',
        title: '整流滤波电路',
        description: '研究整流滤波电路的工作原理',
        icon: '🔄',
        difficulty: 'medium',
        duration: '90分钟',
        category: '电学',
        categoryId: 'electricity'
      },
      {
        id: 'ac-bridge',
        title: '交流电桥的原理和应用',
        description: '学习交流电桥的测量原理',
        icon: '🌊',
        difficulty: 'hard',
        duration: '90分钟',
        category: '电学',
        categoryId: 'electricity'
      },
      {
        id: 'black-box',
        title: '黑盒子实验',
        description: '通过测量推断黑盒子内部电路结构',
        icon: '📦',
        difficulty: 'hard',
        duration: '120分钟',
        category: '电学',
        categoryId: 'electricity'
      },
      {
        id: 'wheatstone-bridge',
        title: '惠斯通电桥测表头内阻',
        description: '用惠斯通电桥测量表头内阻',
        icon: '⚖️',
        difficulty: 'medium',
        duration: '60分钟',
        category: '电学',
        categoryId: 'electricity'
      },
      {
        id: 'potentiometer-resistance',
        title: '电位差计精确测定电阻',
        description: '用电位差计精确测定电阻值',
        icon: '🎛️',
        difficulty: 'hard',
        duration: '90分钟',
        category: '电学',
        categoryId: 'electricity'
      },
      {
        id: 'meter-calibration',
        title: '电表的扩程和校准',
        description: '学习电表扩程和校准方法',
        icon: '📏',
        difficulty: 'medium',
        duration: '75分钟',
        category: '电学',
        categoryId: 'electricity'
      },
      {
        id: 'nonlinear-circuit',
        title: '非线性电路振荡周期的分岔与混沌实验',
        description: '研究非线性电路的混沌现象',
        icon: '🌀',
        difficulty: 'hard',
        duration: '150分钟',
        category: '电学',
        categoryId: 'electricity'
      },
      {
        id: 'gmr-sensor',
        title: '巨磁阻传感器的应用',
        description: '研究巨磁阻传感器的应用原理',
        icon: '📡',
        difficulty: 'hard',
        duration: '120分钟',
        category: '电学',
        categoryId: 'electricity'
      },
      {
        id: 'led-characteristics',
        title: '三基色发光二极管的伏安特性与混色实验',
        description: '研究LED的伏安特性和混色原理',
        icon: '💡',
        difficulty: 'medium',
        duration: '75分钟',
        category: '电学',
        categoryId: 'electricity'
      },
      {
        id: 'led-temperature',
        title: '发光二极管的温度特性与点阵显示实验',
        description: '研究LED的温度特性',
        icon: '🌡️',
        difficulty: 'medium',
        duration: '75分钟',
        category: '电学',
        categoryId: 'electricity'
      },
      
      // 光学实验
      {
        id: 'spectrometer',
        title: '分光计的调整',
        description: '学习分光计的调整和使用方法',
        icon: '🔬',
        difficulty: 'medium',
        duration: '90分钟',
        category: '光学',
        categoryId: 'optics'
      },
      {
        id: 'polarized-light',
        title: '偏振光的研究',
        description: '研究偏振光的性质和应用',
        icon: '🌈',
        difficulty: 'medium',
        duration: '75分钟',
        category: '光学',
        categoryId: 'optics'
      },
      {
        id: 'newton-rings',
        title: '用牛顿环测定透镜的曲率半径',
        description: '利用牛顿环干涉测量透镜曲率半径',
        icon: '🔍',
        difficulty: 'medium',
        duration: '90分钟',
        category: '光学',
        categoryId: 'optics'
      },
      {
        id: 'michelson-interferometer',
        title: '迈克尔逊干涉仪',
        description: '使用迈克尔逊干涉仪进行精密测量',
        icon: '🔬',
        difficulty: 'hard',
        duration: '120分钟',
        category: '光学',
        categoryId: 'optics'
      },
      {
        id: 'grating-diffraction',
        title: '光栅衍射实验',
        description: '研究光栅衍射现象和规律',
        icon: '📐',
        difficulty: 'medium',
        duration: '75分钟',
        category: '光学',
        categoryId: 'optics'
      },
      {
        id: 'single-slit-diffraction',
        title: '单缝衍射的光强分布',
        description: '测量单缝衍射的光强分布',
        icon: '📊',
        difficulty: 'medium',
        duration: '75分钟',
        category: '光学',
        categoryId: 'optics'
      },
      {
        id: 'zeeman-effect',
        title: '塞曼效应',
        description: '观察和研究塞曼效应',
        icon: '🧲',
        difficulty: 'hard',
        duration: '150分钟',
        category: '光学',
        categoryId: 'optics'
      },
      {
        id: 'faraday-effect',
        title: '法拉第效应',
        description: '研究法拉第磁光效应',
        icon: '🔄',
        difficulty: 'hard',
        duration: '120分钟',
        category: '光学',
        categoryId: 'optics'
      },
      {
        id: 'ultrasonic-grating',
        title: '超声光栅测量声速',
        description: '用超声光栅测量声速',
        icon: '🔊',
        difficulty: 'hard',
        duration: '120分钟',
        category: '光学',
        categoryId: 'optics'
      },
      {
        id: 'fiber-optic',
        title: '音频信号光纤传输技术实验',
        description: '研究光纤通信技术',
        icon: '📡',
        difficulty: 'hard',
        duration: '120分钟',
        category: '光学',
        categoryId: 'optics'
      },
      {
        id: 'ellipsometry',
        title: '椭圆偏振光法测量薄膜厚度和折射率',
        description: '用椭偏法测量薄膜参数',
        icon: '💎',
        difficulty: 'hard',
        duration: '150分钟',
        category: '光学',
        categoryId: 'optics'
      },
      {
        id: 'magneto-optic-kerr',
        title: '表面磁光克尔效应实验',
        description: '研究表面磁光克尔效应',
        icon: '🌟',
        difficulty: 'hard',
        duration: '150分钟',
        category: '光学',
        categoryId: 'optics'
      },
      {
        id: 'liquid-crystal',
        title: '液晶电光效应特性研究',
        description: '研究液晶的电光效应',
        icon: '💧',
        difficulty: 'hard',
        duration: '120分钟',
        category: '光学',
        categoryId: 'optics'
      },
      
      // 热学实验
      {
        id: 'thermal-conductivity',
        title: '不良导体导热系数的测定',
        description: '测定不良导体的导热系数',
        icon: '🌡️',
        difficulty: 'medium',
        duration: '90分钟',
        category: '热学',
        categoryId: 'thermodynamics'
      },
      {
        id: 'heat-engine',
        title: '热机循环',
        description: '研究热机的工作循环',
        icon: '🔥',
        difficulty: 'medium',
        duration: '90分钟',
        category: '热学',
        categoryId: 'thermodynamics'
      },
      {
        id: 'thermocouple',
        title: '热电偶的标定和测温',
        description: '标定热电偶并进行温度测量',
        icon: '📏',
        difficulty: 'medium',
        duration: '75分钟',
        category: '热学',
        categoryId: 'thermodynamics'
      },
      
      // 现代物理实验
      {
        id: 'pasco-experiment',
        title: 'Pasco实验',
        description: '使用Pasco设备进行现代物理实验',
        icon: '🔬',
        difficulty: 'medium',
        duration: '90分钟',
        category: '现代物理',
        categoryId: 'modern'
      },
      {
        id: 'physics-basics',
        title: '物理实验基本技术',
        description: '掌握物理实验的基本技术和方法',
        icon: '🛠️',
        difficulty: 'easy',
        duration: '60分钟',
        category: '现代物理',
        categoryId: 'modern'
      },
      {
        id: 'comprehensive-modern',
        title: '近代综合实验',
        description: '综合性的近代物理实验',
        icon: '🧪',
        difficulty: 'hard',
        duration: '180分钟',
        category: '现代物理',
        categoryId: 'modern'
      },
      {
        id: 'franck-hertz',
        title: '夫兰克-赫兹实验',
        description: '验证原子能级的量子化',
        icon: '⚛️',
        difficulty: 'hard',
        duration: '150分钟',
        category: '现代物理',
        categoryId: 'modern'
      },
      {
        id: 'photoelectric-planck',
        title: '光电效应测定普朗克常数',
        description: '通过光电效应测定普朗克常数',
        icon: '💡',
        difficulty: 'hard',
        duration: '150分钟',
        category: '现代物理',
        categoryId: 'modern'
      },
      {
        id: 'millikan-oil-drop',
        title: '密立根油滴CCD微机系统电子电荷的测定',
        description: '用油滴法测定电子电荷',
        icon: '💧',
        difficulty: 'hard',
        duration: '180分钟',
        category: '现代物理',
        categoryId: 'modern'
      },
      {
        id: 'hydrogen-spectrum',
        title: '氢原子光谱的测定',
        description: '测定氢原子的光谱线',
        icon: '🌈',
        difficulty: 'hard',
        duration: '120分钟',
        category: '现代物理',
        categoryId: 'modern'
      },
      {
        id: 'light-speed',
        title: '光拍法测量光速实验',
        description: '用光拍法测量光速',
        icon: '⚡',
        difficulty: 'hard',
        duration: '150分钟',
        category: '现代物理',
        categoryId: 'modern'
      },
      {
        id: 'nmr',
        title: '核磁共振',
        description: '研究核磁共振现象',
        icon: '🧲',
        difficulty: 'hard',
        duration: '180分钟',
        category: '现代物理',
        categoryId: 'modern'
      },
      {
        id: 'esr',
        title: '电子顺磁共振',
        description: '研究电子顺磁共振现象',
        icon: '🔄',
        difficulty: 'hard',
        duration: '180分钟',
        category: '现代物理',
        categoryId: 'modern'
      },
      {
        id: 'x-ray-diffraction',
        title: 'X射线衍射实验',
        description: '利用X射线研究晶体结构',
        icon: '💎',
        difficulty: 'hard',
        duration: '180分钟',
        category: '现代物理',
        categoryId: 'modern'
      },
      {
        id: 'x-ray-detection',
        title: '用电离法探测X射线实验',
        description: '用电离法探测X射线',
        icon: '☢️',
        difficulty: 'hard',
        duration: '150分钟',
        category: '现代物理',
        categoryId: 'modern'
      }
    ] as Experiment[],
    filteredExperiments: [] as Experiment[]
  },

  onLoad() {
    console.log('其他实验列表页面加载完成')
    this.filterExperiments()
  },

  onShow() {
    console.log('其他实验列表页面显示')
  },

  switchCategory(e: any) {
    const category = e.currentTarget.dataset.category
    this.setData({
      currentCategory: category
    })
    this.filterExperiments()
  },

  filterExperiments() {
    const { currentCategory, experiments } = this.data
    let filtered = experiments
    
    if (currentCategory !== 'all') {
      filtered = experiments.filter(exp => exp.categoryId === currentCategory)
    }
    
    this.setData({
      filteredExperiments: filtered
    })
  },

  navigateToExperiment(e: any) {
    const experimentId = e.currentTarget.dataset.id
    const experimentTitle = e.currentTarget.dataset.title
    
    wx.navigateTo({
      url: `../experiment/experiment?id=${experimentId}&title=${experimentTitle}`,
      fail: (err) => {
        console.error('页面跳转失败:', err)
        wx.showToast({
          title: '跳转失败',
          icon: 'error'
        })
      }
    })
  }
})