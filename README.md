# webapp-frontend

## Team Information

| Name | NEU ID | Email Address |
| --- | --- | --- |
| Ravi Kiran | 001491808 | lnu.ra@husky.neu.edu  |
| Veena Iyer | 001447061  | iyer.v@husky.neu.edu |

## To run locally for development

This is a Frontend Application developed using React JS to consume a REST endpoint

To run, install npm
```sh
npm install.
```
and then start npm
```sh
npm run start
```
## Setting up Jenkins 
* Open your domain where Jenkins is hosted
* Login to Jenkins console using the steps mentioned on the console
* Download the plugins. Make sure github and docker plugins are installed
* Click new to create a new job.
* Select Pipeline and provide a name for your job.
* Select "GitHub hook trigger for GITScm polling" in Build Triggers
* Select Pipeline script from scm in Pipeline Defination
* Select Git in SCM
* Add the repository details. Add the credentials
* Provide the path of Jenkinsfile "webapp/recipie_management_system/Jenkinsfile"
* Apply and Save
* Now add the environment variables:
* - Add Docker credentials {DOCKER_USER} and {DOCKER_PASS} for pushing the image tto docker hub
* - Add {BACKEND_IMAGE_NAME} for the docker image name
    

## Setting up github 
* Open the github repository and add the webhook for the Jenkins server under settings>webhooks option
* Provide the payload url(url where jenkins is hosted) and append /github-webhook/ in the end. Example: jenkins.kiranravi.me
* Content type: application/json
* Save the Webhook

## TA Demo