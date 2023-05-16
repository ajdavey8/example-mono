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
export declare const getAWSAccountId: () => Promise<string>;
