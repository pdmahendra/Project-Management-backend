class ApiError extends Error {
    constructor(statusCode, message = "Something went wrong", error = [], stack = "") {
        super(message)
        this.statusCode = statusCode
        this.data = null
        this.message = message
        this.success = false
        this.errors = error

        if (stack) {
            this.stack = stack
        } else {
            Error.captureStackTrace(this, this.constructor)
        }
    }
}

export { ApiError }

/*ApiError: user does not exist or wrong email
    at loginUser (file:///C:/Users/ayurm/OneDrive/Desktop/learningNode/src/controllers/user.controller.js:40:7)
    at process.processTicksAndRejections (node:internal/process/task_queues:95:5) {
  statusCode: 400,
  data: null,
  success: false,
  errors: []
}*/
