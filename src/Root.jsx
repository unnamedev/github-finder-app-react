import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import {About, Footer, Header, Home, NotFound, User} from "./components"

/**
 * @description - Root Component
 * @returns {JSX.Element}
 * @constructor
 */
const Root = () =>
    <Router>
        {/* Wrapper */}
        <div className="flex flex-col bg-slate-100 min-h-screen dark:bg-secondary">
            {/* Header */}
            <Header/>
            {/* Content */}
            <main className="container mx-auto px-3 pb-12 flex-grow pt-[20px]">
                {/* Pages */}
                <Routes>
                    <Route path="/" exact element={<Home/>}/>
                    <Route path="/about" exact element={<About/>}/>
                    <Route path="/user/:login" exact element={<User/>}/>
                    <Route path="/*" exact element={<NotFound/>}/>
                </Routes>
            </main>
            {/* Footer */}
            <Footer/>
        </div>
    </Router>

export default Root
