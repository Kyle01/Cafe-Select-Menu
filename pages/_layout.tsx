import Head from "next/head";
import Link from "next/link";

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
        </Head>
            <main>{children}</main>
        </div>
    )
}