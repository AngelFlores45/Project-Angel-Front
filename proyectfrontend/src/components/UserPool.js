import { CognitoUserPool } from "amazon-cognito-identity-js";
const poolData = {
UserPoolId: "us-east-1_yGgs5zYcv",
ClientId: "22blqn2vvb81rgt44ctktls2ob"
}
export default new CognitoUserPool(poolData);