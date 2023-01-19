# SST Proof-of-Concept

## Layout

This project is made up of several parts, and so far follows opinions laid out by the SST docs.

### Stacks

The app infrastructure, created with AWS CDK

### Services

Lambda function code and such

### Frontend

Frontend that's to come

## Notes & Lessons Learned

### Telemetry

The SST framework collects some basic, anonymous telemetry data. You can opt out with `npx sst telemetry disable`

### Secrets and env variables

This framework uses a similar approach to env variables and `.env` file names that `create-react-app` does.

It doesn't seem to mention anything about using AWS Secrets Manager, so that's something for us to figure out on our own. Luckily we can drop down into the cdk to do that if need be.
