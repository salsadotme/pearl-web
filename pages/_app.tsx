import "../styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import {
  chain,
  Chain,
  configureChains,
  createClient,
  WagmiConfig,
} from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import type { AppProps } from "next/app";
import Head from "next/head";
import { AppContextProvider } from "@/context/appcontext";

const celo: Chain & { iconUrl: string } = {
  id: 44787,
  network: "Celo",
  name: "Celo Alfajores",
  rpcUrls: { default: "https://alfajores-forno.celo-testnet.org" },
  iconUrl: "https://docs.celo.org/img/color-logo.png",
};

const cronos: Chain & { iconUrl: string } = {
  id: 338,
  network: "Cronos",
  name: "Cronos Testnet",
  rpcUrls: { default: "https://evm-t3.cronos.org" },
  iconUrl: "https://cronos.org/favicon.ico",
};

const gnosis: Chain & { iconUrl: string } = {
  id: 77,
  network: "Gnosis",
  name: "xDai Testnet",
  rpcUrls: { default: "https://sokol.poa.network" },
  iconUrl:
    "https://s2-recruiting.cdn.greenhouse.io/external_greenhouse_job_boards/logos/400/344/300/resized/gnosis_logo_sans_darkblue.png?1566206217",
};

const { chains, provider } = configureChains(
  [chain.polygonMumbai, celo, cronos, gnosis, chain.optimismKovan],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "Pearl",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider
        chains={chains}
        // theme={{
        //   lightMode: lightTheme(),
        //   darkMode: darkTheme(),
        // }}
        coolMode
      >
        <AppContextProvider>
          <Head>
            <title>Pearl Sender</title>
            <meta
              name="description"
              content="Send shoutouts to teammates and colleagues as digital collectibles."
            />
            <link rel="icon" href="/rainbow_pearl.svg" />
          </Head>
          <Component {...pageProps} />
        </AppContextProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;
