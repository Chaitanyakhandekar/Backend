class ApiError extends Error{
    constructor(
        statusCode,
        message="Something went wrong",
        errors=[],
        stack=""
    ){
        super(message)
        this.statusCode=statusCode,
        this.message=message,
        this.errors = errors,
        this.success=false,
        this.data=null
        this.stack=stack
    }
}

export {ApiError}