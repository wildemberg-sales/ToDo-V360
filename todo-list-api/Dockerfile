FROM ruby:3.2.2

RUN apt-get update -qq && apt-get install -y nodejs postgresql-client libpq-dev netcat-openbsd

WORKDIR /api

COPY . .
RUN bundle install

RUN chmod +x setup.sh

EXPOSE 3000

CMD [ "sh", "setup.sh" ]