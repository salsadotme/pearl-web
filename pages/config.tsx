import type { NextPage } from "next";
import Layout from "../components/layout";
import YampForm from "../components/yampForm";

const Home: NextPage = () => {
  return (
    <Layout>
      <div className="mt-20">
        <YampForm />
      </div>
    </Layout>
  );
};

export default Home;
