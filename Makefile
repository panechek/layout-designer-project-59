install:
	npm ci

lint:
	npx stylelint ./app/sass/**/*.scss

deploy:
	npx gulp build
	npx surge build --domain pan-chat.surge.sh

push:
	git add .
	git commit -m '$(message)'
	git push

server:
	npx gulp development
