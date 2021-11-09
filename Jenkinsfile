pipeline {
  environment {
        DEPLOY = "true"
        NAME = "moshaveran"
        REGISTRY = 'omiddagala/moshaveran_front'
        REGISTRY_CREDENTIAL = 'DOKCER_HUB_ID'
        app = ''
    }
   agent {
        kubernetes {
            defaultContainer 'jnlp'
            yamlFile 'jenkins-agent.yaml'
        }
    }

   stages {
      stage('Checkout') {
         steps {
            script {
               git url: 'https://gitlab.com/omidjavaheri/moshaveran-front.git', credentialsId: 'GITLAB_ID'
            }
         }
      }
      stage('Docker Build') {
            when {
                environment name: 'DEPLOY', value: 'true'
            }
            steps {
                container('docker') {
                    script {
                        app = docker.build "${REGISTRY}:${BUILD_NUMBER}"
                    }
                }
            }
        }
        stage('Docker Publish') {
            when {
                environment name: 'DEPLOY', value: 'true'
            }
            steps {
                container('docker') {
                    script {
                        docker.withRegistry('https://registry.hub.docker.com', "${REGISTRY_CREDENTIAL}") {            
                            app.push()            
                        }  
                    }  
                }
            }
        }
        stage('Kubernetes Deploy') {
            when {
                environment name: 'DEPLOY', value: 'true'
            }
            steps {
                    sh 'curl -fsSL -o get_helm.sh https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3'
                    sh 'chmod 700 get_helm.sh'
                    sh './get_helm.sh'
                    sh 'helm upgrade --force --set app.image.tag="${BUILD_NUMBER}" "${NAME}" omid/moshaveran'
            }
        }
   }
}
