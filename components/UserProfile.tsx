import React from 'react';
import { User } from '../types';
import { ArrowLeft, Award, Calendar, MessageSquare } from 'lucide-react';

interface UserProfileProps {
    user: User;
    onBack: () => void;
}

export const UserProfile: React.FC<UserProfileProps> = ({ user, onBack }) => {
    return (
        <div className="min-h-screen bg-transparent flex flex-col items-center pt-20 px-4">
            <div className="max-w-2xl w-full bg-white dark:bg-prism-card border border-neutral-200 dark:border-white/10 rounded-3xl p-8 shadow-2xl">
                <button onClick={onBack} className="flex items-center gap-2 text-neutral-500 hover:text-neutral-900 dark:hover:text-white mb-6 transition-colors">
                    <ArrowLeft className="w-4 h-4" /> Back
                </button>

                <div className="flex flex-col items-center text-center">
                    <div className="w-24 h-24 rounded-full p-1 bg-gradient-to-tr from-prism-accent to-prism-nuance mb-4">
                        <img src={user.avatarUrl} alt={user.name} className="w-full h-full rounded-full border-4 border-white dark:border-neutral-900" />
                    </div>
                    <h1 className="text-2xl font-bold text-neutral-900 dark:text-white mb-1">{user.name}</h1>
                    <p className="text-neutral-500 mb-6">{user.bio}</p>

                    <div className="grid grid-cols-3 gap-4 w-full mb-8">
                        <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-800/50 flex flex-col items-center">
                            <Award className="w-6 h-6 text-yellow-500 mb-2" />
                            <span className="text-xl font-bold text-neutral-900 dark:text-white">{user.reputationScore}</span>
                            <span className="text-xs text-neutral-500 uppercase tracking-wide">Reputation</span>
                        </div>
                        <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-800/50 flex flex-col items-center">
                            <MessageSquare className="w-6 h-6 text-prism-accent mb-2" />
                            <span className="text-xl font-bold text-neutral-900 dark:text-white">14</span>
                            <span className="text-xs text-neutral-500 uppercase tracking-wide">Arguments</span>
                        </div>
                        <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-800/50 flex flex-col items-center">
                            <Calendar className="w-6 h-6 text-prism-nuance mb-2" />
                            <span className="text-xl font-bold text-neutral-900 dark:text-white">{user.joinedDate}</span>
                            <span className="text-xs text-neutral-500 uppercase tracking-wide">Joined</span>
                        </div>
                    </div>

                    <div className="w-full border-t border-neutral-200 dark:border-white/10 pt-6">
                        <h3 className="text-left text-sm font-bold text-neutral-400 uppercase tracking-wider mb-4">Recent Activity</h3>
                        <div className="space-y-4 text-left">
                            <div className="p-4 rounded-xl border border-neutral-200 dark:border-white/5 hover:bg-neutral-50 dark:hover:bg-white/5 transition-colors">
                                <div className="text-xs text-prism-pro font-bold mb-1">SUPPORTING</div>
                                <p className="text-neutral-700 dark:text-neutral-300 text-sm">"AI models should be transparent about their training data..."</p>
                                <div className="text-xs text-neutral-500 mt-2">in <span className="text-neutral-900 dark:text-white font-medium">Generative AI & Jobs</span></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};