'use client';

import { jsPDF } from 'jspdf';
import { Download, Loader2 } from 'lucide-react';
import { useState } from 'react';

import { CONSENT_QUESTIONS } from './ConsentChecklist';

// Google Fonts から Noto Sans JP Regular のTTFを取得する URL
const NOTO_SANS_JP_URL =
  'https://fonts.gstatic.com/s/notosansjp/v53/-F6jfjtqLzI2JPCgQBnw7HFyzSD-AsregP8VFBEj75s.ttf';

/**
 * PDF生成コンポーネント
 * 入力データをPDFとして出力する
 * @param {object} props - コンポーネントプロパティ
 * @param {string} props.name1 - 1人目の氏名
 * @param {string} props.name2 - 2人目の氏名
 * @param {object} props.answers - 意思確認の回答
 * @param {Array<{question: string, answer: string|null}>} props.detailItems - 詳細項目リスト
 * @param {boolean} props.isEnabled - PDF出力可能かどうか
 * @returns {JSX.Element} PDF生成ボタン要素
 */
export default function PDFGenerator({ answers, detailItems, isEnabled, name1, name2 }) {
  const [isGenerating, setIsGenerating] = useState(false);

  /**
   * フォントをフェッチしてBase64に変換する
   * @returns {Promise<string>} Base64エンコードされたフォントデータ
   */
  const fetchFontAsBase64 = async () => {
    const response = await fetch(NOTO_SANS_JP_URL);
    const arrayBuffer = await response.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);
    let binary = '';
    for (let i = 0; i < uint8Array.length; i++) {
      binary += String.fromCharCode(uint8Array[i]);
    }
    return btoa(binary);
  };

  /**
   * PDFを生成してダウンロードする
   */
  const handleGeneratePDF = async () => {
    setIsGenerating(true);

    try {
      // フォントを取得してBase64に変換
      const fontBase64 = await fetchFontAsBase64();

      const doc = new jsPDF({
        format: 'a4',
        orientation: 'portrait',
        unit: 'mm',
      });

      // フォントを登録
      doc.addFileToVFS('NotoSansJP-Regular.ttf', fontBase64);
      doc.addFont('NotoSansJP-Regular.ttf', 'NotoSansJP', 'normal');
      doc.setFont('NotoSansJP');

      const currentDate = new Date().toLocaleString('ja-JP', {
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        month: 'long',
        year: 'numeric',
      });

      let y = 20;

      // タイトル
      doc.setFontSize(18);
      doc.text('Agree', 105, y, { align: 'center' });
      y += 15;

      // 免責事項
      doc.setFontSize(9);
      doc.setTextColor(128, 128, 128);
      doc.text('本書類は意思確認の補助ツールであり、法的拘束力はありません。', 105, y, {
        align: 'center',
      });
      doc.text('脅迫・強要・泥酔状態での同意は無効です。同意はいつでも撤回可能です。', 105, y + 5, {
        align: 'center',
      });
      y += 15;

      // 日時
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(11);
      doc.text(`日時: ${currentDate}`, 20, y);
      y += 12;

      // 氏名
      doc.setFontSize(12);
      doc.text('当事者:', 20, y);
      y += 7;
      doc.setFontSize(11);
      doc.text(`  氏名 1: ${name1 || '（未入力）'}`, 20, y);
      y += 6;
      doc.text(`  氏名 2: ${name2 || '（未入力）'}`, 20, y);
      y += 12;

      // 意思確認項目
      doc.setFontSize(12);
      doc.text('意思確認項目:', 20, y);
      y += 8;

      doc.setFontSize(10);
      CONSENT_QUESTIONS.forEach((q, index) => {
        const status = answers[q.id] === 'no' ? '[OK]' : '[NG]';
        // 入力フォームと同じ質問文を表示
        doc.text(`${index + 1}. ${q.question} ${status}`, 25, y);
        y += 6;
      });

      y += 5;

      // 詳細項目
      if (detailItems.length > 0) {
        doc.setFontSize(12);
        doc.text('詳細条件:', 20, y);
        y += 8;

        doc.setFontSize(10);
        detailItems.forEach((item) => {
          const answer =
            item.answer === 'yes' ? '[はい]' : item.answer === 'no' ? '[いいえ]' : '[回答しない]';
          doc.text(`${item.question}: ${answer}`, 25, y);
          y += 6;
        });
      }

      y += 20;

      // 署名欄
      doc.setFontSize(11);
      doc.text('署名:', 20, y);
      y += 15;

      doc.line(25, y, 90, y);
      doc.text(`${name1 || '氏名 1'}`, 57.5, y + 5, { align: 'center' });

      doc.line(110, y, 175, y);
      doc.text(`${name2 || '氏名 2'}`, 142.5, y + 5, { align: 'center' });

      // ファイル名に日時を含める
      const fileName = `同意確認書_${new Date().toISOString().split('T')[0]}.pdf`;
      doc.save(fileName);
    } catch (error) {
      console.error('PDF生成エラー:', error);
      alert('PDFの生成に失敗しました。ネットワーク接続を確認してください。');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <button
      className={`btn-glow flex w-full items-center justify-center gap-2 rounded-lg py-4 text-lg font-semibold transition-all ${
        isEnabled && !isGenerating
          ? 'bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] hover:opacity-90'
          : 'cursor-not-allowed bg-gray-600 opacity-50'
      }`}
      disabled={!isEnabled || isGenerating}
      onClick={handleGeneratePDF}
    >
      {isGenerating ? (
        <>
          <Loader2 className="h-6 w-6 animate-spin" />
          PDF生成中...
        </>
      ) : (
        <>
          <Download className="h-6 w-6" />
          PDF出力
        </>
      )}
    </button>
  );
}
