import React, { useState } from 'react';
import { ArgumentType, Topic } from '../types';
import { X, Check } from 'lucide-react';

interface AddArgumentModalProps {
    topic: Topic;
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (content: string, type: ArgumentType, sourceTitle: string, sourceUrl: string) => void;
}

export const AddArgumentModal: React.FC<AddArgumentModalProps> = ({ topic, isOpen, onClose, onSubmit }) => {
    const [type, setType] = useState<ArgumentType>(ArgumentType.PRO);
    const [content, setContent] = useState('');
    const [sourceTitle, setSourceTitle] = useState('');
    const [sourceUrl, setSourceUrl] = useState('');

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(content, type, sourceTitle, sourceUrl);
        // Reset form
        setContent('');
        setSourceTitle('');
        setSourceUrl('');
        onClose();
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
            <div className="relative bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl w-full max-w-lg border border-neutral-200 dark:border-neutral-800 overflow-hidden">
                <div className="p-6 border-b border-neutral-200 dark:border-neutral-800 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-neutral-900 dark:text-white">Contribute to Discourse</h2>
                    <button onClick={onClose} className="p-1 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-500">
                        <X className="w-5 h-5" />
                    </button>
                </div>
                
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Stance</label>
                        <div className="flex gap-2">
                            {[
                                { t: ArgumentType.PRO, label: 'Supporting', color: 'bg-emerald-500', text: 'text-emerald-500' },
                                { t: ArgumentType.CON, label: 'Opposing', color: 'bg-rose-500', text: 'text-rose-500' },
                                { t: ArgumentType.NUANCE, label: 'Nuance', color: 'bg-purple-500', text: 'text-purple-500' },
                            ].map((opt) => (
                                <button
                                    key={opt.t}
                                    type="button"
                                    onClick={() => setType(opt.t)}
                                    className={`flex-1 py-2 px-3 rounded-lg border transition-all text-sm font-medium
                                        ${type === opt.t 
                                            ? `${opt.color} text-white border-transparent` 
                                            : `bg-transparent border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400 hover:border-neutral-400`
                                        }`}
                                >
                                    {opt.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Argument</label>
                        <textarea 
                            required
                            className="w-full h-32 p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 focus:ring-2 focus:ring-prism-accent focus:outline-none text-neutral-900 dark:text-white resize-none"
                            placeholder={`Construct a logical ${type.toLowerCase()} argument...`}
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Source Title</label>
                            <input 
                                type="text"
                                required
                                placeholder="e.g. Nature Journal"
                                className="w-full p-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 focus:ring-2 focus:ring-prism-accent focus:outline-none text-neutral-900 dark:text-white"
                                value={sourceTitle}
                                onChange={(e) => setSourceTitle(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Source URL</label>
                            <input 
                                type="url"
                                required
                                placeholder="https://..."
                                className="w-full p-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 focus:ring-2 focus:ring-prism-accent focus:outline-none text-neutral-900 dark:text-white"
                                value={sourceUrl}
                                onChange={(e) => setSourceUrl(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="pt-2">
                        <button 
                            type="submit"
                            className="w-full py-3 rounded-xl bg-white dark:bg-white text-black font-bold hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                        >
                            <Check className="w-5 h-5" /> Submit Argument
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};