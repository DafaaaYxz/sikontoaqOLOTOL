
import React from 'react';
import { Screen, ChatHistoryItem } from '../types';

interface HistoryProps {
    onNavigate: (screen: Screen) => void;
    history: ChatHistoryItem[];
    onSelectLog: (item: ChatHistoryItem) => void;
}

const History: React.FC<HistoryProps> = ({ onNavigate, history, onSelectLog }) => {
  return (
    <div className="flex-1 container mx-auto p-6 animate-fade-in flex flex-col h-[calc(100vh-80px)]">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl md:text-4xl font-pixel text-white pixel-text-shadow">SERVER LOGS</h1>
        <button onClick={() => onNavigate(Screen.HOME)} className="bg-central-secondary px-4 py-2 font-pixel text-xs text-white pixel-border hover:bg-red-700">BACK</button>
      </div>
      
      <div className="bg-central-glass pixel-border p-1 shadow-[0_0_20px_rgba(0,0,0,0.5)] flex-1 overflow-hidden flex flex-col">
        <div className="bg-black/50 p-2 border-b border-red-900 flex justify-between items-center text-xs font-mono text-gray-500">
            <span>FILES FOUND: {history.length}</span>
            <span>DIRECTORY: /var/logs/chat_history/</span>
        </div>
        
        <div className="overflow-y-auto p-4 space-y-1 custom-scroll flex-1 bg-black">
            {history.length === 0 ? (
                <div className="text-center text-gray-500 font-mono py-12">
                    <div className="text-4xl mb-4 opacity-30">∅</div>
                    DIRECTORY EMPTY
                </div>
            ) : (
                history.map((item, idx) => (
                    <div 
                        key={item.id} 
                        onClick={() => onSelectLog(item)}
                        className="group flex items-center gap-3 p-2 hover:bg-gray-900 cursor-pointer border border-transparent hover:border-gray-700 transition-all select-none"
                    >
                        <div className="text-2xl opacity-50 group-hover:opacity-100 group-hover:text-central-accent">
                            📄
                        </div>
                        <div className="flex-1 font-mono">
                            <div className="text-sm text-gray-300 group-hover:text-white truncate">
                                log_{item.id}_session.txt
                            </div>
                            <div className="text-[10px] text-gray-600 group-hover:text-gray-500 flex gap-4">
                                <span>SIZE: {item.aiResponse.length + item.userMessage.length} B</span>
                                <span>DATE: {item.timestamp}</span>
                                <span>USER: {item.username}</span>
                            </div>
                        </div>
                        <div className="text-[10px] font-pixel text-gray-700 group-hover:text-central-accent opacity-0 group-hover:opacity-100 transition-opacity">
                            [OPEN]
                        </div>
                    </div>
                ))
            )}
        </div>
      </div>
    </div>
  );
};

export default History;
