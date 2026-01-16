'use client';

import { useState } from 'react';

import ConsentChecklist from '../form/ConsentChecklist';
import DateTimeDisplay from '../form/DateTimeDisplay';
import DetailItems from '../form/DetailItems';
import NameInputs from '../form/NameInputs';
import PDFGenerator from '../form/PDFGenerator';

/**
 * 入力フォームタブコンポーネント
 * @param {object} props - コンポーネントプロパティ
 * @param {object} props.formData - フォームの状態データ
 * @param {function} props.onFormDataChange - フォームデータ変更時のコールバック
 * @returns {JSX.Element} 入力フォームタブ要素
 */
export default function FormTab({ formData, onFormDataChange }) {
  /**
   * フォームデータの特定フィールドを更新する
   * @param {string} field - 更新するフィールド名
   * @param {any} value - 新しい値
   */
  const updateField = (field, value) => {
    onFormDataChange({ ...formData, [field]: value });
  };

  /**
   * 意思確認の回答を更新する
   * @param {string} questionId - 質問ID
   * @param {string} answer - 回答（'yes' または 'no'）
   */
  const updateAnswer = (questionId, answer) => {
    updateField('answers', { ...formData.answers, [questionId]: answer });
  };

  /**
   * すべての質問に「いいえ」と回答されているか
   * また氏名が両方入力されているか確認
   */
  const isFormComplete =
    formData.name1.trim() &&
    formData.name2.trim() &&
    Object.values(formData.answers).length === 5 &&
    Object.values(formData.answers).every((a) => a === 'no');

  return (
    <div className="animate-fade-in">
      <DateTimeDisplay />

      <NameInputs
        name1={formData.name1}
        name2={formData.name2}
        onName1Change={(value) => updateField('name1', value)}
        onName2Change={(value) => updateField('name2', value)}
      />

      <div className="mb-4 rounded-lg border border-[var(--secondary)]/30 bg-[var(--secondary)]/10 p-3">
        <p className="text-center text-sm text-[var(--secondary)]">
          💡 氏名と詳細項目は「QRコード」タブからパートナーと共有できます
        </p>
      </div>

      <ConsentChecklist answers={formData.answers} onAnswerChange={updateAnswer} />

      <DetailItems
        items={formData.detailItems}
        name1={formData.name1}
        name2={formData.name2}
        onItemsChange={(items) => updateField('detailItems', items)}
      />

      <PDFGenerator
        answers={formData.answers}
        detailItems={formData.detailItems}
        isEnabled={isFormComplete}
        name1={formData.name1}
        name2={formData.name2}
      />
    </div>
  );
}
