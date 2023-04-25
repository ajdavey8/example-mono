# This should be used as a checklist for the production sign off meeting.

- **Release candidate contains only and all required features.**
  We can analyze the release changelog to review the changes included in the upcoming release.

- **Deploy to stage has passed successfully.**

  All unit and integration tests have passed. The coverage metrics grant a high level of confidence.

- **Smoke test was run on stage and received desired behavior.**

  We can also monitor how services performed during the smoke test.
  Lambda metrics like Errors, Invocations, Duration can be noticed in AWS console.
