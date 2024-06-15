import { Cognito, StackContext, use } from "sst/constructs";
import { ApiStack } from "./ApiStack";

export function AuthStack({ stack, app }: StackContext) {
  const { api } = use(ApiStack);

  // cognito
  const auth = new Cognito(stack, "Auth", {
    login: ["email"],
  });

  // policy
  auth.attachPermissionsForAuthUsers(stack, [api]);

  // outputs
  stack.addOutputs({
    region: app.region,
    userPoolId: auth.userPoolId,
    userPoolClientId: auth.userPoolClientId,
    identityPoolId: auth.cognitoIdentityPoolId,
  });
}
