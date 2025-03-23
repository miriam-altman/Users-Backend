import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";

import { IUser } from "../models/User";
import { mockUsers } from "../mockUsers";

export const createUser = async (firstName: string, lastName: string, companyId: string, email: string, password: string): Promise<IUser> => {
    // hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser: IUser = {
        _id: uuidv4(),
        firstName,
        lastName,
        companyId,
        email,
        password: hashedPassword,
    };
    mockUsers.push(newUser);
    return newUser;
};

export const deleteUser = async (userId: string): Promise<string> => {
    const userIndex = mockUsers.findIndex(user => user._id === userId);
    if (userIndex === -1) {
        return "User not found";
    }
    mockUsers.splice(userIndex, 1);
    return "User deleted successfully";
};

export const getUsers = async (page: number, limit: number, companyId?: string, searchQuery?: string) => {
    let users: IUser[] = mockUsers;
    if (companyId) {
        users = users.filter(user => user.companyId === companyId);
    }
    if (searchQuery) {
        const query = searchQuery.toLowerCase();
        users = users.filter(user => {
            const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
            return user.firstName.toLowerCase().includes(query) ||
                user.lastName.toLowerCase().includes(query) ||
                fullName.includes(query);
        });
    }
    const totalUsers = users.length;
    users = users.slice((page - 1) * limit, page * limit);
    return { users, totalUsers };
};

export const checkUserExists = async (email: string, companyId: string) => {
    return mockUsers.find(user => user.email === email && user.companyId === companyId) || null;
};
