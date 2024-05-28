@echo off
setlocal

REM Define project name, image tag, and container name
set PROJECT_NAME=tutt-client-production
set IMAGE_NAME=tutt-client:production
set CONTAINER_NAME=tutt-client-production-container

REM Navigate to the project directory
cd /d "%~dp0"

REM Build the Docker image
echo Building the Docker image...
docker build -f Dockerfile.production -t %IMAGE_NAME% .

REM Stop and remove any existing container with the same name
echo Stopping and removing any existing container...
docker stop %CONTAINER_NAME%
docker rm %CONTAINER_NAME%

REM Run the Docker container
echo Running the Docker container...
docker run -d -p 9090:80 --name %CONTAINER_NAME% %IMAGE_NAME%

echo Build and run process completed.

endlocal
pause