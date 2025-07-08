pipeline {
    agent any

    environment {
        BACKEND_IMAGE = "chat-backend"
        FRONTEND_IMAGE = "chat-frontend"
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/snaxy318/realtime-chat-app.git'
            }
        }

        stage('Install & Test Backend') {
            steps {
                dir('backend') {
                    sh 'npm install'
                    sh 'npm test'
                }
            }
        }

        stage('Install & Build Frontend') {
            steps {
                dir('frontend') {
                    sh 'npm install'
                    sh 'npm run build'
                }
            }
        }

        stage('Build Docker Images') {
            steps {
                sh 'docker build -t ${BACKEND_IMAGE} -f Dockerfile.backend .'
                sh 'docker build -t ${FRONTEND_IMAGE} -f Dockerfile.frontend .'
            }
        }

        stage('Docker Compose (optional test)') {
            steps {
                sh 'docker compose up -d'
            }
        }

        stage('Terraform Init & Apply') {
            steps {
                dir('ec2-terraform') {
                    sh 'terraform init'
                    sh 'terraform apply -auto-approve'
                }
            }
        }

        stage('Ansible Provisioning') {
            steps {
                dir('ansible') {
                    sh 'sleep 60'
                    sh 'ansible-playbook -i inventory.ini playbook.yml'
                }
            }
        }
    }

    post {
        always {
            echo '🧹 Cleaning up containers...'
            sh 'docker compose down || true'
        }
        success {
            echo '✅ Chat app pipeline completed successfully.'
        }
        failure {
            echo '❌ Chat app pipeline failed.'
        }
    }
}
