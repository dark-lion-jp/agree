'use client';

import { BookOpen, ClipboardList, QrCode } from 'lucide-react';

/**
 * タブナビゲーションコンポーネント
 * @param {object} props - コンポーネントプロパティ
 * @param {string} props.activeTab - 現在のアクティブタブ
 * @param {function} props.onTabChange - タブ変更時のコールバック関数
 * @returns {JSX.Element} タブナビゲーション要素
 */
export default function TabNavigation({ activeTab, onTabChange }) {
  const tabs = [
    { icon: ClipboardList, id: 'form', label: '入力フォーム' },
    { icon: QrCode, id: 'qrcode', label: 'QRコード' },
    { icon: BookOpen, id: 'guide', label: 'ガイド' },
  ];

  return (
    <nav className="sticky top-2 z-50 mb-6">
      <div className="glass-card flex overflow-hidden p-1 backdrop-blur-md">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-medium transition-all ${
                isActive
                  ? 'tab-active shadow-lg'
                  : 'text-gray-400 hover:bg-[var(--surface-light)] hover:text-white'
              }`}
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
            >
              <Icon className="h-5 w-5" />
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
