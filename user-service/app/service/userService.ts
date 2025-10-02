import { Profile } from "./../handlers/userHandler";
import { ErrorResponse, SuccessResponse } from "../utility/response";
import { APIGatewayProxyEventV2 } from "aws-lambda";
import { autoInjectable } from "tsyringe";
import { UserRepository } from "../repository/userRepository";
import { plainToClass } from "class-transformer";
import { getHashedPassword, getSalt } from "../utility/password";
import { AppValidationError } from "../utility/errors";
import { SignupInput } from "../models/dto/SignupInput";

@autoInjectable()
export class UserService {
  repository: UserRepository; // Assume UserRepository is defined elsewhere
  constructor(repository: UserRepository) {
    this.repository = repository;
  }

  async createUser(event: APIGatewayProxyEventV2) {
    try {
      const input = plainToClass(SignupInput, event.body);
      const error = await AppValidationError(input);
      if (error) return ErrorResponse(404, error);

      const salt = await getSalt();
      const hashedPassword = await getHashedPassword(input.password, salt);
      const data = await this.repository.createAccount({
        email: input.email,
        password: hashedPassword,
        phone: input.phone,
        userType: "BUYER",
        salt: salt,
      });

      return SuccessResponse(data);
    } catch (error) {
      console.log(error);
      return ErrorResponse(500, error);
    }
  }

  async UserLogin(event: APIGatewayProxyEventV2) {
    return SuccessResponse({ message: "User logged in successfully" });
  }

  async VerifyUser(event: APIGatewayProxyEventV2) {
    return SuccessResponse({ message: "User verified successfully" });
  }

  // User Profile
  async CreateProfile(event: APIGatewayProxyEventV2) {
    return SuccessResponse({ message: "User profile created successfully" });
  }

  async GetProfile(event: APIGatewayProxyEventV2) {
    return SuccessResponse({ message: "User profile fetched successfully" });
  }

  async UpdateProfile(event: APIGatewayProxyEventV2) {
    return SuccessResponse({ message: "User profile updated successfully" });
  }

  // Cart Section
  async CreateCart(event: APIGatewayProxyEventV2) {
    return SuccessResponse({ message: "User cart created successfully" });
  }

  async GetCart(event: APIGatewayProxyEventV2) {
    return SuccessResponse({ message: "User cart fetched successfully" });
  }

  async UpdateCart(event: APIGatewayProxyEventV2) {
    return SuccessResponse({ message: "User cart updated successfully" });
  }

  // Payment Section
  async CreatePayment(event: APIGatewayProxyEventV2) {
    return SuccessResponse({ message: "User payment created successfully" });
  }

  async GetPayment(event: APIGatewayProxyEventV2) {
    return SuccessResponse({ message: "User payment fetched successfully" });
  }

  async UpdatePayment(event: APIGatewayProxyEventV2) {
    return SuccessResponse({ message: "User payment updated successfully" });
  }
}
