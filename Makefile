REFERENCE_SOURCES=src/escapers.js src/jquery-templates-defs.js src/jquery-templates-parser.js src/jquery-templates-ref.js src/jquery-templates-builtins.js

STRAPPEND_SOURCES=src/escapers.js src/jquery-templates-defs.js src/jquery-templates-parser.js src/jquery-templates-impl.js src/jquery-templates-builtins.js

all: build/jquery-templates-reference.js build/jquery-templates-strappend.js build/jquery-templates-compiled.js

clean:
	rm -rf build

build/jquery-templates-reference.js: $(REFERENCE_SOURCES)
	mkdir -p build
	(echo "(function () {"; cat $^; echo " })()") > $@

build/jquery-templates-strappend.js: $(STRAPPEND_SOURCES)
	mkdir -p build
	(echo "(function () {"; cat $^; echo " })()") > $@

build/jquery-templates-compiled.js: $(STRAPPEND_SOURCES)
	mkdir -p build
	echo $(STRAPPEND_SOURCES) | perl -pe 's/(?:^|\s+)(\S)/ --js $$1/g' \
	| xargs java -jar closure/compiler.jar \
	    --compilation_level ADVANCED_OPTIMIZATIONS \
	    --externs src/externs.js \
	    --define DEBUG=false \
	    --output_wrapper="(function(){%output%}())" \
	    | perl -pe 's/\bwindow.//g; s/;\}/}/g' \
	    > $@ \
	    || (rm $@; false)
