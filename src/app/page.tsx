'use client';

import { ExternalLink, Twitter, Linkedin, Share2 } from 'lucide-react';
import { BreakdownItem } from "@/components/breakdown-item";

export default function Home() {
  const article = {
    number: "1",
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
      sources: ["Industry Report", "Company Announcement", "Market Analysis"]
    },
    author: {
      name: "Derrick Hodge",
      image: "/api/placeholder/48/48",
      role: "AI Industry Analyst"
    },
    publishDate: "February 1, 2025",
    publishTime: "6:14 PM EST"
  };

  const handleShare = (platform: 'twitter' | 'linkedin') => {
    const text = encodeURIComponent(`${article.title}\n\nRead more:`);
    const url = encodeURIComponent(window.location.href);
    
    const shareUrls = {
      twitter: `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`
    };
    
    window.open(shareUrls[platform], '_blank');
  };

  const breakdownItems = article.breakdown.map((point, index) => ({
    point,
    additionalInfo: `Additional context and analysis for: ${point}`,
    metadata: {
      dateUpdated: article.publishDate,
      source: article.importance.sources[Math.min(index, article.importance.sources.length - 1)],
      confidence: "High",
      category: "AI Infrastructure",
      relatedLinks: [
        { title: "Full Report", url: "#" },
        { title: "Industry Analysis", url: "#" }
      ]
    }
  }));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8 relative">
          Latest Tech Insights
        </h1>
        
        <article className="space-y-8 relative">
          {/* Header Section */}
          <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-6 backdrop-blur-sm bg-white/50 dark:bg-gray-900/50 p-4 rounded-lg">
            <div className="flex flex-col">
              <span>{article.publishDate}</span>
              <span>{article.publishTime}</span>
            </div>
            <div className="flex items-center gap-4">
              <button 
                onClick={() => handleShare('twitter')}
                className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors flex items-center gap-1"
                aria-label="Share on X (Twitter)"
              >
                <Twitter className="w-4 h-4" />
                Share
              </button>
              <button 
                onClick={() => handleShare('linkedin')}
                className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors flex items-center gap-1"
                aria-label="Share on LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
                Share
              </button>
              <button 
                onClick={() => navigator.clipboard.writeText(window.location.href)}
                className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors flex items-center gap-1"
                aria-label="Copy link"
              >
                <Share2 className="w-4 h-4" />
                Share
              </button>
            </div>
          </div>

          {/* Title Section */}
          <div className="backdrop-blur-sm bg-white/50 dark:bg-gray-900/50 p-6 rounded-lg mb-8">
            <div className="flex items-start gap-6">
              <span className="text-5xl font-bold text-purple-600 dark:text-purple-400 leading-tight">{article.number}</span>
              <div className="flex-1">
                <h2 className="text-4xl font-bold text-gray-900 dark:text-white leading-tight">
                  {article.title}
                </h2>
              </div>
            </div>
          </div>

          {/* Brief Section */}
          <div className="mb-8">
            <div className="text-gray-600 dark:text-gray-300 leading-relaxed backdrop-blur-sm bg-white/50 dark:bg-gray-900/50 p-6 rounded-lg">
              <div className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-4">Brief</div>
              {article.brief}
            </div>
          </div>

          {/* Breakdown Section */}
          <div className="space-y-4 mb-12">
            {breakdownItems.map((item, index) => (
              <BreakdownItem 
                key={index}
                point={item.point}
                additionalInfo={item.additionalInfo}
                metadata={item.metadata}
              />
            ))}
          </div>

          {/* Why It's Important Section */}
          <div className="mb-12">
            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
              Why It&apos;s Important
            </h3>
            <div className="backdrop-blur-sm bg-white/50 dark:bg-gray-900/50 rounded-lg p-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-1 bg-gradient-to-b from-purple-600 to-purple-400 dark:from-purple-500 dark:to-purple-300 h-full rounded-full"></div>
                </div>
                
                <div className="space-y-4">
                  <p className="text-gray-600 dark:text-gray-300">
                    {article.importance.text}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Newsletter CTA */}
          <div className="relative overflow-hidden rounded-lg bg-gradient-to-br from-purple-600 to-purple-400 dark:from-purple-500 dark:to-purple-300 p-6 sm:p-8 text-white mt-12">
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-4">Want to go beyond headlines?</h3>
              <p className="text-purple-50 mb-6">Subscribe to my Free newsletter.</p>
              <form className="flex flex-col sm:flex-row gap-3" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full sm:w-2/3 rounded-lg px-4 py-2 text-gray-900 placeholder-gray-500 bg-white/90 backdrop-blur-sm border-0 focus:ring-2 focus:ring-purple-300 focus:outline-none"
                />
                <button 
                  type="submit"
                  className="w-full sm:w-1/3 rounded-lg bg-purple-900 hover:bg-purple-800 text-white font-semibold transition-colors py-2">
                  Subscribe
                </button>
              </form>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none"></div>
          </div>

          {/* Author Info */}
          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
                  <span className="text-sm font-semibold text-purple-600 dark:text-purple-400">DH</span>
                </div>
                <div>
                  <div className="font-semibold text-gray-900 dark:text-white">Derrick Hodge</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">AI Industry Analyst</div>
                </div>
              </div>
              <button 
                type="button"
                className="text-sm text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300">
                Follow
              </button>
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
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
