'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';

import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import TabNavigation from '@/components/layout/TabNavigation';
import FormTab from '@/components/tabs/FormTab';
import GuideTab from '@/components/tabs/GuideTab';
import QRCodeTab from '@/components/tabs/QRCodeTab';

/**
 * フォームデータの初期状態
 */
const INITIAL_FORM_DATA = {
  answers: {},
  detailItems: [
    { answer: null, question: '挿入する' },
    { answer: null, question: '避妊具を着用する' },
    { answer: null, question: '避妊具を着用しない' },
  ],
  name1: '',
  name2: '',
};

/**
 * アプリケーションのメインページ
 * タブで切り替え可能な入力フォーム、QRコード、ガイドを提供
 * @returns {JSX.Element} メインページ要素
 */
export default function Home() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-[var(--primary)] border-t-transparent"></div>
        </div>
      }
    >
      <MainContent />
    </Suspense>
  );
}

function MainContent() {
  const [activeTab, setActiveTab] = useState('form');
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [isLocked, setIsLocked] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();

  // URLパラメータからのデータ読み込み
  useEffect(() => {
    const dataParam = searchParams.get('data');
    if (dataParam) {
      try {
        const decoded = JSON.parse(dataParam); // QRGeneratorでJSON.stringifyされたものがそのまま入っている想定
        // 必要に応じてバリデーション
        // eslint-disable-next-line
        setFormData((prev) => ({
          ...prev,
          detailItems: decoded.detailItems || [],
          name1: decoded.name1 || '',
          name2: decoded.name2 || '',
        }));
        setIsLocked(true);
        // データ読み込み成功時はフォームタブを表示
        setActiveTab('form');
      } catch (e) {
        console.error('Failed to parse data param', e);
      }
    }
  }, [searchParams]);

  const handleReset = () => {
    setFormData(INITIAL_FORM_DATA);
    setIsLocked(false);
    router.replace('/');
  };

  /**
   * アクティブなタブに応じたコンテンツを返す
   * @returns {JSX.Element} タブコンテンツ
   */
  const renderTabContent = () => {
    switch (activeTab) {
      case 'form':
        return (
          <FormTab
            formData={formData}
            isLocked={isLocked}
            onFormDataChange={setFormData}
            onReset={handleReset}
          />
        );
      case 'guide':
        return <GuideTab />;
      case 'qrcode':
        return <QRCodeTab formData={formData} />;
      default:
        return (
          <FormTab
            formData={formData}
            isLocked={isLocked}
            onFormDataChange={setFormData}
            onReset={handleReset}
          />
        );
    }
  };

  return (
    <div className="flex min-h-screen flex-col px-4 py-6">
      <div className="mx-auto w-full max-w-2xl">
        <Header />
        <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
        <main>{renderTabContent()}</main>
      </div>
      <Footer />
    </div>
  );
}
