import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.2.1/datepicker.min.js"></script>
      </Head>
      <body className="bg-[url('/images/bg.jpg')] bg-cover">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
