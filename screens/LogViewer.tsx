
import React from 'react';
import { Screen, ChatHistoryItem } from '../types';

interface LogViewerProps {
    onNavigate: (screen: Screen) => void;
    log: ChatHistoryItem | null;
}

const LogViewer: React.FC<LogViewerProps> = ({ onNavigate, log }) => {
  if (!log) {
      return (
          <div className="flex-1 flex items-center justify-center text-red-500 font-mono">
              FILE NOT FOUND OR CORRUPTED.
              <button onClick={() => onNavigate(Screen.HISTORY)} className="ml-4 underline">RETURN</button>
          </div>
      );
  }

  // Reuse parsing logic for visual consistency
  const parseContent = (text: string) => {
    const regex = /```(\w+)?\n([\s\S]*?)```/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push({ type: 'text', content: text.substring(lastIndex, match.index) });
      }
      parts.push({ type: 'code', content: match[2], lang: match[1] || 'txt' });
      lastIndex = regex.lastIndex;
    }
    if (lastIndex < text.length) {
      parts.push({ type: 'text', content: text.substring(lastIndex) });
    }
    return parts;
  };

  const fakeUrl = `https://centralgpt.onion/chatlog/${log.id}`;

  return (
    <div className="flex-1 container mx-auto p-4 md:p-6 animate-fade-in flex flex-col h-[calc(100vh-80px)]">
      {/* Fake Browser Bar */}
      <div className="bg-gray-900 border border-gray-700 p-2 flex items-center gap-2 mb-4 rounded-t-lg">
        <div className="flex gap-1.5 ml-2 mr-4">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="flex-1 bg-black border border-gray-600 rounded px-3 py-1 text-xs font-mono text-gray-400 truncate">
            🔒 {fakeUrl}
        </div>
        <button onClick={() => onNavigate(Screen.HISTORY)} className="text-gray-400 hover:text-white px-2 font-bold text-xl">
            ×
        </button>
      </div>

      {/* Content */}
      <div className="bg-central-glass pixel-border flex-1 overflow-auto p-6 shadow-2xl relative">
        <div className="absolute top-0 right-0 p-2 opacity-10 pointer-events-none">
            <span className="font-pixel text-6xl text-red-500">CONFIDENTIAL</span>
        </div>

        <div className="max-w-4xl mx-auto space-y-8 font-mono">
            {/* Header Info */}
            <div className="border-b border-gray-700 pb-4 mb-6">
                <h1 className="text-xl text-white font-bold mb-2">SESSION LOG: {log.id}</h1>
                <div className="grid grid-cols-2 gap-4 text-xs text-gray-500">
                    <div>TIMESTAMP: {log.timestamp}</div>
                    <div>PARTICIPANTS: {log.username} & {log.aiName}</div>
                </div>
            </div>

            {/* User Message */}
            <div className="bg-gray-900/50 p-4 border-l-4 border-gray-500">
                <div className="text-[10px] text-gray-400 mb-2 uppercase tracking-wider">INPUT (USER)</div>
                <div className="text-gray-200 whitespace-pre-wrap">{log.userMessage}</div>
            </div>

            {/* AI Response */}
            <div className="bg-black/80 p-4 border-l-4 border-central-accent">
                <div className="text-[10px] text-central-accent mb-2 uppercase tracking-wider">OUTPUT ({log.aiName})</div>
                <div className="text-gray-300 whitespace-pre-wrap leading-relaxed">
                    {parseContent(log.aiResponse).map((part, idx) => (
                        part.type === 'code' ? (
                            <div key={idx} className="my-4 border border-gray-700 bg-gray-900 rounded overflow-hidden">
                                <div className="bg-gray-800 px-3 py-1 text-[10px] text-gray-400 border-b border-gray-700 flex justify-between">
                                    <span>{part.lang?.toUpperCase()}</span>
                                </div>
                                <pre className="p-3 text-sm text-green-400 overflow-x-auto">
                                    <code>{part.content}</code>
                                </pre>
                            </div>
                        ) : (
                            <span key={idx}>{part.content}</span>
                        )
                    ))}
                </div>
            </div>

            <div className="text-center pt-8">
                <span className="text-xs text-gray-600 font-pixel">--- END OF LOG ---</span>
            </div>
        </div>
      </div>
    </div>
  );
};

export default LogViewer;
