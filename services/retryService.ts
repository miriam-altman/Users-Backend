// Retry function with logs and timeout treatment
export const retryOperation = async (fn: Function, retries: number = 3, delay: number = 1000, timeout: number = 5000): Promise<any> => {
    let attempts = 0;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    while (attempts < retries) {
        try {
            const result = await fn();
            clearTimeout(timeoutId);
            return result;
        } catch (error) {
            attempts++;
            if (controller.signal.aborted) {
                throw new Error("Request Timeout");
            }
            if (attempts >= retries) {
                throw new Error("Max retries reached");
            }
            await new Promise(res => setTimeout(res, delay));
        }
    }
};