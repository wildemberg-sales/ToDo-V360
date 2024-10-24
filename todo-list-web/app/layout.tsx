import ReactQueryClientProvider from "./providers/ReactQueryProvider"
import type { Metadata } from "next";
import Image from "next/image";
import "./globals.css";

export const metadata: Metadata = {
  title: "ToDo List - V360",
  description: "ToDo List para aplicação de vaga na V360",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" className="">
        <body
          className={`antialiased`}
          >
          <ReactQueryClientProvider>
            <div className="relative w-screen h-screen lg:w-[40%] lg:m-[auto] p-2">
              <h1 className="font-bold text-3xl mt-2 mb-4 text-[#7936BE] text-center"><a className="flex justify-center" href="/">ToDo List - <Image src={'/logov360.png'} alt="" width={90} height={90}/></a></h1>
              {children}
            </div>
          </ReactQueryClientProvider>
        </body>
      </html>
  );
}
