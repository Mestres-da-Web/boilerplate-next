import Providers from '@/components/Providers/Providers';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

// importação de fontes

const inter = Inter({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
});

//

export const metadata: Metadata = {
  title: 'Boilerplate Next',
  description: 'Boilerplate Next',
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="pt">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
};

export default RootLayout;
