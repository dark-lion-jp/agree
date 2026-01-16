'use client';

import { AlertTriangle, CheckCircle2, ListPlus, Plus, Trash2, UserPlus } from 'lucide-react';
import { useState } from 'react';

/**
 * 詳細項目追加コンポーネント
 * 質問形式で「はい/いいえ」のラジオボタンで回答する
 * @param {object} props - コンポーネントプロパティ
 * @param {Array<{question: string, answer: string|null}>} props.items - 追加された項目のリスト
 * @param {function} props.onItemsChange - 項目リスト変更時のコールバック
 * @param {string} props.name1 - 氏名1（質問への注入用）
 * @param {string} props.name2 - 氏名2（質問への注入用）
 * @returns {JSX.Element} 詳細項目追加要素
 */
export default function DetailItems({ items, name1, name2, onItemsChange }) {
  const [newQuestion, setNewQuestion] = useState('');

  /**
   * 新しい質問を追加する
   */
  const handleAddItem = () => {
    if (newQuestion.trim()) {
      onItemsChange([...items, { answer: null, question: newQuestion.trim() }]);
      setNewQuestion('');
    }
  };

  /**
   * EnterキーでもItemを追加できるようにする
   * @param {KeyboardEvent} e - キーボードイベント
   */
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddItem();
    }
  };

  /**
   * 項目を削除する
   * @param {number} index - 削除する項目のインデックス
   */
  const handleRemoveItem = (index) => {
    onItemsChange(items.filter((_, i) => i !== index));
  };

  /**
   * 回答を更新する
   * @param {number} index - 項目のインデックス
   * @param {string} answer - 回答（'yes' または 'no'）
   */
  const handleAnswerChange = (index, answer) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], answer };
    onItemsChange(newItems);
  };

  /**
   * 氏名を質問に挿入する
   * @param {string} name - 挿入する氏名
   */
  const insertName = (name) => {
    if (name) {
      setNewQuestion((prev) => prev + name);
    }
  };

  return (
    <div className="glass-card mb-4 p-4">
      <h2 className="mb-4 flex items-center gap-2 font-semibold">
        <ListPlus className="h-5 w-5 text-[var(--primary)]" />
        詳細項目
      </h2>

      <p className="mb-4 text-sm text-gray-400">
        プレイ内容や条件について質問を追加し、「はい/いいえ」で回答してください。
      </p>

      <div className="mb-2 flex gap-2">
        <input
          className="min-w-0 flex-1 rounded-lg border border-[var(--surface-light)] bg-[var(--surface)] p-3 text-sm transition-all placeholder:text-xs focus:border-[var(--primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30 sm:text-base sm:placeholder:text-sm"
          onChange={(e) => setNewQuestion(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="例: 同意 れんは同意 あおいに○○をします"
          type="text"
          value={newQuestion}
        />
        <button
          className="flex items-center gap-2 rounded-lg bg-[var(--primary)] px-4 py-2 font-medium transition-all hover:bg-[var(--primary-light)] disabled:cursor-not-allowed disabled:opacity-50"
          disabled={!newQuestion.trim()}
          onClick={handleAddItem}
        >
          <Plus className="h-5 w-5" />
          追加
        </button>
      </div>

      <div className="mb-4 flex items-center gap-2">
        <span className="text-xs text-gray-500">氏名を挿入:</span>
        <button
          className="flex items-center gap-1 rounded border border-[var(--surface-light)] px-2 py-1 text-xs transition-all hover:border-[var(--primary)] hover:text-[var(--primary)] disabled:cursor-not-allowed disabled:opacity-50"
          disabled={!name1}
          onClick={() => insertName(name1)}
          title={name1 || '氏名1が未入力です'}
        >
          <UserPlus className="h-3 w-3" />
          氏名1{name1 && `: ${name1}`}
        </button>
        <button
          className="flex items-center gap-1 rounded border border-[var(--surface-light)] px-2 py-1 text-xs transition-all hover:border-[var(--primary)] hover:text-[var(--primary)] disabled:cursor-not-allowed disabled:opacity-50"
          disabled={!name2}
          onClick={() => insertName(name2)}
          title={name2 || '氏名2が未入力です'}
        >
          <UserPlus className="h-3 w-3" />
          氏名2{name2 && `: ${name2}`}
        </button>
      </div>

      {items.length > 0 && (
        <div className="space-y-3">
          {items.map((item, index) => (
            <div
              className={`animate-fade-in rounded-lg border p-4 ${
                item.answer === 'yes'
                  ? 'border-[var(--success)]/50 bg-[var(--success)]/10'
                  : item.answer === 'no'
                    ? 'border-[var(--warning)]/50 bg-[var(--warning)]/10'
                    : 'border-[var(--surface-light)] bg-[var(--surface)]'
              }`}
              key={index}
            >
              <div className="mb-3 flex items-start justify-between">
                <p className="flex-1 text-sm">{item.question}</p>
                <button
                  className="ml-2 rounded p-1 text-gray-400 transition-colors hover:bg-[var(--error)]/20 hover:text-[var(--error)]"
                  onClick={() => handleRemoveItem(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>

              <div className="flex gap-3">
                <button
                  className={`flex flex-1 items-center justify-center gap-2 rounded-lg border px-4 py-2 text-sm transition-all ${
                    item.answer === 'yes'
                      ? 'border-[var(--success)] bg-[var(--success)]/20 text-[var(--success)]'
                      : 'border-[var(--surface-light)] hover:border-[var(--success)]/50'
                  }`}
                  onClick={() => handleAnswerChange(index, 'yes')}
                >
                  <CheckCircle2 className="h-4 w-4" />
                  はい
                </button>
                <button
                  className={`flex flex-1 items-center justify-center gap-2 rounded-lg border px-4 py-2 text-sm transition-all ${
                    item.answer === 'no'
                      ? 'border-[var(--warning)] bg-[var(--warning)]/20 text-[var(--warning)]'
                      : 'border-[var(--surface-light)] hover:border-[var(--warning)]/50'
                  }`}
                  onClick={() => handleAnswerChange(index, 'no')}
                >
                  <AlertTriangle className="h-4 w-4" />
                  いいえ
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {items.length === 0 && (
        <p className="text-center text-sm text-gray-500">まだ項目がありません</p>
      )}
    </div>
  );
}
