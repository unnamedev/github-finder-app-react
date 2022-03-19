import {Link} from "react-router-dom"
import {FaGithub} from "react-icons/all"

/**
 * @description - NotFound Page Component
 * @returns {JSX.Element}
 * @constructor
 */
const NotFound = () =>
    <div className="flex flex-col items-center justify-center text-center dark:text-secondary">
        <div className="grid gap-[10px]">
            <p className="font-semibold text-6xl md:text-9xl flex gap-1 items-center justify-center">
                4
                <FaGithub className="inline text-4xl md:text-8xl"/>
                4
            </p>
            <h1>Page not found</h1>
            <Link
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-center focus:outline-none focus:shadow-outline transition-all"
                to="/"
            >Back to home</Link>
        </div>
    </div>

export default NotFound
