import { aws_codepipeline, pipelines, SecretValue } from "aws-cdk-lib";
import { Construct } from "constructs";

export interface IBasicPipeline {
    pipelineName: string,
}

export class BasicPipeline extends Construct {

    private basicPipeline : pipelines.CodePipeline
    private pipelineSourceArtifact : aws_codepipeline.Artifact

    constructor(scope: Construct, id: string, props: IBasicPipeline) {
        super(scope, id);
    
        this.basicPipeline  = new pipelines.CodePipeline(this, 'Pipeline', {
            pipelineName: 'MyPipeline',
            synth: new pipelines.ShellStep('Synth', {
                input: pipelines.CodePipelineSource.gitHub('Sleep298/basicPipeline', 'main', {authentication: SecretValue.secretsManager("GitHub-token")}),
                commands: ['npm ci', 'npm run build', 'npx cdk synth'],
                primaryOutputDirectory: 'cdk.out'
            })     
        });


      }
}