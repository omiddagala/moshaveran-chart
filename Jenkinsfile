pipeline {
  environment {
        DEPLOY = "${env.BRANCH_NAME == "master" || env.BRANCH_NAME == "develop" ? "true" : "false"}"
        NAME = "moshaveran"
        REGISTRY = 'omiddagala/moshaveran_front'
        REGISTRY_CREDENTIAL = 'DOKCER_HUB_ID'
        app = ''
    }
   agent {
        kubernetes {
            inheritFrom 'jenkins-slave'
            defaultContainer 'jnlp'
            yamlFile 'jenkins_agent.yaml'
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
                container('helm') {
                    sh 'helm upgrade --install --force --set app.image.tag="${VERSION}" "${NAME}" /opt/moshaveran/helm'
                }
            }
        }
   }
}
