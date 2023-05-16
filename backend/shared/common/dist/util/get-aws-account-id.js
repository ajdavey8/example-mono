"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAWSAccountId = void 0;
const client_sts_1 = require("@aws-sdk/client-sts");
/**
 * Returns the AWS account id for the current default AWS credentials
 * configured for the environment. For example:
 *
 *    - if this is called in a Lambda the account id would be the same account
 *      the Lambda is located int.
 *    - if this is called locally in a test this would return the account id
 *      associated with the credentials configured in your AWS CLI
 *      (~/.aws/credentials file)
 */
const getAWSAccountId = async () => {
    const response = await new client_sts_1.STSClient({}).send(new client_sts_1.GetCallerIdentityCommand({}));
    return String(response.Account);
};
exports.getAWSAccountId = getAWSAccountId;
//# sourceMappingURL=get-aws-account-id.js.map