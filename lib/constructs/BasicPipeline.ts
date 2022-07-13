import { aws_codepipeline, pipelines } from "aws-cdk-lib";
import { Pipeline } from "aws-cdk-lib/aws-codepipeline";
import { CodePipelineSource, ShellStep, CodePipeline } from "aws-cdk-lib/pipelines";
import { Construct } from "constructs";

export interface IBasicPipeline {
    pipelineName: string,
}

export class BasicPipeline extends Construct {

    private basicPipeline : pipelines.CodePipeline
    private pipelineSourceArtifact : aws_codepipeline.Artifact

    constructor(scope: Construct, id: string, props: IBasicPipeline) {
        super(scope, id);
    
        this.basicPipeline = new pipelines.CodePipeline(this, props.pipelineName, {
            pipelineName: props.pipelineName,
            synth: new pipelines.ShellStep('Synth', {
                input: pipelines.CodePipelineSource.gitHub('Sleep298/basicPipeline', 'main'),
                commands: ['npm ci', 'npm run build', 'npx cdk synth']
            })     
        });


      }
}