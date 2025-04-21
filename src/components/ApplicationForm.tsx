
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Edit, Check, AlertTriangle } from 'lucide-react';

interface ApplicationFormProps {
  extractedInfo?: Record<string, any>;
}

interface FormSection {
  id: string;
  title: string;
  status: 'verified' | 'partial' | 'pending';
  fields: Array<{
    id: string;
    label: string;
    value: string | number;
    source?: string;
    status: 'auto-filled' | 'pending' | 'edited';
  }>;
}

const ApplicationForm: React.FC<ApplicationFormProps> = ({ extractedInfo }) => {
  if (!extractedInfo || Object.keys(extractedInfo).length === 0) {
    return null;
  }

  const [formSections, setFormSections] = useState<FormSection[]>([
    {
      id: 'personal',
      title: '个人信息',
      status: 'verified',
      fields: [
        {
          id: 'name',
          label: '姓名',
          value: '张同学',
          source: '简历',
          status: 'auto-filled'
        },
        {
          id: 'contact',
          label: '联系方式',
          value: extractedInfo.resume?.education || '正在提取中...',
          status: extractedInfo.resume?.education ? 'auto-filled' : 'pending'
        },
        {
          id: 'education',
          label: '学校',
          value: extractedInfo.resume?.education || '未知',
          source: '简历',
          status: extractedInfo.resume?.education ? 'auto-filled' : 'pending'
        },
        {
          id: 'major',
          label: '专业',
          value: extractedInfo.resume?.major || '未知',
          source: '简历',
          status: extractedInfo.resume?.major ? 'auto-filled' : 'pending'
        }
      ]
    },
    {
      id: 'academic',
      title: '学术背景',
      status: 'partial',
      fields: [
        {
          id: 'gpa',
          label: 'GPA',
          value: extractedInfo.transcript?.gpa || '未知',
          source: '成绩单',
          status: extractedInfo.transcript?.gpa ? 'auto-filled' : 'pending'
        },
        {
          id: 'courses',
          label: '主要课程',
          value: extractedInfo.transcript?.courses?.join('、') || '未知',
          source: '成绩单',
          status: extractedInfo.transcript?.courses ? 'auto-filled' : 'pending'
        }
      ]
    },
    {
      id: 'language',
      title: '语言能力',
      status: extractedInfo.languageTest ? 'verified' : 'pending',
      fields: [
        {
          id: 'test-type',
          label: '考试类型',
          value: extractedInfo.languageTest?.type || '未知',
          source: '语言成绩单',
          status: extractedInfo.languageTest?.type ? 'auto-filled' : 'pending'
        },
        {
          id: 'score',
          label: '分数',
          value: extractedInfo.languageTest?.score || '未知',
          source: '语言成绩单',
          status: extractedInfo.languageTest?.score ? 'auto-filled' : 'pending'
        }
      ]
    },
    {
      id: 'documents',
      title: '申请材料',
      status: 'partial',
      fields: [
        {
          id: 'ps-wordcount',
          label: '个人陈述字数',
          value: extractedInfo.personalStatement?.wordCount || '未知',
          source: '个人陈述',
          status: extractedInfo.personalStatement?.wordCount ? 'auto-filled' : 'pending'
        },
        {
          id: 'ps-topics',
          label: '个人陈述主题',
          value: extractedInfo.personalStatement?.topics?.join('、') || '未知',
          source: '个人陈述',
          status: extractedInfo.personalStatement?.topics ? 'auto-filled' : 'pending'
        },
        {
          id: 'recommendation',
          label: '推荐信',
          value: extractedInfo.recommendation?.recommender || '未知',
          source: '推荐信',
          status: extractedInfo.recommendation?.recommender ? 'auto-filled' : 'pending'
        }
      ]
    }
  ]);

  const handleEdit = (sectionId: string, fieldId: string) => {
    // In a real app, we would show a modal here
    console.log(`Editing field ${fieldId} in section ${sectionId}`);
  };

  return (
    <div className="space-y-6">
      {formSections.map(section => (
        <Card key={section.id} className="p-6 bg-white shadow-sm border border-gray-100 rounded-xl overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-800">{section.title}</h3>
            
            {section.status === 'verified' && (
              <span className="flex items-center px-2 py-1 bg-green-50 text-green-700 text-xs rounded-full">
                <Check className="w-3 h-3 mr-1" /> 已核验
              </span>
            )}
            
            {section.status === 'partial' && (
              <span className="flex items-center px-2 py-1 bg-yellow-50 text-yellow-700 text-xs rounded-full">
                <AlertTriangle className="w-3 h-3 mr-1" /> 部分待确认
              </span>
            )}
            
            {section.status === 'pending' && (
              <span className="flex items-center px-2 py-1 bg-gray-50 text-gray-500 text-xs rounded-full">
                待解析
              </span>
            )}
          </div>
          
          <table className="w-full">
            <tbody>
              {section.fields.map(field => (
                <tr 
                  key={field.id} 
                  className={`
                    border-b border-gray-100 last:border-b-0
                    ${field.status === 'auto-filled' ? 'bg-blue-50/30' : ''}
                    ${field.status === 'pending' ? 'bg-gray-50' : ''}
                    ${field.status === 'edited' ? 'bg-green-50/30' : ''}
                  `}
                >
                  <td className="py-3 px-2 font-medium text-gray-700 w-1/4">
                    {field.label}
                  </td>
                  <td className="py-3 px-2 relative">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className={`
                          ${field.status === 'pending' ? 'text-gray-400 italic' : 'text-gray-800'}
                          ${field.status === 'auto-filled' ? 'font-medium' : ''}
                        `}>
                          {field.value}
                        </span>
                        
                        {field.source && field.status === 'auto-filled' && (
                          <span className="ml-2 text-xs text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded">
                            来自：{field.source}
                          </span>
                        )}
                      </div>
                      
                      {field.status !== 'pending' && (
                        <button 
                          className="text-gray-400 hover:text-blue-600 transition-colors"
                          onClick={() => handleEdit(section.id, field.id)}
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                    
                    {field.status === 'auto-filled' && (
                      <div 
                        className="absolute bottom-0 left-0 h-0.5 w-full bg-blue-200 opacity-50"
                      ></div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      ))}
      
      <div className="mt-4 pt-2">
        <p className="text-sm text-gray-500 italic">* 以上信息通过AI自动提取，请核对后再提交</p>
      </div>
    </div>
  );
};

export default ApplicationForm;
