import { Providers } from "./provider";
import { Raleway} from 'next/font/google'

const raleway = Raleway({ subsets: ['latin'], weight:'500' })

export const metadata = {
  title: 'CRUD | Mentoria',
  description: 'Projeto para desenvolver um CRUD com Chakra UI e NextJS',
}

export default function RootLayout({
  children,
}) {
  return (
    <html lang="pt">
      <body className={raleway.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}