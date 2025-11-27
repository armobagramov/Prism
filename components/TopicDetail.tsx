import React, { useState } from 'react';
import { Topic, ArgumentType, User, Argument } from '../types';
import { ArgumentNode } from './ArgumentNode';
import { generateTopicSummary } from '../services/geminiService';
import { Sparkles, ArrowLeft, Share2, Bookmark, ChevronUp, ChevronDown, Filter, Users, ShieldCheck, ArrowDownUp } from 'lucide-react';
import { AddArgumentModal } from './AddArgumentModal';

interface TopicDetailProps {
  topic: Topic;
  onBack: () => void;
  user: User | null;
  onLoginRequest: () => void;
}

type FilterMode = 'ALL' | 'EXPERTS';
type SortMode = 'TOP' | 'HATED';

export const TopicDetail: React.FC<TopicDetailProps> = ({ topic, onBack, user, onLoginRequest }) => {
  const [summary, setSummary] = useState<string | null>(null);
  const [loadingSummary, setLoadingSummary] = useState(false);
  const [isAiExpanded, setIsAiExpanded] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Filtering & Sorting State
  const [filterMode, setFilterMode] = useState<FilterMode>('EXPERTS');
  const [sortMode, setSortMode] = useState<SortMode>('TOP');

  // Local state to simulate adding items in prototype
  const [localTopic, setLocalTopic] = useState<Topic>(topic);

  const handleGenerateSummary = async () => {
    if (summary) {
        setIsAiExpanded(!isAiExpanded);
        return;
    }
    setLoadingSummary(true);
    const result = await generateTopicSummary(topic);
    setSummary(result);
    setLoadingSummary(false);
  };

  const handleAddArgumentClick = () => {
      if (!user) {
          onLoginRequest();
      } else {
          setIsModalOpen(true);
      }
  };

  const handleArgumentSubmit = (content: string, type: ArgumentType, sourceTitle: string, sourceUrl: string) => {
      if (!user) return;

      const newArg = {
          id: `new-${Date.now()}`,
          author: { id: user.id, name: user.name, isExpert: false, avatarUrl: user.avatarUrl },
          content,
          type,
          sources: [{ title: sourceTitle, url: sourceUrl }],
          votes: 0,
          timestamp: 'Just now',
          children: []
      };

      const updatedTopic = { ...localTopic };
      if (type === ArgumentType.PRO) updatedTopic.arguments.pro.push(newArg);
      if (type === ArgumentType.CON) updatedTopic.arguments.con.push(newArg);
      if (type === ArgumentType.NUANCE) updatedTopic.arguments.nuance.push(newArg);
      
      setLocalTopic(updatedTopic);
  };

  // Filtering Logic
  const processArguments = (args: Argument[]) => {
      let processed = [...args];
      
      // Filter
      if (filterMode === 'EXPERTS') {
          processed = processed.filter(arg => arg.author.isExpert);
      }

      // Sort
      processed.sort((a, b) => {
          if (sortMode === 'TOP') return b.votes - a.votes;
          if (sortMode === 'HATED') return a.votes - b.votes; // Lowest rated first
          return 0;
      });

      return processed;
  };

  const visiblePro = processArguments(localTopic.arguments.pro);
  const visibleCon = processArguments(localTopic.arguments.con);
  const visibleNuance = processArguments(localTopic.arguments.nuance);

  return (
    <div className="min-h-screen bg-transparent flex flex-col">
      <AddArgumentModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        topic={localTopic}
        onSubmit={handleArgumentSubmit}
      />

      {/* Header */}
      <div className="bg-white dark:bg-prism-card border-b border-neutral-200 dark:border-white/5 py-8 px-6 md:px-12 transition-colors duration-300">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-neutral-500 hover:text-neutral-900 dark:hover:text-white mb-6 transition-colors group"
        >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Constellation
        </button>
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
            <div className="max-w-4xl">
                <div className="flex items-center gap-3 mb-3">
                    <span className={`px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider
                        ${localTopic.category === 'Technology' ? 'bg-sky-500/10 text-sky-500' : 
                          localTopic.category === 'Politics' ? 'bg-rose-500/10 text-rose-500' : 'bg-neutral-200 dark:bg-neutral-800 text-neutral-500'}`}>
                        {localTopic.category}
                    </span>
                    <span className="text-xs text-neutral-400">Last updated {localTopic.lastUpdated}</span>
                </div>
                <h1 className="text-3xl md:text-5xl font-bold text-neutral-900 dark:text-white mb-4 leading-tight">{localTopic.title}</h1>
                <p className="text-neutral-600 dark:text-neutral-300 text-lg leading-relaxed">{localTopic.fullDescription}</p>
            </div>
            <div className="flex gap-3">
                <button className="p-2.5 rounded-full bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-500 dark:text-neutral-400 transition-colors">
                    <Share2 className="w-5 h-5" />
                </button>
                <button className="p-2.5 rounded-full bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-500 dark:text-neutral-400 transition-colors">
                    <Bookmark className="w-5 h-5" />
                </button>
            </div>
        </div>

        {/* AI Summary Section */}
        <div className="mt-8">
            {!summary && !loadingSummary ? (
                <button 
                    onClick={handleGenerateSummary}
                    className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full transition-all shadow-lg shadow-indigo-500/20 text-sm font-medium"
                >
                    <Sparkles className="w-4 h-4" />
                    Generate AI Overview
                </button>
            ) : (
                <div className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-500/20 rounded-2xl overflow-hidden transition-all duration-300">
                    <div 
                        className="flex items-center justify-between p-4 cursor-pointer hover:bg-indigo-100/50 dark:hover:bg-indigo-900/20"
                        onClick={() => setIsAiExpanded(!isAiExpanded)}
                    >
                        <div className="flex items-center gap-3">
                            <Sparkles className={`w-5 h-5 text-indigo-500 ${loadingSummary ? 'animate-pulse' : ''}`} />
                            <h3 className="text-sm font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">AI Synthesis</h3>
                        </div>
                        <button className="text-indigo-400">
                            {isAiExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                        </button>
                    </div>
                    
                    {loadingSummary && (
                         <div className="px-12 pb-6 text-sm text-indigo-400 animate-pulse">Analyzing perspectives and synthesizing common ground...</div>
                    )}

                    {summary && isAiExpanded && (
                        <div className="px-6 md:px-12 pb-6 pt-2">
                             <div className="prose prose-sm max-w-none text-indigo-900 dark:text-indigo-100 leading-relaxed">
                                 {summary.split('\n').map((line, i) => (
                                    <p key={i} className="mb-2 last:mb-0">{line}</p>
                                 ))}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
      </div>

      {/* Controls Bar */}
      <div className="sticky top-20 z-40 bg-neutral-50/80 dark:bg-neutral-900/80 backdrop-blur-md border-b border-neutral-200 dark:border-white/5 py-3 px-6 md:px-12 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center bg-white dark:bg-black rounded-lg p-1 border border-neutral-200 dark:border-white/10">
              <button 
                onClick={() => setFilterMode('EXPERTS')}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-sm font-medium transition-all ${filterMode === 'EXPERTS' ? 'bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white shadow-sm' : 'text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-300'}`}
              >
                  <ShieldCheck className="w-4 h-4" /> Experts Only
              </button>
              <button 
                onClick={() => setFilterMode('ALL')}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-sm font-medium transition-all ${filterMode === 'ALL' ? 'bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white shadow-sm' : 'text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-300'}`}
              >
                  <Users className="w-4 h-4" /> All Voices
              </button>
          </div>

          <div className="flex items-center gap-2 text-sm text-neutral-500">
              <ArrowDownUp className="w-4 h-4" />
              <span className="hidden sm:inline">Sort by:</span>
              <select 
                value={sortMode}
                onChange={(e) => setSortMode(e.target.value as SortMode)}
                className="bg-transparent font-medium text-neutral-900 dark:text-white outline-none cursor-pointer"
              >
                  <option value="TOP" className="bg-white dark:bg-neutral-900">Most Liked</option>
                  <option value="HATED" className="bg-white dark:bg-neutral-900">Most Controversial</option>
              </select>
          </div>
      </div>

      {/* Main Content - Columns */}
      <div className="flex-1 p-4 md:p-8 overflow-x-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 min-w-[900px]">
            
            {/* PRO Column */}
            <div className="flex flex-col">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-prism-pro/20">
                    <div className="w-1.5 h-8 bg-prism-pro rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
                    <h2 className="text-xl font-semibold text-neutral-800 dark:text-prism-pro">Supporting</h2>
                    <span className="ml-auto text-xs font-bold text-neutral-500 bg-neutral-100 dark:bg-neutral-800 px-2.5 py-1 rounded-full">{visiblePro.length}</span>
                </div>
                <div className="space-y-6">
                    {visiblePro.length === 0 && (
                        <div className="text-center py-8 text-neutral-500 text-sm border border-dashed border-neutral-700 rounded-lg">
                            No {filterMode === 'EXPERTS' ? 'expert ' : ''}arguments found.
                        </div>
                    )}
                    {visiblePro.map(arg => <ArgumentNode key={arg.id} argument={arg} />)}
                    <button 
                        onClick={handleAddArgumentClick}
                        className="w-full py-4 border-2 border-dashed border-neutral-300 dark:border-neutral-800 rounded-xl text-neutral-400 hover:border-prism-pro hover:text-prism-pro transition-all text-sm font-medium flex items-center justify-center gap-2"
                    >
                        + Add Supporting Point
                    </button>
                </div>
            </div>

            {/* NUANCE Column (Center) */}
            <div className="flex flex-col">
                 <div className="flex items-center gap-3 mb-6 pb-4 border-b border-prism-nuance/20">
                    <div className="w-1.5 h-8 bg-prism-nuance rounded-full shadow-[0_0_10px_rgba(168,85,247,0.5)]"></div>
                    <h2 className="text-xl font-semibold text-neutral-800 dark:text-prism-nuance">Nuance & Synthesis</h2>
                    <span className="ml-auto text-xs font-bold text-neutral-500 bg-neutral-100 dark:bg-neutral-800 px-2.5 py-1 rounded-full">{visibleNuance.length}</span>
                </div>
                 <div className="bg-neutral-50 dark:bg-neutral-900/30 rounded-2xl p-4 h-full border border-neutral-100 dark:border-white/5">
                     <div className="space-y-6">
                        {visibleNuance.length === 0 && (
                            <div className="text-center py-8 text-neutral-500 text-sm border border-dashed border-neutral-700 rounded-lg">
                                No {filterMode === 'EXPERTS' ? 'expert ' : ''}arguments found.
                            </div>
                        )}
                        {visibleNuance.map(arg => <ArgumentNode key={arg.id} argument={arg} />)}
                        <button 
                            onClick={handleAddArgumentClick}
                            className="w-full py-4 border-2 border-dashed border-neutral-300 dark:border-neutral-800 rounded-xl text-neutral-400 hover:border-prism-nuance hover:text-prism-nuance transition-all text-sm font-medium flex items-center justify-center gap-2"
                        >
                            + Add Context
                        </button>
                     </div>
                 </div>
            </div>

            {/* CON Column */}
            <div className="flex flex-col">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-prism-con/20">
                    <div className="w-1.5 h-8 bg-prism-con rounded-full shadow-[0_0_10px_rgba(244,63,94,0.5)]"></div>
                    <h2 className="text-xl font-semibold text-neutral-800 dark:text-prism-con">Opposing</h2>
                    <span className="ml-auto text-xs font-bold text-neutral-500 bg-neutral-100 dark:bg-neutral-800 px-2.5 py-1 rounded-full">{visibleCon.length}</span>
                </div>
                 <div className="space-y-6">
                    {visibleCon.length === 0 && (
                        <div className="text-center py-8 text-neutral-500 text-sm border border-dashed border-neutral-700 rounded-lg">
                            No {filterMode === 'EXPERTS' ? 'expert ' : ''}arguments found.
                        </div>
                    )}
                    {visibleCon.map(arg => <ArgumentNode key={arg.id} argument={arg} />)}
                    <button 
                        onClick={handleAddArgumentClick}
                        className="w-full py-4 border-2 border-dashed border-neutral-300 dark:border-neutral-800 rounded-xl text-neutral-400 hover:border-prism-con hover:text-prism-con transition-all text-sm font-medium flex items-center justify-center gap-2"
                    >
                        + Add Opposing Point
                    </button>
                </div>
            </div>

        </div>
      </div>
    </div>
  );
};