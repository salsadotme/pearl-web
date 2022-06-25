import type { NextPage } from "next";
import type { FC } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import MessageForm from "../components/form";
import Layout from "../components/layout";

const Home: NextPage = () => {
  return (
    <Layout>
      <div className="mt-20">
        <MessageForm />
      </div>
    </Layout>
  );
};

export default Home;
