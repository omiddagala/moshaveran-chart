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
            yamlFile 'gitlab-agent.yaml'
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
                    sh 'helm repo add omid https://omiddagala.github.io/moshaveran-chart/charts'
                    sh 'helm upgrade --install --force --set app.image.tag="${BUILD_NUMBER}" "${NAME}" omid/moshaveran'
                }
            }
        }
   }
}
