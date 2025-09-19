// index.ts
const app = getApp<IAppOption>()

interface ExperimentModule {
  id: string;
  title: string;
  description: string;
  icon: string;
  difficulty: 'easy' | 'medium' | 'hard';
  duration: string;
  route: string;
}

Page({
  data: {
    experimentModules: [
      {
        id: 'iv-characteristic',
        title: '伏安特性曲线实验',
        description: '通过测量元件的伏安特性曲线，掌握电路基本规律和测量方法',
        icon: '📊',
        difficulty: 'medium',
        duration: '90分钟',
        route: 'pages/experiment/experiment'
      },
      {
        id: 'other-experiments',
        title: '其他实验',
        description: '探索更多物理实验，拓展实验技能和知识面',
        icon: '🔬',
        difficulty: 'easy',
        duration: '不限',
        route: 'pages/experiment-list/experiment-list'
      }
    ] as ExperimentModule[],
  },

  onLoad() {
    console.log('物理实验首页加载完成')
  },

  onShow() {
    console.log('物理实验首页显示')
  },

  navigateToExperiment(e: any) {
    const experimentId = e.currentTarget.dataset.id
    const experimentTitle = e.currentTarget.dataset.title
    const experimentModule = this.data.experimentModules.find(module => module.id === experimentId)
    
    if (!experimentModule) {
      wx.showToast({
        title: '实验模块不存在',
        icon: 'error'
      })
      return
    }

    let targetUrl = '';
    if (experimentModule.id === 'iv-characteristic') {
      targetUrl = `../experiment/experiment?id=${experimentId}&title=${experimentTitle}`;
    } else if (experimentModule.id === 'other-experiments') {
      targetUrl = `../experiment-list/experiment-list`;
    }

    if (targetUrl) {
        wx.navigateTo({
          url: targetUrl,
          fail: (err) => {
            console.error('页面跳转失败:', err)
            wx.showToast({
              title: '页面跳转失败，请重试',
              icon: 'none',
              duration: 2000
            })
          }
        })
    }
  },

  getDifficultyColor(difficulty: string): string {
    const colorMap: Record<string, string> = {
      'easy': '#52c41a',
      'medium': '#faad14', 
      'hard': '#f5222d'
    }
    return colorMap[difficulty] || '#666666'
  },

  getDifficultyText(difficulty: string): string {
    const textMap: Record<string, string> = {
      'easy': '简单',
      'medium': '中等',
      'hard': '困难'
    }
    return textMap[difficulty] || '未知'
  }
})
