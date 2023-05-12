import { useContext, createContext, useState, useEffect } from "react"
import axios, { AxiosError, AxiosResponse } from "axios"
import toast from "react-hot-toast"

// Types
interface AuthContextType {
    user: AuthenticatedUserType | null
    login: (values: UserInputType) => Promise<void>
    logout: () => Promise<void>
    register: (values: UserInputType) => Promise<void>
    forgotPassword: (email: string) => Promise<void>
}

interface AuthenticatedResponse {
    msg: string | false
    user: AuthenticatedUserType
}

// Create AuthContext
const AuthContext = createContext<AuthContextType>({
    user: null,
    login: async (values: UserInputType) => {},
    logout: async () => {},
    register: async (values: UserInputType) => {},
    forgotPassword: async (email: string) => {},
})

// Auth Provider
function AuthProvider({ children }: { children: JSX.Element }) {
    const [user, setUser] = useState<null | AuthenticatedUserType>(null)

    // Get user
    useEffect(() => {
        const getUser = async (url: string) => {
            try {
                const response: AxiosResponse<AuthenticatedResponse> =
                    await axios.get(url, {
                        headers: {
                            "Content-Type": "application/json",
                        },
                        withCredentials: true,
                    })

                if (response.status === 200) {
                    setUser(response.data.user)
                }
            } catch (error) {
                if (error instanceof AxiosError && error.response) {
                    if (error.response.status === 401) {
                        return null
                    }
                }
                console.log(error)
            }
        }

        if (!user) {
            getUser(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/user`)
        }
    }, [user])

    // Login user
    const login = async (values: UserInputType) => {
        try {
            // Validate values
            if (!values.email || !values.password) {
                toast.error("All input fields are required!")
                return
            }

            //Make request
            const loginApiUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/login`
            const res: AxiosResponse<{ user: AuthenticatedUserType }> =
                await axios.post(
                    loginApiUrl,
                    {
                        email: values.email,
                        password: values.password,
                    },
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                        withCredentials: true,
                    }
                )

            if (res.status === 200) {
                setUser(res.data.user)
                toast.success("Logged in!")
            }
        } catch (error) {
            console.log(error)

            // Throw erorr response message
            const errorData: false | { msg: string } =
                error instanceof AxiosError && error.response?.data
            if (errorData) {
                toast.error(errorData.msg)
                return
            }

            // Throw error message
            const errorMsg: string =
                (error instanceof Error && error.message) || ""
            errorMsg && toast.error(errorMsg)
        }
    }

    // Register user
    const register = async (values: UserInputType) => {
        try {
            // Validate values
            if (!values.email || !values.password || !values.fullName) {
                toast.error("All input fields are required!")
                return
            }

            //Make request
            const registerApiUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/register`
            const res: AxiosResponse<{ user: AuthenticatedUserType }> =
                await axios.post(
                    registerApiUrl,
                    {
                        fullName: values.fullName,
                        email: values.email,
                        password: values.password,
                    },
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                        withCredentials: true,
                    }
                )

            if (res.status === 201) {
                setUser(res.data.user)
                toast.success("Registration successful!")
            }
        } catch (error) {
            console.log(error)

            // Throw erorr response message
            const errorData: false | { msg: string } =
                error instanceof AxiosError && error.response?.data
            if (errorData) {
                toast.error(errorData.msg)
                return
            }

            // Throw error message
            const errorMsg: string =
                (error instanceof Error && error.message) || ""
            errorMsg && toast.error(errorMsg)
        }
    }

    // Logout user
    const logout = async () => {
        try {
            //Make request
            const logoutApiUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/logout`
            const res: AxiosResponse<{ msg: string }> = await axios.get(
                logoutApiUrl,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                }
            )

            if (res.status === 200) {
                setUser(null)
                toast.success(res.data.msg)
            }
        } catch (error) {
            console.log(error)

            // Throw erorr response message
            const errorData: false | { msg: string } =
                error instanceof AxiosError && error.response?.data
            if (errorData) {
                toast.error(errorData.msg)
                return
            }

            // Throw error message
            const errorMsg: string =
                (error instanceof Error && error.message) || ""
            errorMsg && toast.error(errorMsg)
        }
    }

    // Forgot password
    const forgotPassword = async (email: string) => {
        try {
            console.log(email)
        } catch (error) {
            console.log(error)

            // Throw erorr response message
            const errorData: false | { msg: string } =
                error instanceof AxiosError && error.response?.data
            if (errorData) {
                toast.error(errorData.msg)
                return
            }

            // Throw error message
            const errorMsg: string =
                (error instanceof Error && error.message) || ""
            errorMsg && toast.error(errorMsg)
        }
    }

    return (
        <AuthContext.Provider
            value={{ user, login, register, logout, forgotPassword }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider
export const useAuth = () => useContext(AuthContext)
