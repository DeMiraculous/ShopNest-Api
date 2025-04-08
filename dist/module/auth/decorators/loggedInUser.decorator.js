"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggedInUser = void 0;
const common_1 = require("@nestjs/common");
exports.LoggedInUser = (0, common_1.createParamDecorator)((data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;
    return data ? user?.[data] : user;
});
//# sourceMappingURL=loggedInUser.decorator.js.map