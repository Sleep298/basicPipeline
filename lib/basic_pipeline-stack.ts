import { Stack, StackProps } from 'aws-cdk-lib';
import { CodePipeline, CodePipelineSource, ShellStep } from 'aws-cdk-lib/pipelines';
import { Construct } from 'constructs';
import { BasicPipeline } from "./BasicPipeline";
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class BasicPipelineStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    //new BasicPipeline(this, 'myBasicPipeline', {pipelineName: 'basicPipeline'})

    const pipeline = new CodePipeline(this, 'Pipeline', {
      pipelineName: 'MyPipeline',
      synth: new ShellStep('Synth', {
        input: CodePipelineSource.gitHub('Sleep298/basicPipeline', 'main'),
        commands: ['npm ci', 'npm run build', 'npx cdk synth']
      })
    });

    
  }
}
