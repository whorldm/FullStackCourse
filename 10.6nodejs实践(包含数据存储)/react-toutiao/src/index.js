/**
 * @file entry file
 * @author caoyaqin
 */
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import AppContainer from "./app";
import createStore from "./store";
import { Provider } from "react-redux";

const store = createStore(window.initListData);

ReactDOM.hydrate(
    <BrowserRouter>
        <Provider store={store}>
            <AppContainer />
        </Provider>
    </BrowserRouter>,
    document.getElementById('app')
)