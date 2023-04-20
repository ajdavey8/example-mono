# Certificates

The API Facade requires clients to include a signed certificate in every API request. The certificate is used to establish a Mutual TLS connection, and to verify the digital signature of the request.

## Generating a new certificate for testing purposes

We have a set of test users and associated certificates set up in all of our AWS environments, but every now and then you may need to generate a new certificate, e.g., if one expires, or we want to set up a new environment.
