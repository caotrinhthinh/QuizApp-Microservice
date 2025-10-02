import { ErrorResponse } from "../utility/response";
import { container } from "tsyringe";
import { UserService } from "../service/userService";
import { APIGatewayProxyEventV2 } from "aws-lambda";
import middy from "@middy/core";
import httpJsonBodyParser from "@middy/http-json-body-parser";
import httpErrorHandler from "@middy/http-error-handler";

const service = container.resolve(UserService);

export const Signup = middy((event: APIGatewayProxyEventV2) => {
  console.log("Event: ", event);
  return service.createUser(event);
})
  .use(httpJsonBodyParser())
  .use(httpErrorHandler());

export const Login = async (event: APIGatewayProxyEventV2) => {
  console.log("Event: ", event);
  return service.UserLogin(event);
};

export const Verify = async (event: APIGatewayProxyEventV2) => {
  console.log("Event: ", event);
  return service.VerifyUser(event);
};

export const Profile = async (event: APIGatewayProxyEventV2) => {
  console.log("Event: ", event);
  const httpMethod = event.requestContext.http.method.toLowerCase();
  if (httpMethod === "post") {
    return service.CreateProfile(event);
  } else if (httpMethod === "get") {
    return service.GetProfile(event);
  } else if (httpMethod === "put") {
    return service.UpdateProfile(event);
  } else {
    return ErrorResponse(404, { message: "Invalid HTTP Method" });
  }
};

export const Cart = async (event: APIGatewayProxyEventV2) => {
  console.log("Event: ", event);
  const httpMethod = event.requestContext.http.method.toLowerCase();
  if (httpMethod === "post") {
    return service.CreateCart(event);
  } else if (httpMethod === "get") {
    return service.GetCart(event);
  } else if (httpMethod === "put") {
    return service.UpdateCart(event);
  } else {
    return ErrorResponse(404, { message: "Invalid HTTP Method" });
  }
};

export const Payment = async (event: APIGatewayProxyEventV2) => {
  console.log("Event: ", event);
  const httpMethod = event.requestContext.http.method.toLowerCase();
  if (httpMethod === "post") {
    return service.CreatePayment(event);
  } else if (httpMethod === "get") {
    return service.GetPayment(event);
  } else if (httpMethod === "put") {
    return service.UpdatePayment(event);
  } else {
    return ErrorResponse(404, { message: "Invalid HTTP Method" });
  }
};
