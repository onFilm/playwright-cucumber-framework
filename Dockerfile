FROM mcr.microsoft.com/playwright:v1.29.2-focal
USER root
RUN mkdir /tests
COPY . /tests
WORKDIR /tests

RUN npm i
RUN npx playwright install

#To run scripts inside docker
#docker build . -t playwright-tests
#docker run -it --rm --ipc=host -d --name playwright-tests-container playwright-tests /bin/bash
#docker exec -it playwright-tests-container /bin/bash