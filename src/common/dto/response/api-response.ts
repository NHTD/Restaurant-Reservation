import { ApiResponseEnum } from "src/enums/api-response.enum";
import { HttpStatus } from "@nestjs/common";

export class ApiResponse {
    static ok<T>(
        data: T,
        message: string = "",
        httpStatus: number = HttpStatus.OK
    ) : Record<string, any> {
        return {
            [ApiResponseEnum.STATUS]: true,
            [ApiResponseEnum.CODE]: httpStatus,
            [ApiResponseEnum.DATA]: data,
            [ApiResponseEnum.MESSAGE]: message,
            [ApiResponseEnum.TIMESTAMP]: this.getTimeStamp()
        }
    }

    static error<T>(
        errors: T,
        message: string = "",
        httpStatus: number = HttpStatus.INTERNAL_SERVER_ERROR
    ): Record<string, any> {
        return {
            [ApiResponseEnum.STATUS]: false,
            [ApiResponseEnum.CODE]: httpStatus,
            [ApiResponseEnum.ERRORS]: errors,
            [ApiResponseEnum.MESSAGE]: message,
            [ApiResponseEnum.TIMESTAMP]: this.getTimeStamp()
        }
    }

    static message(
        message: string,
        httpStatus: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR,
    ) : Record<string, any> {
        return {
            [ApiResponseEnum.STATUS]: httpStatus === HttpStatus.OK || httpStatus === HttpStatus.CREATED,
            [ApiResponseEnum.MESSAGE]: message,
            [ApiResponseEnum.TIMESTAMP]: this.getTimeStamp() 
        }
    }

    private static getTimeStamp(): string {
        return new Date().toISOString()
    }
}