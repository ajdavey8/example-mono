# Partner API Keys

All requests to the API will need to include an API key. You can generate an API key for a partner by making a `POST` request to the `/api-key` endpoint on the Private API.

Before you can make the requests to the Private API, you'll need to be on the Shieldpay VPN, and you'll need the API key. You can find the API key by logging into AWS, going to API Gateway, selecting the `	api-facade--private-api--{env}` API, and the clicking `API Keys`.

The payload for the request is:

```json
{
  "organisationId": "0f0bf008-826e-424e-a4be-bde8531cdb42",
  "hmacSecret": "my-hmac-secret"
}
```

The values for `organisationId` and `hmacSecret` come from the [Heritage platform](./setting-partner-up-in-heritage.md).

**Example Request**

```bash
curl -X POST \
-H "Content-Type: application/json" \
-H "X-API-KEY: {api-key}" \
-d "{\"organisationId\": \"organisation-uuid\", \"hmacSecret\": \"organisation-hmac-secret\"}" \
https://private.int.partner.shieldpay.com/certificate
```