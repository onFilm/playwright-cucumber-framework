pipeline {
    agent {
        docker {
            // Using the official Playwright image which includes Node.js and all browser dependencies
            image 'mcr.microsoft.com/playwright:v1.44.0-jammy'
            args '--ipc=host'
        }
    }
    
    stages {
        stage('Checkout & Install') {
            steps {
                checkout scm
                sh 'npm ci'
                // K6 installation for performance tests (since we run this inside the Playwright container)
                sh 'sudo apt-get update && sudo apt-get install -y ca-certificates gnupg2 && sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys C5AD17C747E3415A3642D57D77C6C491D6AC1D69 && echo "deb https://dl.k6.io/deb stable main" | sudo tee /etc/apt/sources.list.d/k6.list && sudo apt-get update && sudo apt-get install -y k6'
            }
        }

        stage('Run V1 Legacy Tests') {
            steps {
                catchError(buildResult: 'UNSTABLE', stageResult: 'FAILURE') {
                    sh 'npm run test'
                }
            }
        }

        stage('Run V2 Core UI & API Tests') {
            steps {
                parallel(
                    "V2 UI Tests": {
                        catchError(buildResult: 'UNSTABLE', stageResult: 'FAILURE') {
                            sh 'npm run test:v2:ui'
                        }
                    },
                    "V2 API Tests": {
                        catchError(buildResult: 'UNSTABLE', stageResult: 'FAILURE') {
                            sh 'npm run test:v2:api'
                        }
                    }
                )
            }
        }

        stage('Run V2 Performance Tests') {
            steps {
                catchError(buildResult: 'UNSTABLE', stageResult: 'FAILURE') {
                    sh 'npm run test:v2:perf'
                }
            }
        }
    }
    
    post {
        always {
            // Archive Allure Reports
            sh 'npm run allure:generate || true'
            allure includeProperties: false, jdk: '', results: [[path: 'reports/allure-results']]
            
            // Archive K6 HTML Report
            archiveArtifacts artifacts: 'artifacts/k6-report.html', allowEmptyArchive: true
            
            // Archive Playwright failure traces
            archiveArtifacts artifacts: 'test-results/**/*', allowEmptyArchive: true
        }
    }
}