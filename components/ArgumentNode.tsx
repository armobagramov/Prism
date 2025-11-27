import React, { useState } from 'react';
import { Argument, ArgumentType } from '../types';
import { ChevronUp, ChevronDown, CheckCircle, MessageSquare, AlertCircle, ExternalLink, FileText } from 'lucide-react';

interface ArgumentNodeProps {
  argument: Argument;
  depth?: number;
}

export const ArgumentNode: React.FC<ArgumentNodeProps> = ({ argument, depth = 0 }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [voteCount, setVoteCount] = useState(argument.votes);

  const getBorderColor = (type: ArgumentType) => {
    switch (type) {
      case ArgumentType.PRO: return 'border-prism-pro';
      case ArgumentType.CON: return 'border-prism-con';
      case ArgumentType.NUANCE: return 'border-prism-nuance';
      default: return 'border-slate-600';
    }
  };

  const getBadgeColor = (type: ArgumentType) => {
    switch (type) {
        case ArgumentType.PRO: return 'bg-prism-pro/20 text-prism-pro';
        case ArgumentType.CON: return 'bg-prism-con/20 text-prism-con';
        case ArgumentType.NUANCE: return 'bg-prism-nuance/20 text-prism-nuance';
        default: return 'bg-slate-700 text-slate-300';
    }
  }

  return (
    <div className={`flex flex-col mb-4 ${depth > 0 ? 'ml-6 pl-4 border-l-2 border-slate-700/50' : ''}`}>
      <div 
        className={`p-4 rounded-lg bg-slate-800/50 border-l-4 ${getBorderColor(argument.type)} hover:bg-slate-800 transition-colors`}
      >
        <div className="flex items-start justify-between mb-2">
            <div className="flex items-center gap-2">
                {argument.author.avatarUrl && (
                    <img src={argument.author.avatarUrl} alt={argument.author.name} className="w-6 h-6 rounded-full" />
                )}
                <div className="flex flex-col">
                    <div className="flex items-center gap-1.5">
                        <span className="text-sm font-medium text-slate-200">{argument.author.name}</span>
                        {argument.author.isExpert && (
                            <span className="flex items-center gap-1 text-[10px] uppercase font-bold tracking-wider bg-indigo-500/20 text-indigo-300 px-1.5 py-0.5 rounded border border-indigo-500/30">
                                <CheckCircle className="w-3 h-3" /> Expert
                            </span>
                        )}
                    </div>
                </div>
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ml-auto ${getBadgeColor(argument.type)}`}>
                    {argument.type}
                </span>
            </div>
            <span className="text-xs text-slate-500 ml-2 whitespace-nowrap">{argument.timestamp}</span>
        </div>

        <p className="text-slate-300 text-sm leading-relaxed mb-4">
            {argument.content}
        </p>

        {/* Sources & Interactive Footer */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-slate-700/50">
            <div className="flex flex-1">
                {argument.sources.length > 0 ? (
                    <a 
                        href={argument.sources[0].url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="group flex items-center gap-2 px-3 py-1.5 rounded-md bg-sky-950/30 hover:bg-sky-900/40 border border-sky-500/20 hover:border-sky-500/40 transition-all w-full sm:w-auto"
                    >
                        <FileText className="w-3.5 h-3.5 text-sky-400 group-hover:text-sky-300" />
                        <span className="text-xs font-medium text-sky-400 group-hover:text-sky-300 truncate max-w-[200px]">
                            {argument.sources[0].title}
                        </span>
                        <ExternalLink className="w-3 h-3 text-sky-500/50 group-hover:text-sky-400 ml-auto sm:ml-1" />
                    </a>
                ) : (
                    <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-amber-900/20 border border-amber-500/20 text-amber-500/80 cursor-help" title="This claim is currently unsourced.">
                        <AlertCircle className="w-3.5 h-3.5" /> 
                        <span className="text-xs font-medium">Citation Needed</span>
                    </div>
                )}
            </div>

            <div className="flex items-center justify-between sm:justify-end gap-4 text-slate-400 w-full sm:w-auto">
                <div className="flex items-center gap-1 bg-slate-900/50 px-2 py-1 rounded border border-slate-700/50">
                    <button onClick={() => setVoteCount(prev => prev + 1)} className="hover:text-emerald-400 p-0.5">
                        <ChevronUp className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-xs font-mono font-medium min-w-[20px] text-center">{voteCount}</span>
                    <button onClick={() => setVoteCount(prev => prev - 1)} className="hover:text-rose-400 p-0.5">
                        <ChevronDown className="w-3.5 h-3.5" />
                    </button>
                </div>
                {argument.children.length > 0 && (
                    <button 
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="flex items-center gap-1.5 text-xs hover:text-white transition-colors px-2 py-1 rounded hover:bg-slate-700/50"
                    >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>{argument.children.length} {argument.children.length === 1 ? 'Reply' : 'Replies'}</span>
                    </button>
                )}
            </div>
        </div>
      </div>

      {/* Recursive Rendering */}
      {isExpanded && argument.children.length > 0 && (
        <div className="mt-2">
            {argument.children.map(child => (
                <ArgumentNode key={child.id} argument={child} depth={depth + 1} />
            ))}
        </div>
      )}
    </div>
  );
};