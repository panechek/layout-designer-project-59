install:
	npm ci

lint:
	npx stylelint ./app/scss/**/*.scss
say:
	echo "Hello!"