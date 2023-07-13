import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { Nextstore } from "../store/store";

function App({ Component, ...rest }: AppProps) {
  const { store, props } = Nextstore.useWrappedStore(rest);
  const { pageProps } = props;
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default App;
