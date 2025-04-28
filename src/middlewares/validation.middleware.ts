import { Request, Response, NextFunction } from "express";

import { plainToClass } from "class-transformer";
import { validate, ValidationError } from "class-validator";
import { HttpException } from "../exceptions/http.exception";
import { RequestWithUser } from "../interfaces/auth.interface";

export function validationMiddleware<T>(type: any, skipMissingProperties = false) {
    return async (req: RequestWithUser, res: Response, next: NextFunction) => {
      try {
        const dto = plainToClass(type, req.body);
  
        const errors: ValidationError[] = await validate(dto, { skipMissingProperties });
  
        if (errors.length > 0) {
          const message = errors
            .map((error: ValidationError) =>
              Object.values(error.constraints || {}).join(', ')
            )
            .join('; ');
          throw new HttpException(400, `Validation failed: ${message}`);
        }
  
        req.body = dto;
        next();
      } catch (error) {
        next(error);
      }
    };
  }