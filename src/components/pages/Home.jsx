import {UserResult, UserSearch} from "../index"

/**
 * @description - Home Page Component
 * @returns {JSX.Element}
 * @constructor
 */
const Home = () =>
    <div className="max-w-4xl m-auto grid gap-[20px]">
        <UserSearch/>
        <UserResult/>
    </div>

export default Home
