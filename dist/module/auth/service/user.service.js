"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var UserService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const user_repository_1 = require("../repository/user.repository");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcryptjs");
let UserService = UserService_1 = class UserService {
    userRepoitory;
    jwtService;
    logger;
    constructor(userRepoitory, jwtService) {
        this.userRepoitory = userRepoitory;
        this.jwtService = jwtService;
        this.logger = new common_1.Logger(UserService_1.name);
    }
    async userSignUp(createUserDto) {
        let { email, password, } = createUserDto;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, 10);
        const existingUser = this.userRepoitory.findUserByEmail(email);
        if (!existingUser) {
            return this.userRepoitory.createUser(createUserDto);
        }
        else {
            throw new common_1.ConflictException("User already exist");
        }
    }
    async login(loginUserDto) {
        const { email, password } = loginUserDto;
        const user = await this.userRepoitory.findUserByEmail(email.toLocaleLowerCase());
        if (!user) {
            throw new common_1.NotFoundException("User not Found!");
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException("Incorrect Password");
        }
        const userData = {
            id: user.id,
            email: user.email,
            name: user.email,
        };
        const login_Time = new Date().toLocaleString();
        const token = await this.jwtService.signAsync(userData);
        return {
            ...userData,
            token
        };
    }
};
exports.UserService = UserService;
exports.UserService = UserService = UserService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_repository_1.UserRepository,
        jwt_1.JwtService])
], UserService);
//# sourceMappingURL=user.service.js.map