import { GoogleAnalytics } from '@next/third-parties/google';
import { Noto_Sans_JP } from 'next/font/google';

import './globals.css';

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  variable: '--font-noto-sans-jp',
  weight: ['400', '500', '700'],
});

export const metadata = {
  description:
    '当事者間の意思確認補助を目的とした性的同意確認ツール。プライバシーを最優先し、データはすべてクライアントサイドで処理されます。',
  keywords: '同意確認, 性的同意, コンセント, 意思確認',
  robots: 'noindex, nofollow',
  title: '性的同意確認アプリ',
};

/**
 * アプリケーションのルートレイアウト
 * @param {object} props - コンポーネントプロパティ
 * @param {React.ReactNode} props.children - 子コンポーネント
 * @returns {JSX.Element} ルートレイアウト
 */
export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <body className={`${notoSansJP.variable} antialiased`}>{children}</body>
      {process.env.NEXT_PUBLIC_GA_ID && <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />}
    </html>
  );
}
