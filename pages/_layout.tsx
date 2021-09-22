import Head from "next/head";

type Props = {
    children: JSX.Element
}

export default function Layout({ children }: Props) {
    return (
      <div>
        <Head>
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