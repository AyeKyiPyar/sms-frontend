pipeline {
    agent any

    tools {
        nodejs 'node20'
    }

    environment {
        IMAGE_NAME = 'sms-frontend'
        IMAGE_TAG = 'latest'
        CONTAINER_NAME = 'sms-frontend-container'
    }

    stages {

        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/AyeKyiPyar/sms-frontend.git'
            }
        }

        stage('Build App') {
            steps {
                // 👉 For React
                sh 'npm install'
                sh 'npm run build'

                // 👉 For Spring Boot (use instead if backend)
                // sh 'mvn clean package -DskipTests'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t $IMAGE_NAME:$IMAGE_TAG .'
            }
        }

        stage('Stop Old Container') {
            steps {
                sh '''
                docker stop $CONTAINER_NAME || true
                docker rm $CONTAINER_NAME || true
                '''
            }
        }

        stage('Run Container') {
            steps {
                sh '''
                docker run -d ^
                  -p 5173:5173 ^
                  --name $CONTAINER_NAME ^
                  $IMAGE_NAME:$IMAGE_TAG
                '''
            }
        }
    }

    post {
        success {
            echo 'Docker Deployment SUCCESS ✅'
        }
        failure {
            echo 'Docker Deployment FAILED ❌'
        }
    }
}