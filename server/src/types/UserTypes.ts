import { Document, Types } from "mongoose"
import { JwtPayload } from "jsonwebtoken"

interface LoginUserType {
    email: string
    password: string
}

interface RegisterUserType extends LoginUserType {
    fullName: string
}

type UserDocument = Document<unknown, {}, RegisterUserType> &
    Omit<
        RegisterUserType & {
            _id: Types.ObjectId
        },
        never
    >

interface SendUserType extends JwtPayload {
    fullName: string
    email: string
}

export { LoginUserType, RegisterUserType, UserDocument, SendUserType }
