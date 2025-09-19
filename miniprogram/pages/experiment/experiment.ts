// experiment.ts
// 伏安特性曲线实验页面
import { CozeAPIConfig } from '../../config/coze-api'
const advancedLearnData = require('../../data/advanced_learn.js');

interface Question {
  id: number;
  title: string;
  answer: string;
}

Page({
  data: {
    experimentId: '',
    experimentTitle: '',
    currentStep: 'learning',
    stepIndex: 0,
    
    videoSrc: '', 
    
    demoVideoSrc: '', 
    demoVideoDuration: '',
    demoVideoDescription: '',
    
    navItems: [
      { id: 'learning', name: '学习资料', active: true },
      { id: 'ai-chat', name: 'AI问答', active: false },
      { id: 'simulation', name: '仿真实验', active: false },
      { id: 'upload', name: '上传作业', active: false }
    ],
    
    previewQuestions: [] as Question[],
    
    uploadedFiles: [] as Array<{
      name: string;
      size: string;
      status: string;
      statusText: string;
      path?: string;
    }>,
    
    chatMessages: [] as Array<{
      type: 'user' | 'ai';
      content: string;
      formattedContent?: string;
      time: string;
    }>,
    inputText: '',
    isLoading: false,
    scrollTop: 0,
    scrollIntoView: '',
  },

  onLoad(options: any) {
    const { id, title } = options
    const questions = (advancedLearnData.advanced_learn || []).map((q: any) => ({
        id: parseInt(q.题号, 10),
        title: q.题目,
        answer: ''
    }));
    this.setData({
      experimentId: id,
      experimentTitle: title || '伏安特性曲线实验',
      previewQuestions: questions
    })
    
    this.loadExperimentConfig(id)
  },

  handlePreviewAnswerInput(e: any) {
    const { id } = e.currentTarget.dataset;
    const { value } = e.detail;
    const questionIndex = this.data.previewQuestions.findIndex(q => q.id === id);
    if (questionIndex === -1) return;

    const key = `previewQuestions[${questionIndex}].answer`;
    this.setData({
      [key]: value
    });
  },

  submitPreviewAnswers() {
    console.log('提交的预习答案:', this.data.previewQuestions);
    wx.showToast({
      title: '预习提交成功！',
      icon: 'success'
    });
  },

  onReady() {
  },



  loadExperimentConfig(experimentId: string) {
    const experimentConfigs: { [key: string]: any } = {
      // 力学实验
      'density-measurement': {
        title: '密度测量',
        videoSrc: '',
        description: '测量物质的密度，掌握基本测量方法',
        materials: ['天平', '量筒', '待测物体', '水'],
        steps: ['测量物体质量', '测量物体体积', '计算密度', '分析误差']
      },
      'solid-density': {
        title: '固体密度测量',
        videoSrc: '',
        description: '使用不同方法测量固体物质的密度',
        materials: ['天平', '量筒', '固体样品', '细线'],
        steps: ['直接测量法', '排水法测体积', '计算密度', '比较不同方法']
      },
      'air-density': {
        title: '空气密度与气体普适常数测量',
        videoSrc: '',
        description: '测量空气密度并验证气体普适常数',
        materials: ['真空泵', '压力计', '温度计', '容器'],
        steps: ['抽真空', '测量压力温度', '计算密度', '验证气体常数']
      },
      'youngs-modulus': {
        title: '杨氏弹性模量的测定',
        videoSrc: '',
        description: '测定材料的杨氏弹性模量',
        materials: ['金属丝', '砝码', '光杠杆', '标尺'],
        steps: ['安装实验装置', '加载砝码', '测量伸长量', '计算弹性模量']
      },
      'air-track': {
        title: '气轨上的物理实验',
        videoSrc: '',
        description: '利用气轨进行各种力学实验',
        materials: ['气轨', '滑块', '光电门', '计时器'],
        steps: ['调平气轨', '设置实验', '测量运动', '分析数据']
      },
      'moment-inertia': {
        title: '物体转动惯量测定',
        videoSrc: '',
        description: '测定物体的转动惯量',
        materials: ['转动装置', '砝码', '秒表', '待测物体'],
        steps: ['安装物体', '施加转矩', '测量角加速度', '计算转动惯量']
      },
      'torsion-pendulum': {
        title: '扭摆法验证转动惯量平行轴定理',
        videoSrc: '',
        description: '用扭摆验证平行轴定理',
        materials: ['扭摆', '圆盘', '质量块', '秒表'],
        steps: ['测量空盘周期', '改变质量分布', '测量新周期', '验证定理']
      },
      'three-wire-pendulum': {
        title: '三线摆法测量物体的转动惯量',
        videoSrc: '',
        description: '用三线摆测量转动惯量',
        materials: ['三线摆', '待测物体', '秒表', '米尺'],
        steps: ['安装物体', '测量摆动周期', '测量几何参数', '计算转动惯量']
      },
      'collision-momentum': {
        title: '碰撞过程中冲量的研究',
        videoSrc: '',
        description: '研究碰撞过程中的冲量变化',
        materials: ['碰撞装置', '小球', '传感器', '计算机'],
        steps: ['设置碰撞实验', '测量碰撞前后速度', '计算冲量', '验证动量守恒']
      },
      'harmonic-motion': {
        title: '简谐振动与弹簧劲度系数的测量',
        videoSrc: '',
        description: '研究简谐振动规律并测量弹簧劲度系数',
        materials: ['弹簧', '质量块', '秒表', '米尺'],
        steps: ['测量静平衡位置', '测量振动周期', '改变质量', '计算劲度系数']
      },
      'surface-tension': {
        title: '液体表面张力系数的测定',
        videoSrc: '',
        description: '测定液体的表面张力系数',
        materials: ['表面张力仪', '液体样品', '环形测头', '天平'],
        steps: ['校准仪器', '测量拉脱力', '计算表面张力', '分析结果']
      },
      'sound-velocity': {
        title: '空气中声速的测量',
        videoSrc: '',
        description: '测量声音在空气中的传播速度',
        materials: ['声速测定仪', '信号发生器', '示波器', '温度计'],
        steps: ['产生声波', '测量波长', '测量频率', '计算声速']
      },
      'collision-target': {
        title: '碰撞打靶实验',
        videoSrc: '',
        description: '研究碰撞过程的物理规律',
        materials: ['发射装置', '靶球', '轨道', '测量工具'],
        steps: ['调整发射角度', '发射弹丸', '观察碰撞', '分析轨迹']
      },
      
      // 电学实验
      'iv-characteristic': {
        title: '电子元件的伏安特性',
        videoSrc: '',
        description: '测量电子元件的伏安特性曲线',
        materials: ['万用表', '电阻', '二极管', '电源'],
        steps: ['连接测量电路', '改变电压', '测量电流', '绘制特性曲线'],
        demoVideoSrc: 'https://r2.sakinori.top/26bead3f5ac7c2e986254e0356525896.mp4',
        demoVideoDuration: '1分33秒',
        demoVideoDescription: '详细演示伏安特性曲线测量的完整操作流程，包括电路连接、仪器调节、数据测量和曲线绘制等关键步骤'
      },
      'dc-bridge': {
        title: '直流电桥测电阻',
        videoSrc: '',
        description: '使用直流电桥精确测量电阻值',
        materials: ['电桥', '标准电阻', '检流计', '待测电阻'],
        steps: ['连接电桥', '调节平衡', '读取数值', '计算电阻']
      },
      'thermistor': {
        title: '热敏电阻与热电阻温度特性的研究',
        videoSrc: '',
        description: '研究热敏电阻的温度特性',
        materials: ['热敏电阻', '加热器', '温度计', '万用表'],
        steps: ['加热电阻', '测量温度', '测量阻值', '绘制特性曲线']
      },
      'double-arm-bridge': {
        title: '直流双臂电桥测低值电阻',
        videoSrc: '',
        description: '使用双臂电桥测量低值电阻',
        materials: ['双臂电桥', '低值电阻', '检流计', '电源'],
        steps: ['连接双臂电桥', '消除接触电阻', '调节平衡', '读取结果']
      },
      'potentiometer-voltage': {
        title: '电位差计精确测量电压或电动势',
        videoSrc: '',
        description: '用电位差计精确测量电压',
        materials: ['电位差计', '标准电池', '检流计', '待测电源'],
        steps: ['校准电位差计', '测量标准电池', '测量待测电压', '计算结果']
      },
      'multimeter': {
        title: '万用表的使用',
        videoSrc: '',
        description: '学习万用表的正确使用方法',
        materials: ['万用表', '电阻', '电池', '导线'],
        steps: ['选择量程', '连接测试笔', '读取数值', '注意事项']
      },
      'oscilloscope': {
        title: '示波器的使用',
        videoSrc: '',
        description: '掌握示波器的基本操作',
        materials: ['示波器', '信号发生器', '探头', '连接线'],
        steps: ['调节示波器', '连接信号', '观察波形', '测量参数']
      },
      'hall-effect-solenoid': {
        title: '霍尔效应法测量螺线管磁场',
        videoSrc: '',
        description: '用霍尔效应测量螺线管内磁场',
        materials: ['霍尔元件', '螺线管', '电源', '毫伏表'],
        steps: ['安装霍尔元件', '通电产生磁场', '测量霍尔电压', '计算磁感应强度']
      },
      'hall-effect': {
        title: '霍尔效应及其应用',
        videoSrc: '',
        description: '研究霍尔效应的原理和应用',
        materials: ['霍尔元件', '磁铁', '电源', '测量仪表'],
        steps: ['理解霍尔效应', '测量霍尔系数', '研究应用', '分析特性']
      },
      'rectifier-filter': {
        title: '整流滤波电路',
        videoSrc: '',
        description: '研究整流滤波电路的工作原理',
        materials: ['二极管', '电容', '变压器', '示波器'],
        steps: ['搭建整流电路', '观察整流波形', '添加滤波电路', '分析滤波效果']
      },
      'ac-bridge': {
        title: '交流电桥的原理和应用',
        videoSrc: '',
        description: '学习交流电桥的测量原理',
        materials: ['交流电桥', '电容', '电感', '示波器'],
        steps: ['连接交流电桥', '调节平衡条件', '测量元件参数', '分析误差']
      },
      'black-box': {
        title: '黑盒子实验',
        videoSrc: '',
        description: '通过测量推断黑盒子内部电路结构',
        materials: ['黑盒子', '万用表', '信号发生器', '示波器'],
        steps: ['测量端口特性', '分析电路行为', '推断内部结构', '验证猜想']
      },
      'wheatstone-bridge': {
        title: '惠斯通电桥测表头内阻',
        videoSrc: '',
        description: '用惠斯通电桥测量表头内阻',
        materials: ['惠斯通电桥', '表头', '标准电阻', '检流计'],
        steps: ['连接电桥电路', '调节电桥平衡', '计算表头内阻', '验证结果']
      },
      'potentiometer-resistance': {
        title: '电位差计精确测定电阻',
        videoSrc: '',
        description: '用电位差计精确测定电阻值',
        materials: ['电位差计', '标准电阻', '待测电阻', '检流计'],
        steps: ['连接测量电路', '调节电位差计', '测量电压降', '计算电阻值']
      },
      'meter-calibration': {
        title: '电表的扩程和校准',
        videoSrc: '',
        description: '学习电表扩程和校准方法',
        materials: ['电流表', '电压表', '分流器', '分压器'],
        steps: ['计算扩程参数', '连接扩程电路', '校准电表', '验证精度']
      },
      'nonlinear-circuit': {
        title: '非线性电路振荡周期的分岔与混沌实验',
        videoSrc: '',
        description: '研究非线性电路的混沌现象',
        materials: ['非线性电路', '示波器', '频谱分析仪', '计算机'],
        steps: ['搭建非线性电路', '观察振荡现象', '分析分岔过程', '研究混沌特性']
      },
      'gmr-sensor': {
        title: '巨磁阻传感器的应用',
        videoSrc: '',
        description: '研究巨磁阻传感器的应用原理',
        materials: ['GMR传感器', '磁场源', '电源', '测量仪表'],
        steps: ['了解GMR效应', '测量磁阻特性', '研究应用', '分析性能']
      },
      'led-characteristics': {
        title: '三基色发光二极管的伏安特性与混色实验',
        videoSrc: '',
        description: '研究LED的伏安特性和混色原理',
        materials: ['RGB LED', '电源', '万用表', '光度计'],
        steps: ['测量LED伏安特性', '研究发光特性', '进行混色实验', '分析光谱']
      },
      'led-temperature': {
        title: '发光二极管的温度特性与点阵显示实验',
        videoSrc: '',
        description: '研究LED的温度特性',
        materials: ['LED', '加热器', '温度计', '点阵显示器'],
        steps: ['测量温度特性', '研究亮度变化', '点阵显示实验', '分析温度影响']
      },
      
      // 光学实验
      'spectrometer': {
        title: '分光计的调整',
        videoSrc: '',
        description: '学习分光计的调整和使用方法',
        materials: ['分光计', '三棱镜', '汞灯', '目镜'],
        steps: ['调整分光计', '校准刻度盘', '测量光谱', '计算折射率']
      },
      'polarized-light': {
        title: '偏振光的研究',
        videoSrc: '',
        description: '研究偏振光的性质和应用',
        materials: ['偏振片', '激光器', '检偏器', '光度计'],
        steps: ['产生偏振光', '验证马吕斯定律', '研究偏振现象', '测量偏振度']
      },
      'newton-rings': {
        title: '用牛顿环测定透镜的曲率半径',
        videoSrc: '',
        description: '利用牛顿环干涉测量透镜曲率半径',
        materials: ['平凸透镜', '平玻璃板', '钠光灯', '读数显微镜'],
        steps: ['调整牛顿环装置', '观察干涉条纹', '测量环半径', '计算曲率半径']
      },
      'michelson-interferometer': {
        title: '迈克尔逊干涉仪',
        videoSrc: '',
        description: '使用迈克尔逊干涉仪进行精密测量',
        materials: ['迈克尔逊干涉仪', '激光器', '反射镜', '观察屏'],
        steps: ['调整干涉仪', '观察干涉条纹', '测量波长', '精密测距']
      },
      'grating-diffraction': {
        title: '光栅衍射实验',
        videoSrc: '',
        description: '研究光栅衍射现象和规律',
        materials: ['光栅', '激光器', '屏幕', '米尺'],
        steps: ['设置光栅实验', '观察衍射图样', '测量衍射角', '计算光栅常数']
      },
      'single-slit-diffraction': {
        title: '单缝衍射的光强分布',
        videoSrc: '',
        description: '测量单缝衍射的光强分布',
        materials: ['单缝', '激光器', '光电探测器', '移动装置'],
        steps: ['设置单缝装置', '扫描衍射图样', '测量光强分布', '验证理论公式']
      },
      'zeeman-effect': {
        title: '塞曼效应',
        videoSrc: '',
        description: '观察和研究塞曼效应',
        materials: ['磁铁', '汞灯', '法布里-珀罗干涉仪', '偏振片'],
        steps: ['产生强磁场', '观察光谱分裂', '分析偏振特性', '计算磁矩']
      },
      'faraday-effect': {
        title: '法拉第效应',
        videoSrc: '',
        description: '研究法拉第磁光效应',
        materials: ['磁光材料', '偏振片', '磁场', '激光器'],
        steps: ['设置磁光实验', '测量偏振旋转', '研究磁场依赖性', '计算韦尔德常数']
      },
      'ultrasonic-grating': {
        title: '超声光栅测量声速',
        videoSrc: '',
        description: '用超声光栅测量声速',
        materials: ['超声发生器', '激光器', '水槽', '观察屏'],
        steps: ['产生超声波', '形成声光栅', '观察衍射', '计算声速']
      },
      'fiber-optic': {
        title: '音频信号光纤传输技术实验',
        videoSrc: '',
        description: '研究光纤通信技术',
        materials: ['光纤', '激光器', '光电探测器', '音频信号源'],
        steps: ['连接光纤系统', '调制音频信号', '光纤传输', '解调接收信号']
      },
      'ellipsometry': {
        title: '椭圆偏振光法测量薄膜厚度和折射率',
        videoSrc: '',
        description: '用椭偏法测量薄膜参数',
        materials: ['椭偏仪', '薄膜样品', '激光器', '检偏器'],
        steps: ['校准椭偏仪', '测量椭偏参数', '拟合理论模型', '确定薄膜参数']
      },
      'magneto-optic-kerr': {
        title: '表面磁光克尔效应实验',
        videoSrc: '',
        description: '研究表面磁光克尔效应',
        materials: ['磁性薄膜', '偏振激光', '磁场', '光电探测器'],
        steps: ['制备磁性样品', '施加磁场', '测量克尔旋转', '分析磁光特性']
      },
      'liquid-crystal': {
        title: '液晶电光效应特性研究',
        videoSrc: '',
        description: '研究液晶的电光效应',
        materials: ['液晶盒', '偏振片', '电源', '光度计'],
        steps: ['制备液晶样品', '施加电场', '测量透射率', '分析电光特性']
      },
      
      // 热学实验
      'thermal-conductivity': {
        title: '不良导体导热系数的测定',
        videoSrc: '',
        description: '测定不良导体的导热系数',
        materials: ['不良导体样品', '加热器', '温度计', '保温材料'],
        steps: ['建立稳态传热', '测量温度分布', '计算热流', '确定导热系数']
      },
      'heat-engine': {
        title: '热机循环',
        videoSrc: '',
        description: '研究热机的工作循环',
        materials: ['热机模型', '压力计', '温度计', '功率计'],
        steps: ['运行热机循环', '测量状态参数', '计算循环功', '分析效率']
      },
      'thermocouple': {
        title: '热电偶的标定和测温',
        videoSrc: '',
        description: '标定热电偶并进行温度测量',
        materials: ['热电偶', '标准温度计', '恒温槽', '毫伏表'],
        steps: ['制作热电偶', '标定温度特性', '绘制标定曲线', '实际测温应用']
      },
      
      // 现代物理实验
      'pasco-experiment': {
        title: 'Pasco实验',
        videoSrc: '',
        description: '使用Pasco设备进行现代物理实验',
        materials: ['Pasco实验装置', '传感器', '计算机', '软件'],
        steps: ['连接Pasco设备', '配置实验参数', '采集数据', '分析结果']
      },
      'physics-basics': {
        title: '物理实验基本技术',
        videoSrc: '',
        description: '掌握物理实验的基本技术和方法',
        materials: ['基本测量工具', '数据处理软件', '实验记录本'],
        steps: ['学习测量技术', '掌握误差分析', '数据处理方法', '实验报告撰写']
      },
      'comprehensive-modern': {
        title: '近代综合实验',
        videoSrc: '',
        description: '综合性的近代物理实验',
        materials: ['综合实验装置', '多种传感器', '计算机系统'],
        steps: ['设计实验方案', '搭建实验装置', '测量物理量', '综合分析结果']
      },
      'franck-hertz': {
        title: '夫兰克-赫兹实验',
        videoSrc: '',
        description: '验证原子能级的量子化',
        materials: ['夫兰克-赫兹管', '电源', '电流表', '示波器'],
        steps: ['加热汞蒸气', '施加加速电压', '测量电流变化', '验证能级量子化']
      },
      'photoelectric-planck': {
        title: '光电效应测定普朗克常数',
        videoSrc: '',
        description: '通过光电效应测定普朗克常数',
        materials: ['光电管', '单色光源', '电压表', '电流表'],
        steps: ['照射不同频率光', '测量截止电压', '绘制关系曲线', '计算普朗克常数']
      },
      'millikan-oil-drop': {
        title: '密立根油滴CCD微机系统电子电荷的测定',
        videoSrc: '',
        description: '用油滴法测定电子电荷',
        materials: ['油滴装置', 'CCD摄像头', '电场', '计算机'],
        steps: ['产生带电油滴', '观察油滴运动', '测量运动参数', '计算电子电荷']
      },
      'hydrogen-spectrum': {
        title: '氢原子光谱的测定',
        videoSrc: '',
        description: '测定氢原子的光谱线',
        materials: ['氢放电管', '分光计', '光栅', 'CCD探测器'],
        steps: ['激发氢原子', '分光观察光谱', '测量波长', '验证巴尔末公式']
      },
      'light-speed': {
        title: '光拍法测量光速实验',
        videoSrc: '',
        description: '用光拍法测量光速',
        materials: ['激光器', '调制器', '光电探测器', '示波器'],
        steps: ['产生调制光', '测量光拍频率', '计算光程差', '确定光速']
      },
      'nmr': {
        title: '核磁共振',
        videoSrc: '',
        description: '研究核磁共振现象',
        materials: ['NMR装置', '样品', '射频发生器', '检测器'],
        steps: ['制备样品', '施加磁场', '射频激发', '检测共振信号']
      },
      'esr': {
        title: '电子顺磁共振',
        videoSrc: '',
        description: '研究电子顺磁共振现象',
        materials: ['ESR装置', '顺磁样品', '微波源', '检测器'],
        steps: ['制备顺磁样品', '施加磁场', '微波激发', '检测共振信号']
      },
      'x-ray-diffraction': {
        title: 'X射线衍射实验',
        videoSrc: '',
        description: '利用X射线研究晶体结构',
        materials: ['X射线源', '晶体样品', '探测器', '转台'],
        steps: ['制备晶体样品', '产生X射线', '测量衍射图样', '分析晶体结构']
      },
      'x-ray-detection': {
        title: '用电离法探测X射线实验',
        videoSrc: '',
        description: '用电离法探测X射线',
        materials: ['X射线源', '电离室', '电流表', '高压电源'],
        steps: ['产生X射线', '电离气体', '测量电离电流', '分析X射线特性']
      }
    }
    
    const config = experimentConfigs[experimentId] || experimentConfigs['iv-characteristic']
    
    this.setData({
      experimentTitle: config.title,
      videoSrc: config.videoSrc,
      experimentDescription: config.description,
      experimentMaterials: config.materials,
      experimentSteps: config.steps,
      demoVideoSrc: config.demoVideoSrc || '',
      demoVideoDuration: config.demoVideoDuration || '',
      demoVideoDescription: config.demoVideoDescription || ''
    })
  },

  switchStep(e: any) {
    const step = e.currentTarget.dataset.step
    this.setData({
      currentStep: step,
      stepIndex: 0
    })
  },

  onVideoPlay() {
    console.log('视频开始播放')
  },

  onVideoError(e: any) {
    console.error('视频播放错误:', e)
    wx.showToast({
      title: '视频加载失败',
      icon: 'none',
      duration: 2000
    })
  },

  onDemoVideoPlay() {
    console.log('演示视频开始播放')
    console.log('当前视频源:', this.data.demoVideoSrc)
    wx.showToast({
      title: '开始播放演示视频',
      icon: 'success',
      duration: 1500
    })
  },

  onDemoVideoError(e: any) {
    console.error('演示视频播放错误:', e)
    console.error('错误详情:', e.detail)
    console.error('当前视频源:', this.data.demoVideoSrc)
    wx.showToast({
      title: `视频加载失败: ${e.detail?.errMsg || '未知错误'}`,
      icon: 'none',
      duration: 3000
    })
  },

  onDemoVideoLoaded(e: any) {
    console.log('演示视频元数据加载完成:', e.detail)
    console.log('当前视频源:', this.data.demoVideoSrc)
    console.log('视频详情:', {
      width: e.detail.width,
      height: e.detail.height,
      duration: e.detail.duration
    })
    
    wx.showToast({
      title: '视频加载完成',
      icon: 'success',
      duration: 1000
    })
  },

  onDemoVideoCanPlay(e: any) {
    console.log('演示视频可以播放:', e.detail)
  },

  videoErrorCallback(e: any) {
    console.error('视频播放错误:', e.detail.errMsg);
    wx.showToast({
      title: '视频加载失败',
      icon: 'none'
    });
  },

  getExperimentConfig(experimentId: string) {
    const configs: any = {
      'ohm-law': {
        title: '欧姆定律验证',
        videoSrc: '',
        description: '验证欧姆定律的正确性',
        materials: ['电阻', '电源', '万用表', '导线'],
        steps: ['连接电路', '测量电压', '测量电流', '计算电阻'],
        demoVideoSrc: 'https://example.com/demo/ohm-law.mp4',
        demoVideoDuration: '2分30秒',
        demoVideoDescription: '详细演示欧姆定律验证实验的完整操作流程'
      },
      'series-parallel': {
        title: '串并联电路',
        videoSrc: '',
        description: '研究串联和并联电路的特性',
        materials: ['电阻', '电源', '万用表', '开关'],
        steps: ['搭建串联电路', '测量串联特性', '搭建并联电路', '测量并联特性'],
        demoVideoSrc: 'https://example.com/demo/series-parallel.mp4',
        demoVideoDuration: '3分15秒',
        demoVideoDescription: '演示串并联电路的搭建和测量方法'
      },
      'capacitor-charge': {
        title: '电容器充放电',
        videoSrc: '',
        description: '观察电容器的充放电过程',
        materials: ['电容器', '电阻', '电源', '示波器'],
        steps: ['连接充电电路', '观察充电过程', '连接放电电路', '观察放电过程'],
        demoVideoSrc: 'https://example.com/demo/capacitor.mp4',
        demoVideoDuration: '2分45秒',
        demoVideoDescription: '展示电容器充放电的完整实验过程'
      },
      'inductor-response': {
        title: '电感器响应',
        videoSrc: '',
        description: '测量电感器的频率响应',
        materials: ['电感器', '信号发生器', '示波器', '电阻'],
        steps: ['连接测试电路', '设置信号频率', '测量响应', '分析结果'],
        demoVideoSrc: 'https://example.com/demo/inductor.mp4',
        demoVideoDuration: '3分00秒',
        demoVideoDescription: '演示电感器频率响应测量的实验步骤'
      },
      'transformer': {
        title: '变压器特性',
        videoSrc: '',
        description: '测量变压器的变比和效率',
        materials: ['变压器', '交流电源', '万用表', '负载电阻'],
        steps: ['连接初级电路', '连接次级电路', '测量电压比', '计算变比'],
        demoVideoSrc: 'https://example.com/demo/transformer.mp4',
        demoVideoDuration: '2分20秒',
        demoVideoDescription: '详细展示变压器特性测量的实验方法'
      },
      'iv-characteristic': {
        title: '电子元件的伏安特性',
        videoSrc: '',
        description: '测量电子元件的伏安特性曲线',
        materials: ['万用表', '电阻', '二极管', '电源'],
        steps: ['连接测量电路', '改变电压', '测量电流', '绘制特性曲线'],
        demoVideoSrc: 'https://r2.sakinori.top/26bead3f5ac7c2e986254e0356525896.mp4',
        demoVideoDuration: '1分33秒',
        demoVideoDescription: '详细演示伏安特性曲线测量的完整操作流程，包括电路连接、仪器调节、数据测量和曲线绘制等关键步骤'
      }
    }
    return configs[experimentId]
  },

  previewPPT() {
    const pptUrl = 'https://example.com/ppt/iv-characteristic-experiment.pptx' 
    
    wx.showModal({
      title: 'PPT预览',
      content: '是否要预览PPT文件？预览将在新窗口中打开。',
      success: (res) => {
        if (res.confirm) {
          // 使用web-view预览PPT
          wx.navigateTo({
            url: `/pages/webview/webview?url=${encodeURIComponent(pptUrl)}&title=PPT预览`,
            fail: () => {
              // 如果webview页面不存在，使用复制链接的方式
              wx.setClipboardData({
                data: pptUrl,
                success: () => {
                  wx.showModal({
                    title: '提示',
                    content: 'PPT链接已复制到剪贴板，请在浏览器中打开预览',
                    showCancel: false
                  })
                }
              })
            }
          })
        }
      }
    })
  },

  downloadPPT() {
    const pptUrl = 'https://example.com/ppt/iv-characteristic-experiment.pptx'
    
    wx.showModal({
      title: '下载PPT',
      content: '是否要下载PPT文件到本地？',
      success: (res) => {
        if (res.confirm) {
          wx.showLoading({
            title: '正在下载...',
            mask: true
          })
          
          wx.downloadFile({
            url: pptUrl,
            success: (downloadRes) => {
              wx.hideLoading()
              
              if (downloadRes.statusCode === 200) {
                wx.saveFile({
                  tempFilePath: downloadRes.tempFilePath,
                  success: (saveRes) => {
                    wx.showToast({
                      title: '下载成功',
                      icon: 'success',
                      duration: 2000
                    })
                    console.log('PPT下载成功，保存路径:', saveRes.savedFilePath)
                  },
                  fail: (error) => {
                    console.error('保存文件失败:', error)
                    wx.showToast({
                      title: '保存失败',
                      icon: 'none',
                      duration: 2000
                    })
                  }
                })
              } else {
                wx.showToast({
                  title: '下载失败',
                  icon: 'none',
                  duration: 2000
                })
              }
            },
            fail: (error) => {
              wx.hideLoading()
              console.error('下载失败:', error)
              wx.showToast({
                title: '下载失败',
                icon: 'none',
                duration: 2000
              })
            }
          })
        }
      }
    })
  },

  chooseImageFile() {
    wx.chooseImage({
      count: 5,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        console.log('选择图片成功:', res);
        this.handleFileUpload(res.tempFiles, 'image');
      },
      fail: (err) => {
        console.error('选择图片失败:', err);
        wx.showToast({
          title: '图片选择失败',
          icon: 'none',
          duration: 2000
        });
      }
    });
  },

  chooseDocumentFile() {
    wx.chooseMessageFile({
      count: 1,
      type: 'file',
      extension: ['pdf', 'doc', 'docx'],
      success: (res) => {
        console.log('选择文件成功:', res);
        this.handleFileUpload(res.tempFiles, 'document');
      },
      fail: (err) => {
        console.error('选择文件失败:', err);
        wx.showToast({
          title: '文件选择失败',
          icon: 'none',
          duration: 2000
        });
      }
    });
  },

  handleFileUpload(files: any[], fileType: 'image' | 'document') {
    const uploadedFiles = [...this.data.uploadedFiles];

    files.forEach((file, index) => {
      let fileName = '未知文件';
      if (fileType === 'document' && file.name) {
        fileName = file.name;
      } else if (fileType === 'image' && file.path) {
        // 从路径中提取文件名
        const pathParts = file.path.split('/');
        fileName = pathParts[pathParts.length - 1] || `图片${index + 1}`;
      }

      const fileInfo = {
        name: fileName,
        size: this.formatFileSize(file.size),
        status: 'uploading',
        statusText: '上传中...',
        path: file.path
      };

      uploadedFiles.push(fileInfo);

      setTimeout(() => {
        const targetFile = uploadedFiles.find(f => f.path === file.path);
        if (targetFile) {
          targetFile.status = 'success';
          targetFile.statusText = '上传成功';
          this.setData({
            uploadedFiles: [...uploadedFiles]
          });
        }
      }, 1000 + index * 500);
    });

    this.setData({
      uploadedFiles
    });
  },

  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 B'
    const k = 1024
    const sizes = ['B', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  },

  deleteFile(e: any) {
    const index = e.currentTarget.dataset.index
    const uploadedFiles = [...this.data.uploadedFiles]
    uploadedFiles.splice(index, 1)
    this.setData({
      uploadedFiles
    })
  },

  startSimulation() {
    wx.showModal({
      title: '仿真实验',
      content: '仿真实验功能正在开发中，即将上线！',
      showCancel: false
    })
  },

  viewTutorial() {
    wx.navigateTo({
      url: '/pages/tutorial/tutorial'
    });
  },

  goToQuiz() {
    console.log('Attempting to navigate to quiz page...');
    wx.navigateTo({
      url: '/pages/quiz/quiz',
      success: () => {
        console.log('Successfully navigated to quiz page.');
      },
      fail: (error) => {
        console.error('Failed to navigate to quiz page:', error);
        wx.showToast({
          title: '页面跳转失败',
          icon: 'none'
        });
      }
    });
  },

  submitHomework() {
    const { uploadedFiles } = this.data
    
    if (uploadedFiles.length === 0) {
      wx.showToast({
        title: '请先选择要上传的文件',
        icon: 'none',
        duration: 2000
      })
      return
    }
    
    wx.showModal({
      title: '确认提交',
      content: `确定要提交 ${uploadedFiles.length} 个文件的作业吗？`,
      success: (res) => {
        if (res.confirm) {
          wx.showToast({
            title: '作业提交成功！',
            icon: 'success',
            duration: 2000
          })
        }
      }
    })
  },

  goBack() {
    wx.navigateBack({
      fail: () => {
        wx.switchTab({
          url: '../index/index'
        })
      }
    })
  },

  


  async pollChatResult(conversationId: string, chatId: string): Promise<string> {
    const maxAttempts = 30; // 最多轮询30次
    const pollInterval = 2000; // 每2秒轮询一次
    
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        console.log(`轮询第${attempt}次，获取聊天结果...`);
        
        const response = await new Promise<any>((resolve, reject) => {
          wx.request({
            url: `https://api.coze.cn/v3/chat/retrieve?conversation_id=${conversationId}&chat_id=${chatId}`,
            method: 'GET',
            header: {
              'Authorization': CozeAPIConfig.authorization,
              'Content-Type': 'application/json'
            },
            timeout: CozeAPIConfig.requestConfig.timeout,
            success: resolve,
            fail: reject
          });
        });
        
        console.log(`轮询第${attempt}次响应状态:`, response.statusCode);
        console.log(`轮询第${attempt}次响应数据:`, response.data);
        
        if (response.statusCode === 200) {
          const data = response.data as any;
          
          if (data.code === 0 && data.data) {
            const chatData = data.data;
            console.log('轮询获取的聊天数据:', chatData);
            
            if (chatData.status === 'completed') {
              console.log('任务已完成，获取消息列表...');
              
              const messagesResponse = await new Promise<any>((resolve, reject) => {
                wx.request({
                  url: `https://api.coze.cn/v3/chat/message/list?conversation_id=${conversationId}&chat_id=${chatId}`,
                  method: 'GET',
                  header: {
                    'Authorization': CozeAPIConfig.authorization,
                    'Content-Type': 'application/json'
                  },
                  timeout: CozeAPIConfig.requestConfig.timeout,
                  success: resolve,
                  fail: reject
                });
              });
              
              console.log('消息列表响应:', messagesResponse.data);
              
              if (messagesResponse.statusCode === 200) {
                const messagesData = messagesResponse.data as any;
                if (messagesData.code === 0 && messagesData.data && messagesData.data.length > 0) {
                  // 找到最后一条AI回复
                  const aiMessages = messagesData.data.filter((msg: any) => msg.role === 'assistant' && msg.type === 'answer');
                  if (aiMessages.length > 0) {
                    const lastAiMessage = aiMessages[aiMessages.length - 1];
                    console.log('获取到AI回复:', lastAiMessage.content);
                    return lastAiMessage.content || '获取AI回复失败';
                  }
                }
              }
              
              return '未找到AI回复内容';
            } else if (chatData.status === 'failed') {
              console.log('任务失败:', chatData.last_error);
              return `AI处理失败: ${chatData.last_error?.msg || '未知错误'}`;
            } else if (chatData.status === 'in_progress') {
              console.log('任务仍在进行中，继续等待...');
            } else {
              console.log('未知任务状态:', chatData.status);
            }
          }
        }
        
        if (attempt < maxAttempts) {
          await new Promise(resolve => setTimeout(resolve, pollInterval));
        }
        
      } catch (error) {
        console.error(`轮询第${attempt}次出错:`, error);
        if (attempt === maxAttempts) {
          return '轮询获取结果失败，请稍后再试';
        }
        await new Promise(resolve => setTimeout(resolve, pollInterval));
      }
    }
    
    return '获取AI回复超时，请稍后再试';
  },

  onInputChange(e: any) {
    this.setData({
      inputText: e.detail.value
    })
  },

  sendMessage() {
    const inputText = this.data.inputText.trim()
    if (!inputText || this.data.isLoading) {
      return
    }

    const userMessage = {
      type: 'user' as const,
      content: inputText,
      time: this.formatTime(new Date())
    }

    const newMessages = [...this.data.chatMessages, userMessage]
    this.setData({
      chatMessages: newMessages,
      inputText: '',
      isLoading: true
    })

    this.scrollToBottom()

    this.callAIAPI(inputText)
  },

  async callAIAPI(question: string) {
    try {
      const response = await new Promise<any>((resolve, reject) => {
        wx.request({
          url: CozeAPIConfig.baseURL,
          method: 'POST',
          timeout: CozeAPIConfig.requestConfig.timeout,
          header: {
            'Authorization': CozeAPIConfig.authorization,
            'Content-Type': 'application/json'
          },
          data: {
            bot_id: CozeAPIConfig.botId,
            user_id: CozeAPIConfig.userId,
            stream: CozeAPIConfig.requestConfig.stream,
            auto_save_history: CozeAPIConfig.requestConfig.auto_save_history,
            additional_messages: [
              {
                role: 'user',
                content: question,
                content_type: 'text'
              }
            ]
          },
          success: (res) => resolve(res),
          fail: (err) => reject(err)
        });
      });

      let aiResponse = '';
      console.log('API响应状态码:', response.statusCode);
      console.log('API响应数据:', response.data);
      
      if (response.statusCode === 200 && response.data) {
        const data = response.data as any;
        console.log('解析后的数据:', data);
        
        if (data.code === 0 && data.data) {
          const responseData = data.data;
          console.log('扣子API响应数据:', responseData);
          
          if (responseData.status === 'in_progress') {
            console.log('任务进行中，开始轮询结果...');
            aiResponse = await this.pollChatResult(responseData.conversation_id, responseData.id);
          } else if (responseData.messages && responseData.messages.length > 0) {
            const lastMessage = responseData.messages[responseData.messages.length - 1];
            aiResponse = lastMessage.content || CozeAPIConfig.errorMessages.apiError;
            console.log('使用API messages响应:', aiResponse);
          } else if (responseData.content) {
            aiResponse = responseData.content;
            console.log('使用API data.content响应:', aiResponse);
          } else if (responseData.answer) {
            aiResponse = responseData.answer;
            console.log('使用API data.answer响应:', aiResponse);
          } else {
            console.log('扣子API data字段格式不符合预期');
            console.log('data字段结构:', Object.keys(responseData));
            console.log('完整data内容:', responseData);
            aiResponse = 'API响应数据格式错误，请检查扣子API文档';
          }
        } else if (data.messages && data.messages.length > 0) {
          const lastMessage = data.messages[data.messages.length - 1];
          aiResponse = lastMessage.content || CozeAPIConfig.errorMessages.apiError;
          console.log('使用API直接messages响应:', aiResponse);
        } else if (data.content) {
          aiResponse = data.content;
          console.log('使用API直接content响应:', aiResponse);
        } else if (data.answer) {
          aiResponse = data.answer;
          console.log('使用API直接answer响应:', aiResponse);
        } else {
          console.log('API响应格式不符合预期');
          console.log('响应数据结构:', Object.keys(data));
          console.log('完整响应数据:', data);
          aiResponse = `API响应格式错误。响应结构: ${Object.keys(data).join(', ')}`;
        }
      } else {
         console.log('API调用失败，状态码:', response.statusCode);
         if (response.statusCode === 408) {
           aiResponse = CozeAPIConfig.errorMessages.timeoutError;
         } else {
           aiResponse = CozeAPIConfig.errorMessages.apiError;
         }
       }
      
      const formattedContent = this.formatAIContent(aiResponse);
      console.log('原始AI回复:', aiResponse);
      console.log('格式化后内容:', formattedContent);
      
      const aiMessage = {
        type: 'ai' as const,
        content: aiResponse,
        formattedContent: formattedContent,
        time: this.formatTime(new Date())
      }

      const newMessages = [...this.data.chatMessages, aiMessage]
      this.setData({
        chatMessages: newMessages,
        isLoading: false
      })

      this.scrollToBottom()

    } catch (error: any) {
      console.error('扣子API调用失败:', error)
      
      wx.showModal({
        title: 'API调用失败',
        content: `调用失败，请检查API配置。\n错误信息: ${error.message || '未知错误'}`,
        showCancel: false,
        confirmText: '确定'
      })

      this.setData({
        isLoading: false
      })
    }
  },



  formatAIContent(content: string): string {
    let formatted = content.replace(/\n/g, '<br/>')
    
    formatted = formatted.replace(/!\s*\[([^\]]*)\]\(([^\)]+)\)/g, '<img src="$2" alt="$1" style="max-width: 100%; height: auto; margin: 10px 0; border-radius: 4px;"/>')
    formatted = formatted.replace(/!\s*`([^`]+)`/g, '<img src="$1" alt="图片" style="max-width: 100%; height: auto; margin: 10px 0; border-radius: 4px;"/>')
    
    formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    
    formatted = formatted.replace(/• (.*?)<br\/>/g, '<div style="margin: 5px 0; padding-left: 10px;">• $1</div>')
    
    formatted = formatted.replace(/(\d+\. .*?)<br\/>/g, '<div style="margin: 5px 0; padding-left: 10px;">$1</div>')
    
    return formatted
  },

  formatTime(date: Date): string {
    const hours = date.getHours().toString().padStart(2, '0')
    const minutes = date.getMinutes().toString().padStart(2, '0')
    return `${hours}:${minutes}`
  },

  scrollToBottom() {
    const messageCount = this.data.chatMessages.length
    if (messageCount > 0) {
      this.setData({
        scrollIntoView: `msg-${messageCount - 1}`
      })
    }
  }
})
