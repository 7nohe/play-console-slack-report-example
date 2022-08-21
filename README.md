# play-console-slack-report-example

## Setup for GitHub Actions

Set [secrets](https://docs.github.com/ja/actions/security-guides/encrypted-secrets) listed in .env.example to your project.

## Run locally

```bash
$ npm install
$ cp .env.example .env
# set environment variables in .env
$ direnv allow .
$ npm run notify
```
