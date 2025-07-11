import React from "react";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <script src="https://cdn.tailwindcss.com"></script>
        <style
          dangerouslySetInnerHTML={{
            __html: `
            body {
              background-color: #ffffff !important;
              font-family: system-ui, -apple-system, sans-serif;
            }
          `,
          }}
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
