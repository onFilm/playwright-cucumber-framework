pipeline {
    agent any
    stages {
        stage('build') {
            steps {
                script {
                    docker.image("node:18.16.0-alpine").inside("--entrypoint ''") {
                        sh "node --version"
                    }
                }
            }
        }
    }
}