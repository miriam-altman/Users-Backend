import express, { Request, Response } from "express";
import { retryOperation } from "../services/retryService";
import { handleError } from "../services/errorService";
import { createUser, deleteUser, getUsers, checkUserExists } from "../services/userService";

const router = express.Router();

// Create a new user
router.post("/", async (req: Request, res: Response) => {
    const { firstName, lastName, companyId, email, password } = req.body;
    if (!firstName || !lastName || !companyId || !email || !password) {
        console.error("Missing required fields");
        res.status(400).json({ message: "Missing required fields" });
    }

    try {
        const newUser = await retryOperation(() => createUser(firstName, lastName, companyId, email, password));
        console.log(`User created successfully: ${newUser.email}`);
        res.status(201).json(newUser);
    } catch (error) {
        handleError(res, error);
    }
});

// delete a user
router.delete("/:id", async (req: Request, res: Response) => {
    try {
        const result = await retryOperation(() => deleteUser(req.params.id));
        res.status(200).json({ message: result });
    } catch (error) {
        handleError(res, error);
    }
});

// get all users with pagination and search
router.get("/", async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const companyId = req.query.companyId as string;
    const searchQuery = req.query.searchQuery as string || "";

    try {
        const { users, totalUsers } = await retryOperation(() => getUsers(page, limit, companyId, searchQuery));
        res.status(200).json({ users, totalUsers, totalPages: Math.ceil(totalUsers / limit), currentPage: page });
    } catch (error) {
        handleError(res, error);
    }
});

// check if user exists before creating
router.get("/exists", async (req: Request, res: Response) => {
    const { email, companyId } = req.query;
    if (!email || !companyId) {
        res.status(400).json({ message: "Missing email or companyId" });
    }

    try {
        const user = await retryOperation(() => checkUserExists(email as string, companyId as string));
        res.json({ isExists: !!user, user });
    } catch (error) {
        handleError(res, error);
    }
});

export default router;
