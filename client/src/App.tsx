import React from "react"
import { BrowserRouter } from "react-router-dom";
import RootRoute from "./Routes/RootRouter";
import { Provider } from 'react-redux/es/exports';
import { store, persistor } from "./store/initStore";
import { PersistGate } from "redux-persist/es/integration/react";

function App() {
    return (
        <Provider store={store}>
            <PersistGate persistor={persistor} loading={'loading...'}>
                <BrowserRouter>
                    <RootRoute/>
                </BrowserRouter>
            </PersistGate>
        </Provider>
    )
}

export default App;