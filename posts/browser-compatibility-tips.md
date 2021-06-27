---
title: '浏览器兼容性'
excerpt: ''
coverImage: ''
date: '2012-07-19T22:16:00.000Z'
ogImage:
  url: ''
---


## IE hasLayout

### 简介

“Layout”是一个 `Internet Explorer for Windows 的私有概念`，它决定了一个元素**如何显示以及约束其包含的内容**、**如何与其他元素交互和建立联系**、**如何响应和传递应用程序事件、用户事件**等。

一个元素“拥有 Layout” 的时候，是指它的微软专有属性 hasLayout 为此被设为了 true （在 IE Developer Toolbar 下，“拥有 Layout” 的元素，通常显示为“haslayout = -1”）。一些元素默认就“拥有 Layout” ，其他元素可通过设置某些 CSS 属性“拥有 Layout”（hasLayout 无法通过某一个 CSS 声明直接设定，而是借助一些 CSS 声明悄悄地“拥有 Layout”）。但这个过程是`不可逆转`的，没有办法设置 hasLayout = false ，除非把一开始那些触发 hasLayout = true 的 CSS 属性去除或重置。

默认“拥有 Layout” 的元素（不完全列表）

- body and html
- table, tr, th, td
- img
- hr
- input, button, file, select, textarea, field set
- marquee
- frameset, frame, iframe
- objects, applets, embed

默认没“拥有 Layout”的元素（不完全列表）

- div
- span

### 与 hasLayout 有关的问题（包括但不限于）

- IE 很多常见的浮动臭虫。
- 元素本身对一些基本属性的异常处理问题。
- 容器和其子孙之间的空白边重叠问题。
- 使用列表时遇到的诸多问题。
- 背景图像的定位偏差问题。
- 使用脚本时遇到的浏览器之间处理不一致的问题。

### 用于激活 hasLayout 的 CSS 属性设置

- width: 除 “auto” 外的任意值。
- height: 除 “auto” 外的任意值。
- zoom: 除 “normal” 外的任意值。

  IE 专有属性。zoom: 1 可以临时用做调试，但是在 IE5.0 中不支持。

- position: absolute | fixed

- float: left | right
- display: inline-block

  当一个内联级别的元素需要 layout 的时候往往就要用到它，这也可能也是这个 CSS 属性的唯一效果——让某个元素“拥有 layout”。“inline-block 行为”在IE中是可以实现的，但是非常与众不同。
- min-width: 任意值。

  IE 中从 IE 7 开始支持该属性。即使设为0也可以让该元素的 haslayout = true。

- min-height: 任意值。

  IE 中从 IE 7 开始支持该属性。即使设为0也可以让该元素的 haslayout = true。

- max-width: 除 “none” 之外的任意值

  IE 中从 IE 7 开始支持该属性。

- max-height: 除 “none” 之外的任意值。

  IE 中从 IE 7 开始支持该属性。

- overflow: hidden | scroll | auto

  在 IE 7 中，overflow 也变成了一个 layout 触发器，这个属性在之前版本 IE 中没有触发 layout 的功能。

- overflow-x | -y: hidden | scroll | auto

  overflow-x 和 overflow-y 是 CSS3 盒模型中的属性，尚未得到浏览器的广泛支持。他们在之前版本IE中没有触发 layout 的功能。

- writing-mode: tb-rl

  IE 专有属性，但新规范已剔除该属性。

### 有关内联级别元素

对于内联元素（默认即为内联的元素或者 display: inline 的元素）：

width 和 height 只在 IE5.x 下和 IE6 或更新版本的 quirks 模式下触发 hasLayout 。而对于 IE6，如果浏览器运行于标准兼容模式下，内联元素会忽略 width 或 height 属性，所以设置 width 或 height 不能在此种情况下令该元素具有 layout。

具有”layout” 的元素如果同时也 display: inline ，那么它的行为就和标准中所说的 inline-block 很类似了：在段落中和普通文字一样在水平方向和连续排列，受 vertical-align 影响，并且大小可以根据内容自适应调整。这也可以解释为什么单单在 IE/Win 中内联元素可以包含块级元素而少出问题，因为在别的浏览器中 display: inline 就是内联，不像 IE/Win 一旦内联元素拥有 layout 还会变成 inline-block。

### 重置 hasLayout

在另一条规则中重设以下属性为默认值将重置(或撤销)hasLayout，如果没有其他属性再添加 hasLayout 的话：

- width, height (设为 “auto”)
- max-width, max-height (设为 “none”)(在 IE 7 中)
- position (设为 “static”)
- float (设为 “none”)
- overflow (设为 “visible”) (在 IE 7 中)
- zoom (设为 “normal”)
- writing-mode (从 “tb-rl” 设为 “lr-t”)

display 属性的不同：当用”inline-block”设置了 haslayout = true 时，就算在一条独立的规则中覆盖这个属性为”block”或”inline”，haslayout 这个标志位也不会被重置为 false。

把 mid-width, mid-height 设为它们的默认值”0″仍然会赋予 hasLayout，但是 IE 7 却可以接受一个不合法的属性”auto”来重置 hasLayout。


- 在可点击和悬停的元素上只使用 a 标签，因为IE6只认识对 a 标签的 CSS hover 效果。
- 使用 !important 或高级选择器来区分 IE 6。
- IE6 下是可以使用 !important 的，但相同选择器内如果 !important 不是写在最后，则 !important 失效。相同元素的不同选择器下，单独定义同一个属性的值，不管选择器的顺序如何，!important 仍然会生效。
- 避免百分比单位。
- IE 6 中不支持多重修饰类，如： .multiple.classes 。IE6 渲染的具体原理是：将 .multiple.classes 渲染成 AllSelector.classes ，也即最终渲染为最后一个 class 。
- IE 6 不支持子选择器。


## Block Formatting Contexts(块级格式化上下文)

### 简介

Block Formatting Context （块格式化上下文）是 W3C CSS 2.1 规范中的一个概念，它决定了元素如何**对其内容进行定位**，以及**与其他元素的关系和相互作用**。触发了 BFC 的元素将形成一个隔离的独立容器，容器里面的子元素不会在布局上影响到外面的元素，外面的元素也不会影响到里面的子元素。在 CSS3 中，BFC 叫做 Flow Root 。

另外注意，IE6 - 7 并不支持 W3C 的 BFC ，而是使用自产的 hasLayout 。从表现上来说，它跟 BFC 很相似，只是 hasLayout 自身存在很多问题，导致了 IE6-7 中一系列的 bug 。触发 hasLayout 的条件与触发 BFC 有些相似。

一个BFC是CSS可视化渲染页面的一部分，它是把一组块级box和浮动元素放在一起布局的区域。


BFC(Block formatting context)直译为"块级格式化上下文"。它**是一个独立的渲染区域**，只有**Block-level box**参与（在下面有解释）， 它规定了内部的Block-level Box如何布局，并且与这个区域外部毫不相干。

我们常说的文档流其实分为定位流、浮动流和普通流三种。而**普通流其实就是指BFC中的FC**。

**FC**是formatting context的首字母缩写，直译过来是格式化上下文，它**是页面中的一块渲染区域**，有一套渲染规则，决定了其**子元素如何布局，以及和其他元素之间的关系和作用。**

### BFC 的作用

- 在块级格式化上下文中（即父元素触发 BFC ），第一个子元素的 margin-top 将不会与父元素的 margin-top （如果有的话）重叠。（待进一步确认，Demo 测试普通文档流中也没发生重叠）
- 在块级格式化上下文中，触发了 BFC 的父元素会包含浮动的子元素。
- 在块级格式化上下文中，元素都是从一个包含块的顶部开始，一个接一个排列着，浮动元素也遵照此规则。
- 触发了 BFC 的非浮动元素 border 外延（而不是 margin 外延）不会覆盖周围浮动元素的 margin 外延。

注意，在块级格式化上下文中，两个兄弟元素之间的垂直外边距仍然会产生叠加。

### 触发 BFC

- float: left | right
- position: absolute | fixed
- display: inline-block | inline-table | table | table-cell | table-caption（CSS 3中增加）

  "display:table" 本身并不产生 BFC，而是由它产生匿名框，匿名框中包含 "display:table-cell" 的框会产 BFC。 总之，对于 "display:table" 的元素，产生 BFC 的是匿名框而不是 "display:table"。

- overflow: auto | hidden | scroll


## 总结

既然 hasLayout 有着跟 BFC 相似的功能，那么在实际开发中，就要为需要触发 BFC 的元素同时触发 hasLayout ，这样 BFC 和 hasLayout 具有的一些特殊性质可以在现代浏览器和 IE 中同时产生，避免一个元素在不同浏览器间的表现因为 BFC 或 hasLayout 出现差异。事实上，在实际开发中很多莫名其妙的问题其实都是因此而产生的。当然同样地，如果一个元素没有触发 BFC ，也要尽量保证它没有触发 hasLayout 。
