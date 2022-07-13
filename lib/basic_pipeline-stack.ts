import { pipelines, SecretValue, Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { BasicPipeline } from './constructs/BasicPipeline';

// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class BasicPipelineStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

   new BasicPipeline(this, 'myBasicPipeline', {pipelineName: 'basicPipeline'})



    
  }
}
