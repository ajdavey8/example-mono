import { randomUUID } from "crypto";
import nock from "nock";
import { APIGatewayProxyEvent } from "aws-lambda";
import { parsedApiGatewayProxyEvent } from "@shieldpay/backend-testing/factories";
import { testDb } from "@shieldpay/db";
import { controller } from "../../../src/handler/api/create-partner";
import { CreatePartnerResponse } from "../../../src/api";
import { PartnerDetailsDbRecord } from "../../../src/data-access/types";

const requestId = randomUUID();
const displayName = "Display Name";
const requestBody = {
  fullLegalName: "company name",
  displayName,
};

describe("golden service: create partner", () => {
  beforeEach(() => {
    nock.disableNetConnect();
    nock("https://secretsmanager.eu-west-1.amazonaws.com:443")
      .post("/")
      .times(2)
      .reply(201, {
        SecretString: JSON.stringify(testDb.SECRETS_MANAGER_DB_CONFIG),
      });
  });

  afterEach(async () => {
    nock.cleanAll();
    return testDb.clean(["migrations"]);
  });

  afterAll(async () => {
    return testDb.destroy();
  });

  test("creates and returns a partner for valid payload", async () => {
    const event = parsedApiGatewayProxyEvent.build({
      body: requestBody,
      requestContext: { requestId },
    });

    const response = await controller(event as unknown as APIGatewayProxyEvent);

    const parsedResponseBody = JSON.parse(
      response.body
    ) as CreatePartnerResponse;

    const createdPartner = await testDb
      .db<PartnerDetailsDbRecord>("partners")
      .where("id", parsedResponseBody.id)
      .first();

    expect(response.statusCode).toEqual(201);

    expect(parsedResponseBody).toEqual({
      id: createdPartner?.id,
      fullLegalName: createdPartner?.full_name,
      displayName: createdPartner?.display_name,
    });
  });

  test("throws error if transaction errors", async () => {
    const invalidRequest = {
      ...requestBody,
      // displayName should not be null, DB will throw an error
      displayName: null,
    };
    const event = parsedApiGatewayProxyEvent.build({
      body: invalidRequest,
      requestContext: { requestId },
    });

    await expect(
      controller(event as unknown as APIGatewayProxyEvent)
    ).rejects.toThrow();

    const createdPartnerRecords = await testDb
      .db<PartnerDetailsDbRecord>("partners")
      .select("*");

    expect(createdPartnerRecords.length).toEqual(0);
  });
});
