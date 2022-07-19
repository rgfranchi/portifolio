FROM php:5.6-apache
LABEL Rafael G. Franchi <rgfranchi@gmail.com>
COPY ./php/config/php.ini /usr/local/etc/php/php.ini
RUN docker-php-ext-install mysqli
RUN a2enmod rewrite