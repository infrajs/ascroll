# ascroll
Animate link click anchor scroll
Плавная прокрутка при клике по внутренним ajax ссылкам и по якорям.
# use
```html
<script src="vendor/components/jquery/jquery.min.js"></script>
<script src="vendor/infrajs/ascroll/ascroll.js"></script>
```
```javascript
<script>
	$(function(){ //add handler for all links with anchor
		window.ascroll({ //default config
			"anchor":0, //anchor-блок по умолчанию, до которого нужно проскролить или цифра отступ от верхней границы браузера
			"height":'.navbar-fixed-top', //Сселектор fixed-шапки, высоту которой надо компенсировать или цифра высота
			"marginBottom":".space", //Отступ от fixed-шапки, может быть селектором блока с marginBottom
			"div":"body", //Контейнер с ссылками, которые должны плавно скролиться
			"global":false //Нужно ли применять скролл для обычных ссылок (для AJAX сайтов)
		);
	});
</script>
```

# use any time
```javascript
	ascroll.go('#anchor');
	ascroll.go('#anchor', config);
	ascroll.go(100, config);
	ascroll.once = false; //Пропустить один следующий вызов ascroll.go
```
# Игнорировать ссылку
```html
<a data-ascroll="false" ...>
```

# Прокрутка до определённого элемента
```html
<a data-anchor=".breadcrumb" ...>
```