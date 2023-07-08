pipeline {
    agent any
    stages {
        stage('build') {
            steps {
                docker.image("node:18.16.0-alpine").inside("--entrypoint ''") {
                    sh "node --version"
                }
            }
        }
    }
}