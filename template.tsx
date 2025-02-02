import React, { useState, createContext, useContext } from 'react';
import { ArrowRight, ChevronRight, Copy, Check, Twitter, Linkedin, ExternalLink, Moon, Sun } from 'lucide-react';

// Theme Context
interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  isDark: false,
  toggleTheme: () => {},
});

interface ThemeProviderProps {
  children: React.ReactNode;
}

const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [isDark, setIsDark] = useState(false);
  
  const toggleTheme = () => setIsDark(!isDark);
  
  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      <div className={`${isDark ? 'dark' : ''} min-h-screen transition-colors duration-200`}>
        <div className="bg-white dark:bg-gray-900 min-h-screen transition-colors duration-200">
          {children}
        </div>
      </div>
    </ThemeContext.Provider>
  );
};

const ThemeToggle = () => {
  const { isDark, toggleTheme } = useContext(ThemeContext);
  
  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
      aria-label="Toggle theme"
    >
      {isDark ? (
        <Sun className="w-5 h-5" />
      ) : (
        <Moon className="w-5 h-5" />
      )}
    </button>
  );
};

interface BreakdownItemProps {
  point: string;
  index: number;
  additionalInfo?: string;
  metadata?: {
    dateUpdated: string;
    source: string;
    confidence: string;
    category: string;
    relatedLinks: Array<{
      title: string;
      url: string;
    }>;
  };
}

const BreakdownItem = ({ 
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
}: BreakdownItemProps) => {
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
                  {Object.entries(metadata).map(([key, value]) => (
                    <div key={key} className="flex justify-between items-center py-1 border-b border-gray-200 dark:border-gray-700">
                      <span className="text-gray-500 dark:text-gray-400">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                      <span className="text-gray-700 dark:text-gray-300">
                        {key === 'relatedLinks' 
                          ? (value as Array<{title: string; url: string}>).length + ' links'
                          : String(value)
                        }
                      </span>
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
};

interface NewsBriefTemplateProps {
  number: string;
  title: string;
  brief: string;
  breakdown: string[];
  importance: {
    text: string;
    sources: string[];
  };
  author: {
    name: string;
    image: string;
    role: string;
  };
  publishDate: string;
  publishTime: string;
}

const NewsBriefTemplate = ({ 
  number, 
  title, 
  brief, 
  breakdown,
  importance,
  author,
  publishDate,
  publishTime
}: NewsBriefTemplateProps) => {
  return (
    <div className="max-w-3xl mx-auto bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm transition-colors duration-200">
      {/* Header with Theme Toggle */}
      <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-6">
        <span>{publishDate}</span>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <button className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors flex items-center gap-1">
            <Twitter className="w-4 h-4" />
            Share
          </button>
          <button className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors flex items-center gap-1">
            <Linkedin className="w-4 h-4" />
            Share
          </button>
        </div>
      </div>

      {/* Title Section */}
      <div className="flex items-center justify-between mb-8">
        <span className="text-6xl font-bold text-purple-600 dark:text-purple-400">{number}</span>
        <ArrowRight className="text-purple-600 dark:text-purple-400 w-6 h-6" />
      </div>

      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8 leading-tight">
        {title}
      </h1>

      {/* Brief Section */}
      <div className="mb-12">
        <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-4">Brief:</h2>
        <div className="text-gray-600 dark:text-gray-300 leading-relaxed bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
          {brief}
        </div>
      </div>

      {/* Breakdown Section */}
      <div className="mb-12">
        <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-4">Breakdown:</h2>
        <div className="space-y-3">
          {breakdown.map((point, index) => (
            <BreakdownItem 
              key={index} 
              point={point} 
              index={index}
              additionalInfo={`Additional context and analysis for: ${point}`}
            />
          ))}
        </div>
      </div>

      {/* Why It's Important Section */}
      <div className="mb-12">
        <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
          Why It's Important:
        </h2>
        <div className="bg-purple-50 dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-purple-100 dark:border-gray-700 transition-all hover:shadow-md">
          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="w-1 bg-purple-600 dark:bg-purple-400 h-full rounded-full"></div>
            </div>
            <div>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {importance.text}
              </p>
              {importance.sources && (
                <div className="mt-4 flex gap-2 flex-wrap">
                  {importance.sources.map((source, index) => (
                    <span key={index} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300">
                      {source}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="text-sm text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors cursor-pointer">
            Want to go <span className="font-medium">Beyond</span> the headlines? 
            <br />Subscribe to my <span className="font-medium">FREE</span> newsletter
            <ExternalLink className="w-4 h-4 inline-block ml-1 mb-1" />
          </div>
          <div className="flex items-center gap-4 group cursor-pointer">
            <div className="text-right">
              <span className="text-sm font-medium text-purple-600 dark:text-purple-400">Follow</span>
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{author.name}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{author.role}</p>
            </div>
            <img 
              src={author.image} 
              alt={author.name} 
              className="w-12 h-12 rounded-full ring-2 ring-purple-100 dark:ring-purple-900 group-hover:ring-purple-200 dark:group-hover:ring-purple-800 transition-all"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// Example usage
const ExampleBrief = () => {
  const content = {
    number: "5",
    title: "AI Investment Plan Reaches New Heights",
    brief: "Major tech company revealed a $60-65B investment plan for 2025, focused on AI infrastructure development and model advancement.",
    breakdown: [
      "Planning to deploy 1GW of compute power in 2025, with new datacenter construction",
      "Aiming to acquire over 1.3M GPUs by year-end",
      "Investment represents ~70% increase from previous year",
      "Follows industry trend of massive AI infrastructure investments"
    ],
    importance: {
      text: "The AI infrastructure race continues to accelerate as major players invest heavily in computing resources, highlighting the critical role of scale in AI development.",
      sources: []
    },
    author: {
      name: "Lewis Walker",
      image: "/api/placeholder/48/48",
      role: "AI Industry Analyst"
    },
    publishDate: "February 1, 2025",
    publishTime: ""
  };

  return (
    <ThemeProvider>
      <NewsBriefTemplate {...content} />
    </ThemeProvider>
  );
};

export default ExampleBrief;