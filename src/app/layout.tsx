import "./globals.css";

export default async function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="es" className="">
      <body>
        <main className="">{props.children}</main>
      </body>
    </html>
  );
}
