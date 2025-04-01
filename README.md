## DivoVK JS for VK MiniApps
The library includes the simplest routing with animation of modular windows and work with toasts. Also auxiliary functions for working with DOM.

Библиотека включает в себя простейшую маршрутизацию с анимацией модульных окон и работой с тостами. Также вспомогательные функции для работы с DOM.

## Установка

### Через CDN

#### ES Module (ESM)
```html
<script type="module">
  import { DivoVK } from "https://cdn.jsdelivr.net/gh/goodwin74/divovk-js@latest/dist/divovk-js.es.js";

  const dvk = new DivoVK({
    url_block: false,
    limit_run: 500,
    toast_id: '#toast'
  });
</script>
```
#### UMD
```html
<script src="https://cdn.jsdelivr.net/gh/goodwin74/divovk-js@latest/dist/divovk-js.umd.js"></script>
<script>
  const dvk = new DivoVK({
    url_block: false,
    limit_run: 500,
    toast_id: '#toast'
  });
</script>
```

## Использование

### Базовая настройка
```javascript
const dvk = new DivoVK({
  url_block: false, // Блокировка URL навигации
  limit_run: 500,   // Лимит времени между действиями
  toast_id: '#toast' // ID элемента для уведомлений
});
```

### Навигация
```js
// Открыть модульное окно с id="block1"
dvk.navTo('block1');

// Вернуться назад
dvk.hB();
```
**Пример структуры Activity (модального окна)**
<details>
  <summary>Spoiler</summary>
  
```html
<div class="activity" id="block1" data-type="1">
    <div class="activityWrap" style="">
        <div class="activityHeader">
            <div class="aH_icon" onclick="history.go(-1);"><span>x</span></div>
            <div class="aH_title" style="">Блок 1</div>
        </div>
        <div class="activityCont pad10">
            Контент
        </div>
    </div>
</div>
```

```css
:root {
    --back-clr: #eaedf2;
    --text-clr: #0a0a0a;
    --one-clr: #0077ff;
    --two-clr: #fff;
}
html, body{
    width: 100%;
    height: 100%;
    position: fixed;
    overflow: hidden;
    background: var(--back-clr);
}
body div{
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}
::-webkit-scrollbar { width: 0; }
body { -ms-overflow-style: none; }
body { overflow: -moz-scrollbars-none; }
.activity {
    position: absolute;
    top:0;
    left:0;
    transform: translate(0,110%);
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
}
.activity .activityCont * {
    -webkit-overflow-scrolling: touch;
}
.activity .activityWrap {
    position: absolute;
    display: -webkit-flex;
    display: flex;
    -webkit-flex-flow: column nowrap;
    flex-flow: column nowrap;
    background: var(--back-clr);
    color: var(--text-clr);
    left:0;top:0;
    width: 100%;
    height: 100%;
    transform: translate(0,110%);
    transition: transform .3s;
    backface-visibility: hidden;
}
.activity1 .activityHeader, .activity3 .activityHeader{
    -webkit-flex: 0 0 50px;
    flex: 0 0 50px;
    background: var(--back-clr);
    color: var(--text-clr);
    display: -webkit-flex;
    display: flex;
    -webkit-flex-flow: row nowrap;
    flex-flow: row nowrap;
}
.activityHeader .aH_icon{
    padding: 14px 10px;
    -webkit-flex: 0 0 30px;
    flex: 0 0 30px;
    cursor: pointer;
}
.activityHeader .aH_title{
    -webkit-flex-grow: 1;
    flex-grow: 1;
    padding: 14px 0;
    margin: 0;
    font-size: 18px;
    font-weight: normal;
}
.activityHeader .aH_icon svg{
    fill: var(--text-clr);
}
.activityHeader .aH_icon, .activityHeader .aH_icon svg{
    width: 24px;
    height: 24px;
    box-sizing: content-box;
}
```
</details>

### Уведомления(тосты)
```js
// Показать успешное уведомление
dvk.toast('s', 'Успешно!');

// Показать ошибку
dvk.toast('e', 'Произошла ошибка');

// Информационное сообщение
dvk.toast('i', 'Информация');
```
Параметры
`toast=(type,msg,time=5000,bottom=10)`

Тип, Сообщение, Время показа(5с по умолчанию), Сдвиг от нижней части экрана в px (10 по умолчанию)

**Пример структуры Toast**
<details>
  <summary>Spoiler</summary>
  
```html
<div class="toast" id="toast">
    <div class="toast_body">
        <div class="toast_icon">
            <div class="tic_err">{icon_er_svg_or_img}</div>
            <div class="tic_suc">{icon_suc_svg_or_img}</div>
            <div class="tic_info">{icon_info_svg_or_img}</div>
        </div><div class="toast_text"></div>
    </div>
</div>
```

```css
.toast{
    position: fixed;
    z-index: 99;
    left: 0%;
    bottom: -50%;
    transition: bottom 0.3s ease-in-out 0s;
    width: 100%;
    padding: 20px;
    color:var(--text-clr);
    min-height: 100px;
    display: flex;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
}
.toast_body{
    padding: 20px;
    background: var(--back-clr);
    box-shadow: 0 0 15px 1px rgba(0, 0, 0, 0.12);
    border-radius: 15px;
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-content: center;
    justify-content: flex-start;
}
.t_active {
    bottom: 0%;
}
.terror .tic_err{display: block}
.tsuc .tic_suc{display: block}
.tinfo .tic_info{display: block}
.tdel .tic_del{display: block}
.toast_icon svg,.toast_icon div{
    width: 20px;
    height: 20px;
}
.toast_icon div{display: none;}
.tic_err path,.tic_del path{fill: #c21919;}
.tic_suc path{fill: #2ac219;}
.tic_info path{fill: #19b4c2;}
.toast_icon{
    padding: 0 10px 0 0;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: center;
    align-items:center;
}
```
</details>

## Анимация Activity(модального окна)

`animList[${type}_${action}]`

**Ниже пример стандартной анимации для всех Activity с `data-type="1"`**

```js
dvk.animList['1_open']=(id,curState,noanim)=>{
    noanim=noanim||0;
    let d=dvk.qS('#'+id);
    d.style.transform='translate(0,0)';
    d.style.zIndex=curState.activity.length+1;
    dvk.qS('#'+id+' .activityWrap').style.transform='translate(0,0%)';
}
dvk.animList['1_close']=(id,curState,noanim)=>{
    noanim=noanim||0;
    let d=dvk.qS('#'+id);
    d.style.zIndex=curState.activity.length+1;
    dvk.qS('#'+id+' .activityWrap').style.transform='';
    setTimeout(()=>{
        d.style.transform='';
        d.style.zIndex='-1';
    },400);
}
```

## Вспомогательные методы (helpers method)

**`dvk.hB()` - Вернуться назад (history back)**

**`dvk.cVar(obj)` - Скопировать объект**

**`dvk.dAlle(Element)` - Удалить все слушатели с Element**

**`dvk.pTime()` - Задержка выполнения функций для избежания быстрого повторного вызова. Например при событии Click.**
```js
// dvk.pTime() возвращает true, если после последнего вызова прошло более 500мс или значения limit_run
dvk.qS('#btn1').addClick(()=>{
    if(!dvk.pTime()) return;
    //тело функции
});
```

**`dvk.qS(selector)` - Выбор одного Element из DOM***

**`dvk.qSS(selectors)` - Выбор несколько Element из DOM***

**`AnyElement.qS(selector)` - Выбор одного Element внутри родителя AnyElement***
```js
const a = dvk.qS('#block1'); //Выбор одного Element из DOM
a.qS('.activityHeader'); //Выбор одного Element внутри родителя
```

**`AnyElement.addCl(className)` - Добавить класс к AnyElement***

**`AnyElement.delCl(className)` - Удалить класс к AnyElement***

**`AnyElement.addClick(e=>console.log(e.currentTarget.getAttribute("id")))` - Добавить в Element слушатель Click***

**`AnyNodeList.addClick(e=>console.log(e.getAttribute("id")))` - Добавить всем Elements из NodeList слушатель Click***

**Список слушателей, которые можно добавить:**
* addMouseUp
* addMouseDown
* addChange
* addInput
