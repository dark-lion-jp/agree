'use client';

import { Info, Lock } from 'lucide-react';
import { useState } from 'react';

import PrivacyPolicyModal from '../modals/PrivacyPolicyModal';
import ServiceInfoModal from '../modals/ServiceInfoModal';

/**
 * アプリケーションのフッターコンポーネント
 * サービス概要、プライバシーポリシーへのリンクとデータ保存に関する注記を表示
 * @returns {JSX.Element} フッター要素
 */
export default function Footer() {
  const [isServiceInfoOpen, setIsServiceInfoOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);

  return (
    <>
      <footer className="mt-auto py-6">
        <div className="flex flex-col items-center gap-3">
          <div className="flex gap-6">
            <button
              className="flex items-center gap-1 text-sm text-gray-400 transition-colors hover:text-[var(--primary)]"
              onClick={() => setIsServiceInfoOpen(true)}
            >
              <Info className="h-4 w-4" />
              サービス概要
            </button>
            <button
              className="flex items-center gap-1 text-sm text-gray-400 transition-colors hover:text-[var(--primary)]"
              onClick={() => setIsPrivacyOpen(true)}
            >
              <Lock className="h-4 w-4" />
              プライバシーポリシー
            </button>
          </div>
          <p className="flex items-center gap-1 text-xs text-gray-500">
            <Lock className="h-3 w-3" />
            データは端末内にのみ保存されます
          </p>
        </div>
      </footer>

      <ServiceInfoModal isOpen={isServiceInfoOpen} onClose={() => setIsServiceInfoOpen(false)} />
      <PrivacyPolicyModal isOpen={isPrivacyOpen} onClose={() => setIsPrivacyOpen(false)} />
    </>
  );
}
