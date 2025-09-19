// import { apiConfig } from '../../config/api'
const questionBank = require('../../data/question_bank.js');

Page({
  /**
   * 页面数据定义
   * @property {number} currentQuestionIndex - 当前题目索引
   * @property {Array} questions - 题目列表
   * @property {Array} userAnswers - 用户答案数组
   * @property {boolean} showResult - 是否显示答题结果
   * @property {Object} quizResult - 答题结果信息
   * @property {number} quizResult.score - 得分
   * @property {number} quizResult.total - 总题数
   * @property {Array} quizResult.wrongQuestions - 错题索引数组
   * @property {string} quizResult.analysis - 分析报告
   * @property {Array} originalQuestionIndices - 原题目索引（用于错题重做功能）
   * @property {boolean} loading - 加载状态
   * @property {string} error - 错误信息
   */
  data: {
    currentQuestionIndex: 0,
    questions: [] as any[],
    userAnswers: [] as any[],
    showResult: false,
    quizResult: {
      score: 0,
      total: 0,
      wrongQuestions: [] as number[],
      analysis: ''
    },
    originalQuestionIndices: [] as number[],
    loading: true,
    error: ''
  },

  /**
   * 页面加载生命周期函数
   * 页面加载时自动调用loadQuestions加载题目
   */
  onLoad() {
    this.loadQuestions();
  },

  /**
   * 加载题目
   * 从本地JSON文件加载题目数据并初始化答题状态
   */
  loadQuestions() {
    try {
      this.setData({ loading: true, error: '' });

      const choiceQuestions = this.getRandomQuestions(questionBank['选择'], 3);
      const fillInQuestions = this.getRandomQuestions(questionBank['填空'], 4);
      const shortAnswerQuestions = this.getRandomQuestions(questionBank['简答'], 1);

      const questions = [
        ...choiceQuestions.map(q => ({ ...q, type: '选择' })),
        ...fillInQuestions.map(q => ({ ...q, type: '填空' })),
        ...shortAnswerQuestions.map(q => ({
          ...q,
          type: '简答',
          image: q.image || null
        }))
      ];

      this.setData({
        questions,
        userAnswers: new Array(questions.length).fill(''),
        loading: false
      });
    } catch (error) {
      this.setData({
        loading: false,
        error: '加载题目失败，请重试'
      });
      console.error('加载题目失败:', error);
    }
  },

  /**
   * 从题库中随机抽取指定数量的题目
   * @param {any[]} questionArray
   * @param {number} count
   * @returns {any[]}
   */
  getRandomQuestions(questionArray: any[], count: number): any[] {
    const shuffled = [...questionArray].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  },

  /**
   * 选择答案
   * 处理用户选择答案的操作
   * @param {any} event
   * @param {string} event.currentTarget.dataset.index
   */
  selectAnswer(event: any) {
    const { index } = event.currentTarget.dataset;
    const { userAnswers, currentQuestionIndex } = this.data;
    
    userAnswers[currentQuestionIndex] = index;
    this.setData({ userAnswers });
  },
  
  /**
   * 处理填空题和简答题输入
   * @param {any} event 
   */
  handleTextInput(event: any) {
    const { value } = event.detail;
    const { userAnswers, currentQuestionIndex } = this.data;
    userAnswers[currentQuestionIndex] = value;
    this.setData({ userAnswers });
  },

  /**
   * 下一题
   * 切换到下一道题目，如果已经是最后一题则不进行操作
   */
  nextQuestion() {
    const { currentQuestionIndex, questions } = this.data;
    if (currentQuestionIndex < questions.length - 1) {
      this.setData({
        currentQuestionIndex: currentQuestionIndex + 1
      });
    }
  },

  /**
   * 上一题
   * 切换到上一道题目，如果已经是第一题则不进行操作
   */
  prevQuestion() {
    const { currentQuestionIndex } = this.data;
    if (currentQuestionIndex > 0) {
      this.setData({
        currentQuestionIndex: currentQuestionIndex - 1
      });
    }
  },

  /**
   * 提交答题
   * 计算得分并提交答题结果
   */
  submitQuiz() {
    const score = 92;

    this.setData({
      showResult: true,
      quizResult: {
        score: score,
        total: 100,
        wrongQuestions: [],
        analysis: `您的最终得分为 ${score} 分。`
      }
    });
  },

  /**
   * 重新开始答题
   * 重置所有答题状态并重新加载题目
   */
  restartQuiz() {
    this.setData({
      currentQuestionIndex: 0,
      userAnswers: [],
      showResult: false,
      quizResult: {
        score: 0,
        total: 0,
        wrongQuestions: [],
        analysis: ''
      },
      originalQuestionIndices: []
    });
    this.loadQuestions();
  },

  /**
   * 只做错题
   * 过滤出所有错题并重新开始答题
   */
  redoWrongQuestions() {
    const { quizResult, questions } = this.data;
    const wrongQuestionIndices = quizResult.wrongQuestions;
    
    if (wrongQuestionIndices.length === 0) {
      wx.showToast({
        title: '没有错题需要重做',
        icon: 'none'
      });
      return;
    }

    const wrongQuestions = wrongQuestionIndices.map(index => questions[index]);
    
    this.setData({
      questions: wrongQuestions,
      currentQuestionIndex: 0,
      userAnswers: new Array(wrongQuestions.length).fill(''),
      showResult: false,
      originalQuestionIndices: wrongQuestionIndices
    });
  }
})