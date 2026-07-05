
const Login = () => {
    return(
        <div className="w-full flex flex-col items-center h-screen">
        <form className="w-11/12 sm:w-1/2 flex flex-col gap-7 bg-gray-100 mt-4 p-4 border border-gray-300 rounded-md shadow-md">
            <h1 className="text-2xl font-bold m-auto">Login</h1> 
            <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-sm font-bold">Email</label>
                <input type="email" id="email" className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter your email" required />
            </div>
            <div className="flex flex-col gap-2">
                <label htmlFor="password" className="text-sm font-bold">Password</label>
                <input type="password" id="password" className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter your password" required />
            </div>
            <button type="submit" className="bg-blue-500 text-white rounded-md p-2 hover:bg-blue-600">Login</button>    

        </form>

        </div>
    )
}
export default Login ;