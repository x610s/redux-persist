import React from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/AppRoutes";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./app/store";
import { Provider } from "react-redux";

function App() {
  return (
    <div className="h-screen bg-slate-700 text-white p-5">
      <Provider store={store}>
      <PersistGate persistor={persistor}>
      <RouterProvider router={router}  />
      </PersistGate>
      </Provider>
    </div>
  );
}

export default App;
