'use client';

import { User } from 'lucide-react';

/**
 * 氏名入力コンポーネント
 * 2名分の氏名入力フィールドを提供する
 * @param {object} props - コンポーネントプロパティ
 * @param {string} props.name1 - 1人目の氏名
 * @param {string} props.name2 - 2人目の氏名
 * @param {function} props.onName1Change - 1人目の氏名変更時のコールバック
 * @param {function} props.onName2Change - 2人目の氏名変更時のコールバック
 * @returns {JSX.Element} 氏名入力要素
 */
export default function NameInputs({ name1, name2, onName1Change, onName2Change }) {
  return (
    <div className="glass-card mb-4 p-4">
      <h2 className="mb-4 flex items-center gap-2 font-semibold">
        <User className="h-5 w-5 text-[var(--primary)]" />
        氏名入力
      </h2>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm text-gray-400" htmlFor="name1">
            氏名 1
          </label>
          <input
            className="w-full rounded-lg border border-[var(--surface-light)] bg-[var(--surface)] p-3 transition-all focus:border-[var(--primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30"
            id="name1"
            onChange={(e) => onName1Change(e.target.value)}
            placeholder="同意 蓮"
            type="text"
            value={name1}
          />
        </div>

        <div>
          <label className="mb-1 block text-sm text-gray-400" htmlFor="name2">
            氏名 2
          </label>
          <input
            className="w-full rounded-lg border border-[var(--surface-light)] bg-[var(--surface)] p-3 transition-all focus:border-[var(--primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30"
            id="name2"
            onChange={(e) => onName2Change(e.target.value)}
            placeholder="同意 葵"
            type="text"
            value={name2}
          />
        </div>
      </div>
    </div>
  );
}
