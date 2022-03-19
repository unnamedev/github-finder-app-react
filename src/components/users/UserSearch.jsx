import {useDispatch, useSelector} from "react-redux"
import {resetUsers, searchUsers} from "../../features/github/githubSlice"
import {useForm} from "react-hook-form"

/**
 * @description - UserSearch Component
 * @returns {JSX.Element}
 * @constructor
 */
const UserSearch = () => {
    const dispatch = useDispatch()
    // Get users from store
    const {users, isLoading} = useSelector(({github}) => github)
    const {register, handleSubmit, reset, formState: {errors}} = useForm()

    // This is a callback function that is passed to the `handleSubmit` function.
    const onSubmit = ({name}) => {
        dispatch(searchUsers(name))
        reset()
    }

    /* Render */
    return <form
        onSubmit={handleSubmit(onSubmit)}
        autoComplete="off"
        className="flex flex-col gap-2 bg-white shadow rounded p-5 p-3 sm:flex-row sm:items-start md:px-8 md:pt-6 md:pb-8 dark:bg-primary"
    >
        <div className="w-full">
            <input
                className={`appearance-none border-2 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none hover:border-blue-400 focus:border-blue-400 transition-all dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-accent ${errors.name && "text-red-600 border-red-400 focus:border-red-400 hover:border-red-600 dark:text-red-600 dark:border-red-400 dark:focus:border-red-400 dark:hover:border-red-600"}`}
                type="text"
                name="name"
                placeholder="Enter username"
                {...register("name", {required: true})}
            />
            {errors.name && <p className="text-red-600 mt-1 text-sm">Name is required</p>}
        </div>

        <button
            className="flex items-center justify-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-center focus:outline-none focus:shadow-outline transition-all"
            type="submit"
            disabled={isLoading}
        >
            {/* Spinner */}
            {isLoading &&
                <svg role="status" className="inline mr-3 w-4 h-4 text-white animate-spin" viewBox="0 0 100 101"
                     fill="none"
                     xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="#E5E7EB"/>
                    <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentColor"/>
                </svg>
            }
            {!isLoading ? "Search" : "Loading..."}
        </button>

        {/* Clear */}
        {users.length !== 0 &&
            <button
                onClick={() => dispatch(resetUsers())}
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded text-center focus:outline-none focus:shadow-outline transition-all"
                type="button">
                Clear
            </button>
        }
    </form>
}

export default UserSearch
