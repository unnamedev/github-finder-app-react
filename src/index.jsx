import {render} from "react-dom"
import {Provider} from "react-redux"
// store
import {store} from "./app/store"
// root component
import Root from "./Root"
// styles
import "./index.scss"

// Rendering the Root component, which is the top level component of our application.
render(
    <Provider store={store}>
        <Root/>
    </Provider>,
    document.getElementById("root")
)