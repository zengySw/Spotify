export class HttpError extends Error {
    status;
    code;
    constructor(status, code, message) {
        super(message);
        this.status = status;
        this.code = code;
    }
}
export const errorHandler = (error, _req, res, _next) => {
    if (error instanceof HttpError) {
        res.status(error.status).json({
            error: error.code,
            message: error.message,
        });
        return;
    }
    const message = error instanceof Error ? error.message : "Unexpected error";
    res.status(500).json({
        error: "INTERNAL_SERVER_ERROR",
        message,
    });
};
