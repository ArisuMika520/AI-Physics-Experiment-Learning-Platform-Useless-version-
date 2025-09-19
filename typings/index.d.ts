/// <reference path="./types/index.d.ts" />

interface IAppOption {
  globalData: {
    userInfo?: WechatMiniprogram.UserInfo,
  }
  userInfoReadyCallback?: WechatMiniprogram.GetUserInfoSuccessCallback,
}

declare namespace QuizAPI {
  interface Question {
    id: number;
    type: 'single' | 'multiple' | 'judgment';
    question: string;
    options?: string[];
    answer: string;
    explanation: string;
    difficulty?: 'easy' | 'medium' | 'hard';
    category?: string;
  }

  interface SubmitResultRequest {
    userId: string;
    experimentId: string;
    score: number;
    total: number;
    wrongQuestions: number[];
    answers: Array<{
      questionId: number;
      userAnswer: string;
      isCorrect: boolean;
    }>;
    timeSpent: number;
  }

  interface SubmitResultResponse {
    success: boolean;
    report: AnalysisReport;
    wrongQuestions: number[];
  }

  interface AnalysisReport {
    score: number;
    total: number;
    accuracy: number;
    weakAreas: string[];
    detailedAnalysis: string;
    suggestions: string[];
    operationErrors?: string[];
  }

  interface GetQuestionsRequest {
    experimentId: string;
    count?: number;
    difficulty?: string;
    category?: string;
  }
}