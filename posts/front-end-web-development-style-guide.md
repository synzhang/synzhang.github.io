---
title: 'Web 前端开发风格指南'
excerpt: ''
coverImage: ''
date: '2015-04-02T15:41:00.000Z'
ogImage:
  url: ''
---

风格指南用于统一开发方式与代码书写风格。

推荐使用 EditorConfig 来配置编辑器，方便编写统一书写风格的代码。同时使用 Lint 来做代码质量检测。

## 基本规范

基本规范可引用各语言的社区推荐风格，如：

1. Google:
   - Google HTML/CSS Style Guide
   - Google JavaScript Style Guide
2. GitHub:
   - Markup & Templates Styleguide
   - CSS Styleguide
   - JavaScript Styleguide
3. Other:
   - HTML
   - CSS
   - Sass
   - JavaScript

## 注释

应用场景：

1. 模块描述
2. 函数方法
3. 大段代码
4. 复杂算法
5. Hack

文档化：

按照文档规范来书写易于阅读，且能被机器解读的注释，配合使用对应的预处理器，可以自动生成文档。

- KSS
- JSDoc
- TomDoc

风格：

comment.html

```html
<header>
</header> <!-- / header -->

<div id="wrapper">
</div> <!-- / #wrapper -->

<div class="module">
</div> <!-- / .module -->
```

comment.css

```css
/* ==========================================================================
   区块注释段
   ========================================================================== */

/* 子区块注释段
   -------------------------------------------------------------------------- */

/**
 * 分组注释段
 * 用于多行的释义或文档。
 * 1. 注释1。
 * 2. 注释2。
 */

.selector {
  property1: value1;  /* 1 */
  property2: value2;  /* 2 */
}

/* 基本注释 */
```

comment.scss

```scss
// ==========================================================================
// 区块注释段
// ==========================================================================

// 子区块注释段
// --------------------------------------------------------------------------

//
// 分组注释段
// 用于多行的释义或文档。
//

// 基本注释
```

component.scss

```scss
// A button suitable for giving a star to someone.
// Experimental: An alternative signup button styling used in AB Test #195.
// Deprecated: Styling for legacy wikis. We'll drop support for these wikis on
// July 13, 2007.
//
// :hover             - Subtle hover highlight.
// .star-given        - A highlight indicating you've already given a star.
// .star-given:hover  - Subtle hover highlight on top of star-given styling.
// .disabled          - Dims the button to indicate it cannot be used.
//
// Compatible in IE6+, Firefox 2+, Safari 4+.
// Compatibility untested.
//
// Styleguide 2.1.3.
// No styleguide reference.
```

mixin.scss

```scss
// Creates a linear gradient background, from top to bottom.
//
// $start - The color hex at the top.
// $end   - The color hex at the bottom.
```

comment.js

```js
/* ==========================================================================
   区块注释段
   ========================================================================== */

/* 子区块注释段
   -------------------------------------------------------------------------- */

/**
 * 模块简介
 *
 * 具体细节
 *
 * @param    {string}  args1  参数 1。
 * @param    {array}   args2  参数 2。
 * @returns  void
 */
 ```

## UI 组件设计模式

相对于以页面为单位的开发方式，建议以构建组件系统的方式来开发。

- Atomic Design
- BEM
- OOCSS
- SMACSS

为了合理划分组件并分离内容、样式、行为，建议采用如下设计模式。

原子 － 分子 － 组织 － 模版 － 页面

### HTML（语义）

class 区分 UI 与业务，使用attribute加强语义与配置行为。

```html
<div class="model component" attribute="value" data-attribute="value">
  <div class="component-descendant">
    ...
  </div>
</div><!-- / .component -->
    
<div class="component--modifier" data-attribute="value">
  <div class="component-descendant is-state">
    ...
  </div>
</div><!-- / .component--modifier -->
```

### CSS（组件）

规则书写

1. Layout: The position of the element in space. Eg.: position, top, z-index.
2. Box: The element itself. Eg.: display, overflow, box-sizing.
3. Visual: Design of the element. Eg.: color, border, background.
4. Type: Typesetting of the element. Eg.: font-family, text-transform.

模块分组

```
Abstracts ----------- 抽象
  ├── Variables ----- 变量
  |   └── Palette --- 调色盘
  ├── Functions ----- 函数
  ├── Mixins -------- 混合宏
  └── Placeholders -- 占位符
Vendors ------------- 第三方框架、库、插件
Normalize ----------- 标准化
Typography ---------- 文本版式
Icons --------------- 图标
Layout -------------- 布局规则
Components ---------- UI 组件
Themes -------------- 主题风格
Helpers ------------- 辅助工具
[Pages] ------------- 页面专属样式
[Print] ------------- 打印样式
[Shame] ------------- 补丁
```

变量命名

`<property>-<value>[--componentName]`

模块

命名

`<component>[-descendant|--modifier]`

```
.component ------------------------------- 组件
.component-descendant -------------------- 组件子模块
.component--modifier --------------------- 组件派生类
.is-state -------------------------------- 组件状态
.u-util ---------------------------------- 工具
.js-hook --------------------------------- JavaScript 专属钩子
.shame-classname ------------------------- 补丁
```

代码组织

```scss
%model {
	// minimum equipment
    
	.model-descendant {}
}
    
.model {
	@extend %model;
    
  .model-descendant {}
}
    
.model--modifier {
	@extend %model;
    
	.model-descendant {}
}
    
.page--model {}
    
.page--model-descendant {}
```

注解：

- 尽量降低选择器的优先级。
- 如果 HTML 结构明确，可直接使用元素选择器。
- 组件中的行为可以依赖于组件结构。而不同组件拥有相同行为时，可以将 JavaScript 绑定到 .js-hook 上。
- shame 补丁样式集中存放，详细注释并定期修复。
- 由于 IE 6 不支持部分常用选择器（如：子选择器.foo > .bar，链式选择器 .foo.bar 等），导致无法使用 .component-descendant.is-state，因此采用.is-component-descendant-state命名约定来弥补不足。

### JavaScript（事件流）

随着用户体验的不断改善，JavaScript 代码的规模也会不断增加，因此建议一开始就进行基本的模块管理，或者使用框架、库来组织代码。

#### Web Site

模块分组

```
Vendor ----------------------------------- 第三方框架、库、插件
Util ------------------------------------- 通用工具
Base ------------------------------------- 应用初始化
Common ----------------------------------- 全局属性与方法
Component -------------------------------- 通用 UI 组件
Business Logic --------------------------- 应用业务逻辑
Main ------------------------------------- 全局执行代码
Entry ------------------------------------ 各页面入口
```

注解：

- Component 完全脱离 Business Logic，并且推荐开源 Component。

模块实现

```js
/**
 * @desc Module Organization
 * @see  http://pinkyjie.com/2013/12/18/rock-your-web-page-in-bakcbone-way/
 */

// Base
(function(root, $) {
  root.App = {
    view: {}
  };

  root.$document = $(document);
  root.$window   = $(window);

  root.EventBus = {
    trigger: function(event, data) {
      var e = $.Event(event);
      e.param = data;
      $document.trigger(e);
    },

    on: function(event, callback) {
      $document.on(event, callback);
    },

    off: function(event) {
      $document.off(event);
    }
  };
}(this, jQuery));


// Common


// Util
(function(exports, $) {
  // TODO
  exports.extend = function() {};
}(App, jQuery));


// Component
(function(exports, $) {
  var component = function(element) {
    this.$el = $(element);
    this.model = null;

    // TODO
    _.bindAll(this, 'submit', 'create', 'destroy');

    // 模块内部的交互使用事件委托
    this.$el
      .on('submit', 'form', this.submit);

    // 模块与模块之间的交互使用观察者模式
    EventBus
      .on('Component:create', this.create)
      .on('Component:destroy', this.destroy);
  };

  // TODO
  _.extend(component.prototype, {
    render: function() {
      this.reset();
      console.log('render');
    },

    reset: function() {
      console.log('reset');
    },

    submit: function() {
      console.log('submit');
    },

    create: function(event) {
      console.log('create');
    },

    destroy: function(event) {
      console.log('destroy');
    }
  });

  exports.view.component = component;
}(App, jQuery));


// Main
(function(exports, $) {
  exports.InitPage = function() {
    var componentView = new exports.view.component('.component');
    componentView.render();
  };
}(App, jQuery));

// Execution
// 在 HTML 模板中调用。
// 之前的模块大部分都是声明，耗时较少。代码只在对应的模板中运行。
App.InitPage();
```

模块管理

使用 AMD、CommonJS 及 ES Harmony 编写模块化的 JavaScript。

#### Web App

@TODO

模块通用化

在满足应用本身的需求之后，建议将模块从应用中解耦出来，方便集成到其他应用。

jQuery 插件

```js
/**
 * @desc jQuery 插件设计模式 - Data API
 * @see  Bootstrap
 */

(function($) {

  // Module Public Class Definition
  // ==============================

  var Module = function(element, options) {
    this.$element = $(element);
    this.options  = options;
  };

  Module.prototype.method = function() {
    // do something...
  };

  // Module Default Options

  Module.DEFAULTS = {
    'key': 'value'
  };


  // Module jQuery Plugin Definition
  // ===============================

  var old = $.fn.module;

  $.fn.module = function(option) {
    return this.each(function() {
      var $this   = $(this),
          data    = $this.data('module'),
          options = $.extend(
            {},
            Module.DEFAULTS,
            $this.data(),
            typeof option == 'object' && option
          );

      if (!data) $this.data('module', (data = new Module(this, options)));
      if (typeof option == 'string') data[option]();
    });
  };

  $.fn.module.Constructor = Module;


  // Module No Conflict
  // ==================

  $.fn.module.noConflict = function() {
    $.fn.module = old;
    return this;
  };


  // Module Data-API
  // ===============

  $(document).on('event.module.data-api', '[data-toggle="module"]', function(e) {
    e.preventDefault();

    $(this).module('method');
    // do something...
  });

})(jQuery);
```

#### 其他

省略行末分号

如果下一行的第一个token是 ( , [ , / , + , - 这五个字符之一的话，JavaScript 将不会自动在上一行句尾加上分号。所以注意这类情况。
