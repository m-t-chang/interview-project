FROM python:3.10.4-slim-buster

ENV INSTALL_PATH /flask_docker
RUN mkdir -p $INSTALL_PATH
WORKDIR $INSTALL_PATH

# RUN pip3 --no-cache-dir install pipenv==2022.1.8
# RUN pipenv lock -r > requirements.txt
ADD ${INSTALL_PATH}/requirements.txt .
RUN pip3 install --no-cache-dir -r requirements.txt
RUN rm -rf ~/.cache
RUN rm -rf /tmp/*

ADD config ${INSTALL_PATH}/config
ADD config ${INSTALL_PATH}/instance
ADD flask_docker ${INSTALL_PATH}/flask_docker

CMD gunicorn -b 0.0.0.0:8000 --access-logfile - "flask_docker.app:create_app()"