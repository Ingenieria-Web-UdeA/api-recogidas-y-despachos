#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { BackStack } from '../lib/back-stack';
import { ACCOUNT, REGION } from '../config';

const app = new cdk.App();
new BackStack(app, 'RecogidasYDespachosApi', {
  env: { account: ACCOUNT, region: REGION },
});
