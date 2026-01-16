'use client';

import { useState } from 'react';

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
  detailItems: [],
  name1: '',
  name2: '',
};

/**
 * アプリケーションのメインページ
 * タブで切り替え可能な入力フォーム、QRコード、ガイドを提供
 * @returns {JSX.Element} メインページ要素
 */
export default function Home() {
  const [activeTab, setActiveTab] = useState('form');
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);

  /**
   * アクティブなタブに応じたコンテンツを返す
   * @returns {JSX.Element} タブコンテンツ
   */
  const renderTabContent = () => {
    switch (activeTab) {
      case 'form':
        return <FormTab formData={formData} onFormDataChange={setFormData} />;
      case 'guide':
        return <GuideTab />;
      case 'qrcode':
        return <QRCodeTab formData={formData} onFormDataChange={setFormData} />;
      default:
        return <FormTab formData={formData} onFormDataChange={setFormData} />;
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
