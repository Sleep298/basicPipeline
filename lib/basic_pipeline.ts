#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { BasicPipelineStack } from './basic_pipeline-stack';

const app = new cdk.App();
new BasicPipelineStack(app, 'BasicPipelineStack', {});

app.synth()