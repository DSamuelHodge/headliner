'use client';

import React, { useState } from 'react';
import { ChevronRight, Copy, Check, ExternalLink } from 'lucide-react';

interface RelatedLink {
  title: string;
  url: string;
}

interface Metadata {
  dateUpdated: string;
  source: string;
  confidence: string;
  category: string;
  relatedLinks: RelatedLink[];
}

interface BreakdownItemProps {
  point: string;
  index: number;
  additionalInfo?: string;
  metadata?: Metadata;
}

export function BreakdownItem({ 
  point, 
  index, 
  additionalInfo = "More detailed information about this point goes here...",
  metadata = {
    dateUpdated: new Date().toLocaleDateString(),
    source: "Internal Analysis",
    confidence: "High",
    category: "Infrastructure",
    relatedLinks: [
      { title: "Related Article 1", url: "#" },
      { title: "Industry Report", url: "#" }
    ]
  }
}: BreakdownItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [activeTab, setActiveTab] = useState('details');

  const copyToClipboard = (e: React.MouseEvent, text: string) => {
    e.stopPropagation();
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
      <div 
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-start gap-3 p-4 hover:bg-gray-50 dark:hover:bg-gray-800 group transition-colors cursor-pointer"
      >
        <ChevronRight 
          className={`w-5 h-5 text-purple-600 dark:text-purple-400 mt-0.5 flex-shrink-0 transition-transform duration-200 ${
            isExpanded ? 'rotate-90' : ''
          }`} 
        />
        <span className="text-gray-600 dark:text-gray-300 leading-relaxed flex-grow">{point}</span>
        <button 
          onClick={(e) => copyToClipboard(e, point)}
          className="opacity-0 group-hover:opacity-100 transition-opacity"
          title="Copy to clipboard"
        >
          {isCopied ? 
            <Check className="w-4 h-4 text-green-600 dark:text-green-400" /> : 
            <Copy className="w-4 h-4 text-gray-400 dark:text-gray-500 hover:text-purple-600 dark:hover:text-purple-400" />
          }
        </button>
      </div>
      
      {isExpanded && (
        <div className="border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-4 animate-[slideDown_300ms_ease-out]">
          <div className="pl-8">
            {/* Tab Navigation */}
            <div className="flex gap-4 mb-4 border-b border-gray-200 dark:border-gray-700">
              {['details', 'metadata', 'links'].map((tab) => (
                <button 
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-2 text-sm font-medium transition-colors duration-200 ${
                    activeTab === tab 
                      ? 'text-purple-600 dark:text-purple-400 border-b-2 border-purple-600 dark:border-purple-400' 
                      : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="animate-[fadeIn_200ms_ease-out]">
              {activeTab === 'details' && (
                <div>
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4">
                    {additionalInfo}
                  </p>
                  <div className="flex gap-2">
                    <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300">
                      {metadata.category}
                    </span>
                    <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300">
                      {metadata.confidence} Confidence
                    </span>
                  </div>
                </div>
              )}

              {activeTab === 'metadata' && (
                <div className="space-y-2 text-sm">
                  {Object.entries(metadata).slice(0, 4).map(([key, value]) => (
                    <div key={key} className="flex justify-between items-center py-1 border-b border-gray-200 dark:border-gray-700">
                      <span className="text-gray-500 dark:text-gray-400">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                      <span className="text-gray-700 dark:text-gray-300">{typeof value === 'string' ? value : '...'}</span>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'links' && (
                <div className="space-y-2">
                  {metadata.relatedLinks.map((link, i) => (
                    <a 
                      key={i}
                      href={link.url}
                      className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-sm text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors group"
                    >
                      <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                      {link.title}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
