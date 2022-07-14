import { pipelines, SecretValue, Stack, StackProps } from 'aws-cdk-lib';
import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { MyPipelineAppStage } from './my-pipeline-app-stage';

// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class BasicPipelineStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

  // new BasicPipeline(this, 'myBasicPipeline', {pipelineName: 'basicPipeline'})

   const  basicPipeline  = new pipelines.CodePipeline(this, 'Pipeline', {
    pipelineName: 'MyPipeline',
    synth: new pipelines.ShellStep('Synth', {
        input: pipelines.CodePipelineSource.gitHub('Sleep298/basicPipeline', 'main', {authentication: SecretValue.secretsManager("GitHub-token")}),
        commands: ['npm ci', 'npm run build', 'npx cdk synth']
    })     
});

    const applcationStage = basicPipeline.addStage(new MyPipelineAppStage(this, "test", {}));
    applcationStage.addPost(new pipelines.ManualApprovalStep('approval'))
    
  }
}
