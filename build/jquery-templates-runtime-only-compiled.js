(function(){var d={"&":"&amp;","<":"&lt;",">":"&gt;"};function g(a){return d[a]||(d[a]="&#"+a.charCodeAt(0)+";")}var h=/[\0"&'<>]/g;$.encode=function(a){return a===void 0?"":String(a).replace(h,g)};$.extAll=function(a){var e=arguments,c,f,b;for(c=1;c<e.length;++c)for(b in f=e[c])a[b]=f[b];return a};$.templatePlugins=[function(a){$.each(a,function c(a,b){typeof b!=="string"&&(b[0]==="="?b[1]+="=>$.encode":b[0]==="html"?b[0]="=":$.each(b,c))});return a}];$.templates={};$.template=function(a){return $.templates[a]}}())