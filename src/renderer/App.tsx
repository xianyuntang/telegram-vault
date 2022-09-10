import { Provider } from "react-redux";

import AppRouter from "@/renderer/components/AppRouter";
import store from "@/renderer/stores";
function App() {
  return (
    <Provider store={store}>
      <AppRouter />
    </Provider>
  );
}

export default App;
