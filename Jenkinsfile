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
        dockerTool 'mydocker'
        maven 'maven-3.8.3'
        jdk 'openjdk-11' 
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
                sh 'helm upgrade --install --force --set app.image.tag="${BUILD_NUMBER}" "${NAME}" /opt/moshaveran/helm'
            }
        }
   }
}
