
// This service handles file analysis with a language model
import JSZip from 'jszip';

export interface AnalysisProgressUpdate {
  progress: number;
  message?: string;
}

export interface AnalysisResult {
  summary: string;
  documentTypes: DocumentType[];
  extractedInfo?: Record<string, any>;
}

export interface DocumentType {
  name: string;
  type: string;
  size: number;
}

// Main function to analyze files (single file or zip archive)
export const analyzeFile = async (file: File): Promise<AnalysisResult> => {
  // Handle ZIP files - extract and analyze contents
  if (file.type === 'application/zip' || file.name.endsWith('.zip')) {
    return await handleZipFile(file);
  }
  
  // Handle individual files
  return await analyzeSingleFile(file);
};

// Extract and analyze ZIP file contents
async function handleZipFile(file: File): Promise<AnalysisResult> {
  try {
    const zip = new JSZip();
    const contents = await zip.loadAsync(file);
    const extractedFiles: DocumentType[] = [];
    const filePromises: Promise<void>[] = [];

    // Process each file in the ZIP archive
    contents.forEach((path, zipEntry) => {
      if (!zipEntry.dir) {
        const promise = zipEntry.async('blob').then(blob => {
          const extractedFile = new File([blob], zipEntry.name, { type: guessFileType(zipEntry.name) });
          const docType = categorizeDocument(extractedFile);
          extractedFiles.push({
            name: extractedFile.name,
            type: docType,
            size: extractedFile.size,
          });
        });
        filePromises.push(promise);
      }
    });

    // Wait for all file extraction to complete
    await Promise.all(filePromises);
    
    return {
      summary: `解析完成，从压缩包中提取了 ${extractedFiles.length} 个文件`,
      documentTypes: extractedFiles,
      extractedInfo: simulateExtractedInfo(extractedFiles)
    };
  } catch (error) {
    console.error('Error extracting ZIP file:', error);
    return {
      summary: '压缩包解析失败，请检查文件格式是否正确',
      documentTypes: []
    };
  }
}

// Analyze a single file
async function analyzeSingleFile(file: File): Promise<AnalysisResult> {
  // Simulate analysis time based on file size
  const analysisTime = Math.min(Math.max(file.size / 1024, 3), 10) * 1000;
  
  return new Promise((resolve) => {
    setTimeout(() => {
      const docType = categorizeDocument(file);
      const documentType = {
        name: file.name, 
        type: docType,
        size: file.size
      };
      
      resolve({
        summary: `文件分析完成：${docType}`,
        documentTypes: [documentType],
        extractedInfo: simulateExtractedInfo([documentType])
      });
    }, analysisTime);
  });
}

// Categorize document based on file name and type
function categorizeDocument(file: File): string {
  const fileName = file.name.toLowerCase();
  
  if (fileName.includes('ps') || 
      fileName.includes('personal') || 
      fileName.includes('statement') || 
      fileName.includes('个人陈述')) {
    return '个人陈述';
  } else if (fileName.includes('在读') || 
             fileName.includes('证明') || 
             fileName.includes('学位') || 
             fileName.includes('毕业') || 
             fileName.includes('certificate') || 
             fileName.includes('degree')) {
    return '在读证明/学位证书';
  } else if (fileName.includes('成绩') || 
             fileName.includes('transcript') || 
             fileName.includes('score')) {
    return '成绩单';
  } else if (fileName.includes('推荐') || 
             fileName.includes('recommend') || 
             fileName.includes('reference')) {
    return '推荐信';
  } else if (fileName.includes('ielts') || 
             fileName.includes('toefl') || 
             fileName.includes('英语') || 
             fileName.includes('语言') || 
             fileName.includes('english')) {
    return '英语水平证书';
  } else if (fileName.includes('passport') || 
             fileName.includes('护照')) {
    return '护照';
  } else if (fileName.includes('resume') || 
             fileName.includes('cv') || 
             fileName.includes('简历')) {
    return '简历';
  } else if (file.type.includes('pdf')) {
    return '未分类PDF文档';
  } else if (file.type.includes('word') || file.type.includes('doc')) {
    return '未分类文档';
  } else {
    return '其他文件';
  }
}

// Simulate extracted info based on document types
function simulateExtractedInfo(documents: DocumentType[]): Record<string, any> {
  const info: Record<string, any> = {};
  
  documents.forEach(doc => {
    switch (doc.type) {
      case '个人陈述':
        info.personalStatement = {
          wordCount: Math.round(1000 + Math.random() * 500),
          topics: ['学术背景', '研究经历', '职业规划']
        };
        break;
      case '成绩单':
        info.transcript = {
          gpa: (3.0 + Math.random()).toFixed(2),
          courses: ['高等数学', '线性代数', '计算机科学导论']
        };
        break;
      case '推荐信':
        info.recommendation = {
          recommender: '张教授（计算机系）',
          strength: '强烈推荐'
        };
        break;
      case '英语水平证书':
        info.languageTest = {
          type: Math.random() > 0.5 ? 'IELTS' : 'TOEFL',
          score: Math.random() > 0.5 ? (5.5 + Math.random() * 3.0).toFixed(1) : Math.round(80 + Math.random() * 30)
        };
        break;
      case '简历':
        info.resume = {
          education: '浙江大学',
          major: '计算机科学',
          experiences: Math.round(1 + Math.random() * 4)
        };
        break;
    }
  });
  
  return info;
}

// Guess file type based on extension
function guessFileType(filename: string): string {
  const ext = filename.split('.').pop()?.toLowerCase();
  switch (ext) {
    case 'pdf': return 'application/pdf';
    case 'doc': return 'application/msword';
    case 'docx': return 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
    case 'txt': return 'text/plain';
    case 'jpg': case 'jpeg': return 'image/jpeg';
    case 'png': return 'image/png';
    default: return 'application/octet-stream';
  }
}

// Generate progress updates throughout the analysis process
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
      message = "分类文档并整理信息...";
    } else {
      message = "生成申请表与分析报告...";
    }
    
    callback({ progress, message });
    
    if (progress >= 99) {
      clearInterval(interval);
    }
  };
  
  interval = setInterval(updateProgress, 300);
  
  return () => clearInterval(interval);
};

// Get the wave animation value for progress visualization
export const getWaveAnimation = (progress: number): string => {
  return `M0,50 C30,${60 + Math.sin(Date.now() / 1000) * 10},
          70,${40 + Math.cos(Date.now() / 800) * 10},
          100,50 V100 H0 Z`;
};

// Function to generate visual verification info for documents
export const getVerificationStatus = (docType: string): 'verified' | 'partial' | 'pending' => {
  switch (docType) {
    case '个人陈述':
    case '推荐信':
      return 'verified';
    case '成绩单':
    case '英语水平证书':
      return 'partial';
    default:
      return 'pending';
  }
};
