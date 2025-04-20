
// This service simulates file analysis with a language model
// In a real implementation, this would call an actual API

export interface AnalysisProgressUpdate {
  progress: number;
  message?: string;
}

export const analyzeFile = (file: File): Promise<string> => {
  return new Promise((resolve) => {
    // Simulating analysis time based on file size
    const analysisTime = Math.min(Math.max(file.size / 1024, 3), 10) * 1000;
    
    setTimeout(() => {
      let result = '';
      
      if (file.name.toLowerCase().includes('成绩')) {
        result = "检测到成绩单：\n• GPA: 3.8/4.0\n• 核心课程成绩：优秀\n• 专业排名：前10%\n\n建议重点突出学术成就和研究经历。";
      } else if (file.name.toLowerCase().includes('推荐')) {
        result = "检测到推荐信：\n• 推荐人：张教授（计算机系）\n• 推荐强度：强烈推荐\n• 突出优势：科研能力、团队协作\n\n推荐信质量较高，可作为申请材料重点。";
      } else if (file.type.includes('pdf')) {
        result = "PDF文档分析：\n• 文档类型：个人陈述\n• 字数统计：约1200字\n• 内容覆盖：学术背景、研究经历、职业规划\n\n建议增加具体研究项目的详细描述和未来研究方向。";
      } else {
        result = "文件分析结果：\n• 文档格式符合要求\n• 内容完整度：90%\n• 重点内容已提取\n\n该文档适合作为申请材料，建议在个人经历部分增加具体细节。";
      }
      
      resolve(result);
    }, analysisTime);
  });
};

export const simulateProgressUpdates = (
  callback: (update: AnalysisProgressUpdate) => void,
  duration: number = 5000
): () => void => {
  let startTime = Date.now();
  let interval: NodeJS.Timeout;
  
  const updateProgress = () => {
    const elapsed = Date.now() - startTime;
    const progress = Math.min(Math.round((elapsed / duration) * 100), 99);
    
    let message;
    if (progress < 20) {
      message = "正在读取文件内容...";
    } else if (progress < 40) {
      message = "提取文档关键信息...";
    } else if (progress < 60) {
      message = "分析文档结构与内容...";
    } else if (progress < 80) {
      message = "评估文档适用性...";
    } else {
      message = "生成分析报告...";
    }
    
    callback({ progress, message });
    
    if (progress >= 99) {
      clearInterval(interval);
    }
  };
  
  interval = setInterval(updateProgress, 300);
  
  return () => clearInterval(interval);
};
