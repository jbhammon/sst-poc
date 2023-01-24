# SST Proof-of-Concept

## Directory Structure

This project is made up of several parts, and so far follows opinions laid out by the SST docs.

### /stacks

The app infrastructure, created with AWS CDK and some constructs from SST.

### /services

Lambda function code for the API endpoints.

### /frontend

Next.js 12 app with Tailwind for styles.

## Local development

Start with `npm i` in the root for this project. This project uses `npm` workspaces\* so that command will install all the dependencies you need, which is controlled by the root-level `package.json`'s `workspaces` keyword.

To start a "local" development environment you can run `npx sst start` from the project root. You can provide a specific AWS CLI profile with that command if you'd like.

If this is the first time you run the command, then it will ask for a name for the environment and then deploy lots of resources for two sets of stacks:

- One set of stacks for this application
- One set of stacks to facilitate local development and debugging

With that command run, the backend resources will be available to check out through the SST console at [sst.console.dev](sst.console.dev).

After that, you can start the Next app, if need be. From the `/frontend` directory run `npm run dev`, and the app should be available at [localhost:3000](http://localhost:3000).

\*The SST framework doesn't seem to play nice with `pnpm` yet, but the maintainers say there are changes coming with v2 to change that. When upgrading to v2 it should be possible to consider using `pnpm` rather than `npm` workspaces.

## Deployment

From the root of the project run `npx deploy --stage <stage_name>`, where `<stage_name>` is whatever you'd like your stage to be called (e.g. "prod").

## Tear down

To remove the local dev resources you've deployed you can run `npx sst remove`. To remove any resources you've deployed with `deploy` you can run `npx sst remove --stage <stage_name>`.

## Notes & Lessons Learned

### Telemetry

The SST framework collects some basic, anonymous telemetry data. You can opt out with `npx sst telemetry disable`.

### Secrets and env variables

This framework uses a similar approach to env variables and `.env` file names that `create-react-app` does.

It doesn't seem to mention anything about using AWS Secrets Manager, so that's something for us to figure out on our own. Luckily we can drop down into the cdk to do that if need be.

### Next

The SST framework doesn't seem ready to work with the latest version of Next, 13, and I had to manually tweak things from the `npx create-next-app` command to downgrade to version 12. Then deploying things went smoothly.

### CI/CD with Seed

Overall, this service works great out-of-the-box with SST apps. It detected lots of our project configuration automatically, didn't require creating any build scripts/files, and with a few clicks you get:

- A "dev" stage that's deployed to on pushes to the "main" branch
- The correct install, build, and test scripts all being run as part of deploying to a stage
- A "prod" stage you can deploy to by manually promoting changes that have deployed to "dev"
- A "changeset" summary of all the changes to AWS resources you'll be making when you promote to "prod" (probably just a pretty output of a `cdk diff` command)

It's pretty simple through Seed's UI to create new stages and update how changes move through them. I'm not a CI/CD expert so it's hard to say what complex or unique workflows Seed can support, but for a simple "dev", "staging", and "prod" setup it seems like a solid tool.

We're even able to see the AWS resources in each stage, and check their logs and monitoring metrics.
