# Certificate Authority

We use our own self managed Certificate Authority (CA) to sign our Partner's certificates and validate them when establishing a MutualTLS connection.

## Creating a CA for Non-Prod Environments

For all environments other than Production, the certificate authority is generated locally on a developer's machine using Open SSL. If you ever need to create a new CA, for example when deploying a new environment, follow the steps below.

**1. Generate the CA private key**

```bash
openssl genrsa -out RootCA.key 4096
```

**1. Generate the CA certificate**

```bash
openssl req -new -x509 -days 3650 -key RootCA.key -out RootCA.pem
```

You'll be prompted to enter details for your certificate. It doesn't really matter what you enter for these values.

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
Organization Name (eg, company) []:Shieldpay
Organizational Unit Name (eg, section) []:
Common Name (eg, fully qualified host name) []:Shieldpay
Email Address []:devteam@shieldpay.com
```

## Uploading the CA to AWS

The private key should be uploaded to AWS Secrets Manager. You can do this by updating the secret called `/cdk/api-facade/ROOT_CA_PRIVATE_KEY`.

If you're deploying a new environment you'll need to create the secret manually. You can do this by:

1. Create a new secret with the name `/cdk/api-facade/ROOT_CA_PRIVATE_KEY`.
2. Use the description `Private key for our Root Certificate Authority. This is used to sign partner's CSRs so we can establish a Mutual TLS connection.`.
3. Set the secret value as the private key, and store it as a plain text value.

The certificate should be uploaded to AWS Parameter Store. You can do this by updating the parameter called `/cdk/api-facade/ROOT_CA_CERTIFICATE`.

If you're deploying a new environment you'll need to create the parameter manually. You can do this by:

1. Create a new parameter with the name `/cdk/api-facade/ROOT_CA_CERTIFICATE`.
2. Use the description `Public Key and certificate for our Root Certificate Authority. This is used to sign partner's CSRs so we can establish a Mutual TLS connection.`.
3. Set the parameter value as the certificate, and store it as a plain text value, using the `string` -> `text` data type.

## Creating a CA for Production Environment

🎯 TODO