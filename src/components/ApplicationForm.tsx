
import React from 'react';
import { Card } from '@/components/ui/card';

interface ApplicationFormProps {
  extractedInfo?: Record<string, any>;
}

const ApplicationForm: React.FC<ApplicationFormProps> = ({ extractedInfo }) => {
  if (!extractedInfo || Object.keys(extractedInfo).length === 0) {
    return null;
  }

  return (
    <Card className="p-6 bg-white shadow-sm border border-purple-100 rounded-xl">
      <h3 className="text-lg font-medium text-gray-800 mb-4">申请表信息</h3>
      
      <div className="space-y-4">
        {extractedInfo.personalStatement && (
          <div className="border-b pb-3">
            <h4 className="font-medium text-purple-700">个人陈述</h4>
            <p className="text-sm text-gray-600">字数：{extractedInfo.personalStatement.wordCount}</p>
            <p className="text-sm text-gray-600">
              主题：{extractedInfo.personalStatement.topics.join('、')}
            </p>
          </div>
        )}
        
        {extractedInfo.transcript && (
          <div className="border-b pb-3">
            <h4 className="font-medium text-purple-700">成绩单</h4>
            <p className="text-sm text-gray-600">GPA：{extractedInfo.transcript.gpa}/4.0</p>
            <p className="text-sm text-gray-600">
              课程：{extractedInfo.transcript.courses.join('、')}
            </p>
          </div>
        )}
        
        {extractedInfo.recommendation && (
          <div className="border-b pb-3">
            <h4 className="font-medium text-purple-700">推荐信</h4>
            <p className="text-sm text-gray-600">推荐人：{extractedInfo.recommendation.recommender}</p>
            <p className="text-sm text-gray-600">推荐强度：{extractedInfo.recommendation.strength}</p>
          </div>
        )}
        
        {extractedInfo.languageTest && (
          <div className="border-b pb-3">
            <h4 className="font-medium text-purple-700">语言成绩</h4>
            <p className="text-sm text-gray-600">考试类型：{extractedInfo.languageTest.type}</p>
            <p className="text-sm text-gray-600">分数：{extractedInfo.languageTest.score}</p>
          </div>
        )}
        
        {extractedInfo.resume && (
          <div className="border-b pb-3">
            <h4 className="font-medium text-purple-700">简历</h4>
            <p className="text-sm text-gray-600">教育背景：{extractedInfo.resume.education}</p>
            <p className="text-sm text-gray-600">专业：{extractedInfo.resume.major}</p>
            <p className="text-sm text-gray-600">工作/实习经历：{extractedInfo.resume.experiences}段</p>
          </div>
        )}
      </div>
      
      <div className="mt-4 pt-2 border-t">
        <p className="text-sm text-gray-500 italic">* 以上信息通过AI自动提取，可能需要进一步核实</p>
      </div>
    </Card>
  );
};

export default ApplicationForm;
