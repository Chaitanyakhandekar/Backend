class ApiResponse{
    constructor(successCode,data,messgae="Success"){
        this.successCode = successCode,
        this.data = data,
        this.message = message,
        this.success = successCode < 400

    }
}

export {ApiResponse}