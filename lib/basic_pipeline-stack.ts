import { pipelines, SecretValue, Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { BasicPipeline } from './constructs/BasicPipeline';

// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class BasicPipelineStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

   // new BasicPipeline(this, 'myBasicPipeline', {pipelineName: 'basicPipeline'})

   const pipeline = new pipelines.CodePipeline(this, 'Pipeline', {
    pipelineName: 'MyPipeline',
    synth: new pipelines.ShellStep('Synth', {
        input: pipelines.CodePipelineSource.gitHub('Sleep298/basicPipeline', 'main', {authentication: SecretValue.secretsManager("GitHub-token")}),
        commands: ['npm ci', 'npm run build', 'npx cdk synth']
    })     
});

    
  }
}
