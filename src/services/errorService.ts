import { Response } from "express";

export const handleError = (res: Response, error: any) => {
    if (error.message === "Request Timeout") {
        console.log("Request Timeout - Try again later");
        res.status(408).json({ message: "Request Timeout - Try again later" });
    } else if (error.message === "Max retries reached") {
        console.log("Max retries reached - Service unavailable");
        res.status(503).json({ message: "Service unavailable - Please try again later" });
    } else {
        console.error(`Unexpected Error: ${error.message}`);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
