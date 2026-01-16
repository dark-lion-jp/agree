'use client';

import { AlertTriangle, CheckCircle2, ShieldCheck } from 'lucide-react';

/**
 * 意思確認チェックリストの質問項目
 */
const CONSENT_QUESTIONS = [
  {
    category: '自由な意思',
    id: 'freeWill',
    question: '暴力・脅迫・恐怖による強制ではないか？',
  },
  {
    category: '判断能力',
    id: 'judgment',
    question: 'アルコール・薬物・眠気・意識混濁はないか？',
  },
  {
    category: '関係性の対等性',
    id: 'equality',
    question: '地位利用・報復の恐怖による同意ではないか？',
  },
  {
    category: '判断の猶予',
    id: 'consideration',
    question: '不意打ちで動転していないか？',
  },
  {
    category: '撤回権の理解',
    id: 'withdrawal',
    question: 'いつでも同意撤回可能であることを理解しているか？',
  },
];

/**
 * 意思確認チェックリストコンポーネント
 * 5つの確認項目それぞれに「はい/いいえ」の選択肢を提供
 * @param {object} props - コンポーネントプロパティ
 * @param {object} props.answers - 各質問への回答オブジェクト
 * @param {function} props.onAnswerChange - 回答変更時のコールバック
 * @returns {JSX.Element} チェックリスト要素
 */
export default function ConsentChecklist({ answers, onAnswerChange }) {
  /**
   * すべての質問に「いいえ（問題なし）」と回答されているかを判定
   * @returns {boolean} すべて問題なしならtrue
   */
  const allClear = CONSENT_QUESTIONS.every((q) => answers[q.id] === 'no');

  /**
   * 1つでも「はい（問題あり）」と回答されている質問があるかを判定
   * @returns {boolean} 問題がある回答があればtrue
   */
  const hasWarning = CONSENT_QUESTIONS.some((q) => answers[q.id] === 'yes');

  return (
    <div className="glass-card mb-4 p-4">
      <h2 className="mb-4 flex items-center gap-2 font-semibold">
        <ShieldCheck className="h-5 w-5 text-[var(--primary)]" />
        意思確認チェックリスト
      </h2>

      <p className="mb-4 text-sm text-gray-400">
        以下のすべての質問で「いいえ（問題なし）」を選択すると、PDF出力が可能になります。
      </p>

      <div className="space-y-3">
        {CONSENT_QUESTIONS.map((item, index) => (
          <div
            className={`consent-item rounded-lg border p-4 ${
              answers[item.id] === 'yes'
                ? 'border-[var(--error)]/50 bg-[var(--error)]/10'
                : answers[item.id] === 'no'
                  ? 'border-[var(--success)]/50 bg-[var(--success)]/10'
                  : 'border-[var(--surface-light)] bg-[var(--surface)]'
            }`}
            key={item.id}
          >
            <div className="mb-2 flex items-start gap-2">
              <span className="rounded bg-[var(--primary)]/20 px-2 py-0.5 text-xs text-[var(--primary)]">
                {index + 1}. {item.category}
              </span>
            </div>
            <p className="mb-3 text-sm">{item.question}</p>

            <div className="flex gap-3">
              <button
                className={`flex flex-1 items-center justify-center gap-2 rounded-lg border px-4 py-2 text-sm transition-all ${
                  answers[item.id] === 'yes'
                    ? 'border-[var(--error)] bg-[var(--error)]/20 text-[var(--error)]'
                    : 'border-[var(--surface-light)] hover:border-[var(--error)]/50'
                }`}
                onClick={() => onAnswerChange(item.id, 'yes')}
              >
                <AlertTriangle className="h-4 w-4" />
                <span className="flex flex-col items-center md:flex-row md:gap-1">
                  <span>はい</span>
                  <span className="text-xs">（問題あり）</span>
                </span>
              </button>
              <button
                className={`flex flex-1 items-center justify-center gap-2 rounded-lg border px-4 py-2 text-sm transition-all ${
                  answers[item.id] === 'no'
                    ? 'border-[var(--success)] bg-[var(--success)]/20 text-[var(--success)]'
                    : 'border-[var(--surface-light)] hover:border-[var(--success)]/50'
                }`}
                onClick={() => onAnswerChange(item.id, 'no')}
              >
                <CheckCircle2 className="h-4 w-4" />
                <span className="flex flex-col items-center md:flex-row md:gap-1">
                  <span>いいえ</span>
                  <span className="text-xs">（問題なし）</span>
                </span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {hasWarning && (
        <div className="mt-4 flex items-center gap-2 rounded-lg border border-[var(--error)]/50 bg-[var(--error)]/10 p-3 text-sm text-[var(--error)]">
          <AlertTriangle className="h-5 w-5 flex-shrink-0" />
          <p>
            「問題あり」と回答された項目があります。すべての条件が満たされないとPDF出力できません。
          </p>
        </div>
      )}

      {allClear && (
        <div className="mt-4 flex items-center gap-2 rounded-lg border border-[var(--success)]/50 bg-[var(--success)]/10 p-3 text-sm text-[var(--success)]">
          <CheckCircle2 className="h-5 w-5 flex-shrink-0" />
          <p>すべての確認項目がクリアされました。PDF出力が可能です。</p>
        </div>
      )}
    </div>
  );
}

export { CONSENT_QUESTIONS };
