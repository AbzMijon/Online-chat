import React from "react"
import { BrowserRouter } from "react-router-dom";
import RootRoute from "./Routes/RootRouter";
import { Provider } from 'react-redux/es/exports';
import { store, persistor } from "./store/initStore";
import { PersistGate } from "redux-persist/es/integration/react";
import GlobalServerError from "./HOC/GlobalServerError";
import Spinner from "./Components/Spinner";

function App() {
    return (
        <Provider store={store}>
            <PersistGate persistor={persistor} loading={<Spinner/>}>
                <BrowserRouter>
                    <GlobalServerError>
                        <RootRoute/>
                    </GlobalServerError>
                </BrowserRouter>
            </PersistGate>
        </Provider>
    )
}

export default App;