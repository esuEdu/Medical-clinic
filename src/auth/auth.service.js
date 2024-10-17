import AWS from "aws-sdk";
import dotenv from "dotenv";
dotenv.config();

async function login(payload) {
  const cognito = new AWS.CognitoIdentityServiceProvider();

  const params = {
    AuthFlow: "ADMIN_NO_SRP_AUTH",
    UserPoolId: process.env.COGNITO_USER_POOL_ID,
    ClientId: process.env.COGNITO_CLIENT_ID,
    AuthParameters: {
      USERNAME: payload.email,
      PASSWORD: payload.password,
    },
  };

  const response = await cognito.adminInitiateAuth(params).promise();
  console.log(response);
  const data = await cognito
    .getUser({
      AccessToken: response.AuthenticationResult.AccessToken,
    })
    .promise();

  return {
    data: data,
    accessToken: response.AuthenticationResult.AccessToken,
  };
}

async function register(payload) {
  const cognito = new AWS.CognitoIdentityServiceProvider();

  const params = {
    UserPoolId: process.env.COGNITO_USER_POOL_ID,
    Username: payload.email,
    UserAttributes: [
      {
        Name: "email",
        Value: payload.email,
      },
      {
        Name: "email_verified",
        Value: "true",
      },
    ],
    MessageAction: "SUPPRESS",
  };

  try {
    // Create the user in Cognito
    await cognito.adminCreateUser(params).promise();

    await cognito
      .adminSetUserPassword({
        UserPoolId: process.env.COGNITO_USER_POOL_ID,
        Username: payload.email,
        Password: payload.password,
        Permanent: true,
      })
      .promise();

    // Add the user to the group
    await cognito
      .adminAddUserToGroup({
        UserPoolId: process.env.COGNITO_USER_POOL_ID,
        Username: payload.email,
        GroupName: payload.group,
      })
      .promise();

    console.log("Successfully created user in Cognito");

    return;
  } catch (error) {
    throw new Error(`Error creating user in Cognito: ${error.message}`);
  }
}

export default {
  login,
  register,
};
