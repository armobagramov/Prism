import React from 'react';
import { PrismLogo } from './PrismLogo';

interface LoginPageProps {
    onLogin: () => void;
    onCancel: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLogin, onCancel }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-transparent p-4">
        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-white/10 p-8 rounded-3xl shadow-2xl max-w-md w-full relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-prism-accent/20 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="relative flex flex-col items-center">
                <PrismLogo className="w-16 h-16 mb-6" />
                <h2 className="text-3xl font-bold text-neutral-900 dark:text-white mb-2">Welcome to Prism</h2>
                <p className="text-neutral-500 text-center mb-8">Join the discourse. Contribute your perspective to the world's most balanced platform.</p>

                <div className="w-full space-y-4">
                    <button 
                        onClick={onLogin}
                        className="w-full py-3.5 rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-black font-semibold hover:opacity-90 transition-opacity"
                    >
                        Continue with Google
                    </button>
                    <button 
                        onClick={onLogin}
                        className="w-full py-3.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white font-semibold hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
                    >
                        Continue with Email
                    </button>
                </div>

                <div className="mt-8 text-center">
                    <button onClick={onCancel} className="text-sm text-neutral-400 hover:text-white transition-colors">
                        Just browsing? Return to map
                    </button>
                </div>
            </div>
        </div>
    </div>
  );
};