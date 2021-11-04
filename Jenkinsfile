pipeline {
  environment {
        DEPLOY = "true"
        NAME = "moshaveran"
        REGISTRY = 'omiddagala/moshaveran_front'
        REGISTRY_CREDENTIAL = 'DOKCER_HUB_ID'
        app = ''
    }
   agent any

    tools {  
    jdk 'openjdk-11'  
    maven 'mvn-3.8.3'  
    }

   stages {
      stage('Checkout') {
         steps {
            script {
               git url: 'https://gitlab.com/omidjavaheri/moshaveran.git', credentialsId: 'GITLAB_ID'
            }
         }
      }
      stage('Docker Build') {
            when {
                environment name: 'DEPLOY', value: 'true'
            }
            steps {
                script {
                    app = docker.build "${REGISTRY}:${BUILD_NUMBER}"
                }
            }
        }
        stage('Docker Publish') {
            when {
                environment name: 'DEPLOY', value: 'true'
            }
            steps {
                script {
                    docker.withRegistry('https://registry.hub.docker.com', "${REGISTRY_CREDENTIAL}") {            
                        app.push()            
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
                    sh "helm upgrade --install --force --set app.image.tag=${VERSION} ${NAME} ./helm"
                }
            }
        }
   }
}
