// pages/_document.tsx

import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>{/* Other meta tags, stylesheets, etc. */}</Head>
        <body>
          <Main />
          <NextScript />
          <script
            src="node_modules/@material-tailwind/html@latest/scripts/dialog.js"
            async
          />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
