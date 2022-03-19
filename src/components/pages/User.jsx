import {useEffect} from "react"
import {Link, useParams} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"
import {getUserAndRepos} from "../../features/github/githubSlice"
import {FaCodepen, FaEye, FaInfo, FaLink, FaStar, FaStore, FaUserFriends, FaUsers, FaUtensils} from "react-icons/fa"
import {Loader} from "../index";

/**
 * @description - User Page Component
 * @returns {JSX.Element}
 * @constructor
 */
const User = () => {
    // Getting the params from the URL.
    const params = useParams()
    // A way to dispatch actions to the store.
    const dispatch = useDispatch()
    const {user, repos, isLoading} = useSelector(({github}) => github)

    // Get user info
    useEffect(() => {
        dispatch(getUserAndRepos(params.login))
    }, [params.login])

    // It's destructuring the user object.
    const {
        name,
        type,
        avatar_url,
        location,
        bio,
        blog,
        twitter_username,
        login,
        html_url,
        followers,
        following,
        public_repos,
        public_gists,
        hireable
    } = user

    // This is a simple way to show a loading state.
    if (isLoading) return <Loader/>

    return <div className="max-w-4xl m-auto dark:text-secondary">
        {/* Back To Search */}
        <div
            className="inline-flex bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-center focus:outline-none focus:shadow-outline transition-all mb-4">
            <Link to="/" className="btn btn-ghost">Back To Search</Link>
        </div>

        {/* Top Description */}
        <div className="grid gap-4">

            <img className="max-w-[250px] rounded-[50%] m-auto" src={avatar_url} alt={login}/>

            <div className="flex flex-col gap-4">

                <div className="flex flex-col items-center text-center gap-[10px]">
                    {/* Name */}
                    <h1 className="flex items-center gap-1">
                        <span className="font-semibold">{name}</span>
                        {/* Type */}
                        <span
                            className=" bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded-lg">{type}</span>
                        {/* Hireable */}
                        {hireable && <span
                            className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-lg">Hireable</span>}
                    </h1>

                    {/* Bio */}
                    <p>{bio}</p>

                    {/* Visit Github Profile */}
                    <a
                        href={html_url}
                        target="_blank"
                        rel="noreferrer"
                        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded text-center focus:outline-none focus:shadow-outline transition-all">
                        Visit GitHub Profile
                    </a>
                </div>

                {/* Address */}
                <div className="grid gap-3 shadow bg-white rounded-lg mb-4 p-3 sm:grid-cols-3 dark:bg-primary dark:text-secondary">
                    <p className="flex items-center justify-center font-semibold text-lg md:text-xl col-span-2 sm:col-span-4 md:justify-start">Contacts 👋🏻</p>
                    {/* Location */}
                    {location && <div className="flex flex-col gap-1">
                        <h3 className="font-semibold text-md">Location</h3>
                        <p className="text-base">{location}</p>
                    </div>}

                    {/* Blog */}
                    {blog && <div className="flex flex-col gap-1">
                        <h3 className="font-semibold text-md">Website</h3>
                        <p className="text-base">
                            <a className="font-bold text-sm text-blue-500 hover:text-blue-800 transition-all sm:text-base dark:text-accent dark:hover:text-secondary"
                               href={`https://${blog}`} target="_blank" rel="noreferrer">{blog}</a>
                        </p>
                    </div>}
                    {/* twitter */}
                    {twitter_username && <div className="flex flex-col gap-1">
                        <h3 className="font-semibold text-md">Twitter</h3>
                        <p className="text-base">
                            <a className="font-bold text-sm text-blue-500 hover:text-blue-800 transition-all sm:text-base dark:text-accent dark:hover:text-secondary"
                               href={`https://twitter.com/${twitter_username}`} target="_blank"
                               rel="noreferrer">{twitter_username}</a>
                        </p>
                    </div>}
                </div>
            </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 bg-white shadow rounded p-5 p-3 mb-4 sm:grid-cols-4 dark:bg-primary dark:text-secondary">
            <p className="flex items-center justify-center font-semibold text-lg md:text-xl col-span-2 sm:col-span-4 md:justify-start">Statistics 📊</p>

            <div className="flex flex-col items-center gap-1.5">
                <FaUsers className="text-3xl md:text-5xl text-[#ff6f6f]"/>
                <h3 className="font-semibold">Followers</h3>
                <p className="text-2xl font-semibold">{followers}</p>
            </div>

            <div className="flex flex-col items-center gap-1.5">
                <FaUserFriends className="text-3xl md:text-5xl text-[#ff6f6f]"/>
                <h3 className="font-semibold">Following</h3>
                <p className="text-2xl font-semibold">{following}</p>
            </div>

            <div className="flex flex-col items-center gap-1.5">
                <FaCodepen className="text-3xl md:text-5xl text-[#ff6f6f]"/>
                <h3 className="font-semibold">Public Repos</h3>
                <p className="text-2xl font-semibold">{public_repos}</p>
            </div>

            <div className="flex flex-col items-center gap-1.5">
                <FaStore className="text-3xl md:text-5xl text-[#ff6f6f]"/>
                <h3 className="font-semibold ">Public Gists</h3>
                <p className="text-2xl font-semibold">{public_gists}</p>
            </div>
        </div>

        {/* Repos */}
        <div className="flex flex-col gap-2 bg-white shadow rounded p-5 p-3 dark:bg-primary dark:text-secondary">

            <p className="flex items-center justify-center font-semibold text-lg md:text-xl col-span-2 sm:col-span-4 md:justify-start">Latest Repositories 📎</p>

            <div className="grid md:grid-cols-2 gap-3">
                {repos.map(({id, name, description, html_url, forks, open_issues, watchers_count, stargazers_count}) =>
                    <ul className="grid gap-4" key={id}>
                        <li className="flex flex-col gap-2 border-2 border-gray-100 rounded p-3 dark:border-slate-600">
                            <h3 className="text-base font-semibold font-bold text-sm text-[#ff6f6f] hover:text-blue-800 transition-all sm:text-base dark:hover:text-accent">
                                <a className="flex items-center" href={html_url}>
                                    <FaLink className="inline mr-1"/>
                                    {name}
                                </a>
                            </h3>

                            {description && <p className="mb-3">{description}</p>}

                            <div className="flex items-center gap-3 mt-auto">
                                <div className="flex items-center gap-1 bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded-lg">
                                    <FaEye/>
                                    {watchers_count}
                                </div>

                                <div className="flex items-center gap-1 bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-lg">
                                    <FaStar/>
                                    {stargazers_count}
                                </div>
                                <div className="flex items-center gap-1 bg-red-100 text-red-800 text-xs font-semibold px-2.5 py-0.5 rounded-lg">
                                    <FaInfo/>
                                    {open_issues}
                                </div>
                                <div className="flex items-center gap-1 bg-yellow-100 text-yellow-800 text-xs font-semibold px-2.5 py-0.5 rounded-lg">
                                    <FaUtensils/>
                                    {forks}
                                </div>
                            </div>
                        </li>
                    </ul>
                )}
            </div>
        </div>
    </div>
}

export default User
