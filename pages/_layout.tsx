import Head from "next/head";
import openGraphImage from '../public/openGraph.png'

type Props = {
    children: JSX.Element
}

export default function Layout({ children }: Props) {
    return (
      <div>
        <Head>
            <meta property="og:image" content={openGraphImage.src} key="ogimage" />
            <link
              rel="preload"
              href="/fonts/Berolina.ttf"
              as="font"
              crossOrigin=""
              />
            <link
              rel="preload"
              href="/fonts/Bitter-VariableFont_wght.ttf"
              as="font"
              crossOrigin=""
              />
            <link
              rel="preload"
              href="/fonts/Boecklins Universe.ttf"
              as="font"
              crossOrigin=""
              />
              <title>Café Select</title>
          </Head>
              <body style={{backgroundColor: '#A2B9A9'}}>
                <main>{children}</main>
              </body>
        </div>
    )
}