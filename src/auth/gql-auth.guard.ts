import { GqlExecutionContext, Resolver } from "@nestjs/graphql";
import { AuthGuard } from "@nestjs/passport";
import { ExecutionContext } from "@nestjs/common";
import { request } from "express";

@Resolver()
export class GqlAuthGuard extends AuthGuard('local'){
    constructor() {
        super();
    }

    getRequest(context: ExecutionContext) {
        const ctx = GqlExecutionContext.create(context);
        request.body = ctx.getArgs().loginUserInput;
        return request;
    }
}