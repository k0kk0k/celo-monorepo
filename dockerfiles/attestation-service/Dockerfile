FROM node:10
WORKDIR /celo-monorepo

# ensure yarn.lock is evaluated by kaniko cache diff
COPY lerna.json package.json yarn.lock ./
COPY scripts/ scripts/
COPY patches/ patches/

# Copy only pkg.json
COPY packages/base/package.json packages/base/
COPY packages/utils/package.json packages/utils/
COPY packages/typescript/package.json packages/typescript/
COPY packages/dev-utils/package.json packages/dev-utils/
COPY packages/protocol/package.json packages/protocol/
COPY packages/contractkit/package.json packages/contractkit/
COPY packages/attestation-service/package.json packages/attestation-service/
COPY packages/flake-tracker/package.json packages/flake-tracker/package.json

RUN yarn install --frozen-lockfile --network-timeout 100000 && yarn cache clean

# Copy the rest
COPY packages/base packages/base/
COPY packages/utils packages/utils/
COPY packages/typescript packages/typescript/
COPY packages/dev-utils packages/dev-utils/
COPY packages/protocol packages/protocol/
COPY packages/contractkit packages/contractkit/
COPY packages/attestation-service packages/attestation-service/
COPY packages/flake-tracker packages/flake-tracker

ENV NODE_ENV production

# build all
RUN yarn build

WORKDIR /celo-monorepo/packages/attestation-service
ENTRYPOINT ["node", "lib/index.js"]
