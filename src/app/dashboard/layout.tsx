import Navbar from "./navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-screen min-h-screen h-full overflow-x-hidden">
      <Navbar />
      {children}
    </div>
  );
}
