import "@/styles/globals.css";
import NextNProgress from "nextjs-progressbar";
import { Provider } from "react-redux";
import store from "@/store";
export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Provider store={store}>
        <NextNProgress color={"pink"} />
        <Component {...pageProps} />;
      </Provider>
    </>
  );
}
