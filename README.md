# Agile Ace

> An open source _[planning poker](https://planningpokeronline.com/)_ style Web App based on Jason C. McDonald's _[Quantified Tasks](https://www.quantifiedtasks.org/)_ to replace tradition _[story points](https://atlassian.com/agile/project-management/estimation)_ in Agile project estimation.

## Project Overview

This project started as a 24-hour coding challenge as part of [DevHacks 2024](https://github.com/devhacks-2024) which was developed in collaboration thanks to...

...

## Licensing & Terms of Use

...

## Project Development

...

### Support our Team

You can help support our development efforts by [ ... ]. To check out our current development progress check out [ ... ].

Feel free to submit bugfix and new feature requests through [ ... ].

### Local Development

#### Pre-Requirements

1. Python
2. NodeJS
3. Docker + docker-compose (optional)

#### Frontend

1. Install required npm packages with the following commands:
```shell
cd frontend
npm install
```

#### Backend

1. Install required python packages with the following command:
```shell
pip install -r backend/requirements.txt
```

#### Production

This project is deployed on an AWS EC2 LightSail instance running Amazon Linux.

1. Set up SSH keys
```shell
ssh-keygen
cat .ssh/id_rsa.pub  # Copy and add to GitHub
echo "your-pub-ssh-key" >> .ssh/authorized_keys  # give permission for SSH (optional)
```

2. Initial installation of _git_, _python_ (optional), and docker/docker-compose
```shell
sudo yum install git python docker
sudo curl -L https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m) -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

sudo systemctl start docker.service   # start docker system service
sudo systemctl enable docker.service  # enable docker to start on reboot
sudo usermod -aG docker $USER         # give docker 'sudo' privileges
```

3. Clone project
```shell
git clone ...
```

4. Execute project
```shell
cd ...
docker-compose up --build -d
```
