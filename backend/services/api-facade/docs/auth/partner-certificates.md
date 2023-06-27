# Partner Certificates

The API Facade requires partners to include a signed certificate in every API request. The certificate is used to establish a Mutual TLS connection, and to verify the digital signature of the request.

## Generating a new partner certificate for testing purposes

We have a set of test users and associated certificates set up in all of our AWS environments, but every now and then you may need to generate a new certificate, e.g., if one expires, we want to set up a new environment, or we're setting up a new testing partner.

If you ever need to generate a new certificate for a partner for development or testing purposes, follow the steps below.

**1. Generate a private key**

This will be used to generate your certificate and public key, and will also be used to sign requests to the API.

```
openssl genrsa -out {key-name}.key 2048
```

e.g.:

```
openssl genrsa -out testpartner-dev-private-key.key 2048
```

**2. Generate a CSR using your private key**

```
openssl req -new -key testpartner-dev-private-key.key -out testpartner-dev.csr
```

You'll be prompted to enter details for your certificate. With the exception `Organization Name`, it doesn't matter too much what you enter here. For `Organization Name`, enter the organisation's id, which is the id of the orgnaisation in the [Heritage platform](./setting-partner-up-in-heritage.md). **DO NOT enter a password**.

```
You are about to be asked to enter information that will be incorporated
into your certificate request.
What you are about to enter is what is called a Distinguished Name or a DN.
There are quite a few fields but you can leave some blank
For some fields there will be a default value,
If you enter '.', the field will be left blank.
-----
Country Name (2 letter code) []:GB
State or Province Name (full name) []:London
Locality Name (eg, city) []:London
Organization Name (eg, company) []:61648422-eb09-4538-af2b-f77ab6e25d90
Organizational Unit Name (eg, section) []:Test Partner Dev
Common Name (eg, fully qualified host name) []:Test Partner Dev
Email Address []:smears@shieldpay.com

Please enter the following 'extra' attributes
to be sent with your certificate request
A challenge password []:
```

\*_3. Sign your CSR_

Once you've generated your CSR, you'll need to sign it using Shieldpay's Certificate Authority. You can do this using the Private API. To sign the request, make a `POST` request to the `/certificate` endpoint on the Private API.

Before you can make the requests to the Private APU, you'll need to be on the Shieldpay VPN, and you'll need the API key. You can find the API key by logging into AWS, going to API Gateway, selecting the `	api-facade--private-api--{env}` API, and the clicking `API Keys`.

Here's an example curl request.

```bash
curl -X POST \
-H "Content-Type: application/json" \
-H "X-API-KEY: {api-key}" \
-d "{\"csr\": \"-----BEGIN CERTIFICATE REQUEST-----\nMIIE/zCCAucCAQAwgbkxCzAJBgNVBAYTAkdCMQ8wDQYDVQQIDAZMb25kb24xDzAN\nBgNVBAcMBkxvbmRvbjEtMCsGA1UECgwkMDYwZmJiODMtOTFkYy00NGNiLThkYWMt\nOTU4ZGUyZTVmMjNkMRIwEAYDVQQLDAlTaGllbGRwYXkxHzAdBgNVBAMMFlNoaWVs\nZHBheSBUZXN0IFBhcnRuZXIxJDAiBgkqhkiG9w0BCQEWFWRldnRlYW1Ac2hpZWxk\ncGF5LmNvbTCCAiIwDQYJKoZIhvcNAQEBBQADggIPADCCAgoCggIBAOGFlaQeQ6ob\nwFfwfivzN/RvXwxCNoPCZkaRFNqotrRQJB93HAX9Dmb25K1Tsh+EoF8zt6Byro1M\nRi+8EKxRH9R71V1C1OQdAimSDma8eOyf2c8gWNjtWTEbigu4CL0YWK+iGVWYaGVM\nhWoc35yb9G+ldLKQwolpsHxXcMXvNCVkweRB6LYWVj4JZiThRqTFJz4fQ5EreOEc\nmoqotUUhvybVglCff5jbz3nCBHli66wi75qanPCVSH0AZmpRyCq7/KKzr2gWfUvq\n/8jX/tAz0ZY3OunCMkiT+rugRb2+BzNFW/9E9evsc3pMTFI9m3JA0BpGr9ubDGUI\n6w6h8pZwc8TvgmLaI5yR05KOn267suLbeQa76Sss7zQI/Lw8kkuphRecvTUR2f63\n6/tEUxdEeTATKAcKxwOjb2/BU4sazSG/v0FmW01OHUOtCwVlhMTfzTrtmfKSdtAF\nwdf/dIN37iDZt5lSqPWlLE1svABBDx1SsavlViqrHUe8ZX279/ftcro9IwEaYGcI\nrQs2hWmiSvPANyUR+CMWAOqUYN1UJlpYhDKsC+V9t9xN0Y6vPu0iUJn+h7OO8jsa\nxcVdELpsiix2aXjgh9b1bHg7nW1n90uYi1i2gFGgy/V8XnENiCoTbsg4neyOwWQL\npxGONEW3rmsxgDZkFpr10AOTm89f34kzAgMBAAGgADANBgkqhkiG9w0BAQsFAAOC\nAgEAETd9H3JJnDx+whiosdGZa9du8pwVYH+MJKBzcEK6AIDsZxHWya1HrePU6+iu\nNcEk+X3t2g8G+uWWxBG0KMo7wH4DpQW0R6zx5xBr2r0289cXPwbzPmOa4Kh3NPc+\nH14gdyi+TNohxpz4GcGne4ugf4asqSO3N618dk4U49KN5rbS57vwejdnHxlQ7sw9\nNuj465mzgAd+XJ5FOagO7jCMLgW0dC/MwsgmleLC7b/ljKZ7EX7ckhV/IXZ4UX+f\n/njVz1NiMgOo2z9ht6PVHT5AZGKawKWHSYNwj6MSZaC9PFIUucmkam75m+vV6I1s\n88vANwweEB4ekv91p61yzNcJyHhXkg60U9xKfpaaqopXYz7RcENm4az74P11bejo\noM2bhSl3vqexyXeEjANvvwjtaloPebP2EhhkgGDGWX1oaRcA2wUHrkFnWYg8y4sJ\njEqnZ0mP9alkpJNEFe0OeRQjWKYXp5dLfcLo1RGIU6H71+I+x6+gM+6cVQLrZ2GQ\nWmfsCCss1Gl3JINuWckPyKq0zV5dH20HklzcWoTDnH55iCS3MTWf4vM3vemqhOW0\nLAXuazJR6+QM2UcSe674h7c6th86iAIDwG0QqzvwQ6/jhK4XRRsSOdySbKDygz6Y\nni/Un43c7DvmU5vfjlHO6sql55TVPiAwM3xxTnWimcZGJb8=\n-----END CERTIFICATE REQUEST-----\"}" \
-o certificate.pem \
https://private.int.partner.shieldpay.com/certificate
```

The response will be a signed certificate, which you'll need to save as a `.pem` file.

**NOTES**

- Note the `-o` flag, which will automatically save response, which will be the signed certificate, to a file.
- The CSR value has to be all on one line (replace line breaks with `\n`). You can do this easily with the command `awk 'NF {sub(/\r/, ""); printf "%s\\n",$0;}' testpartner-dev.csr`