@echo off
setlocal

REM Define project name, image tag, and container name
set PROJECT_NAME=tutt-client-staging
set IMAGE_NAME=tutt-client-staging1.0
set TAG=latest
set CONTAINER_NAME=tutt-client-staging-container
set REPOSITORIES_NAME=0818913406/tuttdocker:tutt-client-staging1.0

REM Navigate to the project directory
cd /d "%~dp0"

REM Build the Docker image
echo Building the Docker image...
docker build -f Dockerfile.staging -t %IMAGE_NAME% .

REM Stop and remove any existing container with the same name
echo Stopping and removing any existing container...
docker stop %CONTAINER_NAME%
docker rm %CONTAINER_NAME%

REM Run the Docker container
echo Running the Docker container...
docker run -d -p 9090:80 --name %CONTAINER_NAME% %IMAGE_NAME%

REM Create Tag the Docker Hub
echo Running create tag the Docker Hub...
docker tag %IMAGE_NAME%:%TAG% %REPOSITORIES_NAME%

REM Push image the Docker Hub
echo Running the Docker Hub...
docker push %REPOSITORIES_NAME%

echo Build and run process completed.

endlocal
pause