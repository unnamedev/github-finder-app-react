import {useSelector} from "react-redux"
import {Link} from "react-router-dom"
import {Loader} from "../index"

/**
 * @description - UserResult Component
 * @returns {JSX.Element}
 * @constructor
 */
const UserResult = () => {
    const {users, isLoading} = useSelector(({github}) => github)

    // This is a simple way to show a loader when the data is loading.
    if (isLoading) return <Loader/>

    return <ul className="grid grid-cols-2 gap-3 md:grid-cols-3">
        {users?.map(({id, avatar_url, login}) =>
            <li className="bg-white shadow rounded p-5 p-3 flex flex-col items-center text-center gap-3 sm:flex-row sm:text-left dark:bg-primary dark:text-secondary" key={id}>
                <img className="rounded-[50%] max-w-[150px] w-full sm:max-w-[50px]" src={avatar_url} alt={login}/>
                <div>
                    <h3 className="text-sm font-semibold sm:text-base">{login}</h3>
                    <Link className="font-bold text-sm text-blue-500 hover:text-blue-800 transition-all sm:text-base dark:text-accent dark:hover:text-secondary" to={`/user/${login}`}>Visit Profile</Link>
                </div>
            </li>
        )}
    </ul>
}

export default UserResult
