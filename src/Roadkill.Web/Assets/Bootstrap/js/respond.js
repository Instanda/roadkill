﻿(function (e) { "use strict"; function T() { w(true) } var t = {}; e.respond = t; t.update = function () { }; var n = [], r = function () { var t = false; try { t = new e.XMLHttpRequest } catch (n) { t = new e.ActiveXObject("Microsoft.XMLHTTP") } return function () { return t } }(), i = function (e, t) { var n = r(); if (!n) { return } n.open("GET", e, true); n.onreadystatechange = function () { if (n.readyState !== 4 || n.status !== 200 && n.status !== 304) { return } t(n.responseText) }; if (n.readyState === 4) { return } n.send(null) }, s = function (e) { return e.replace(t.regex.minmaxwh, "").match(t.regex.other) }; t.ajax = i; t.queue = n; t.unsupportedmq = s; t.regex = { media: /@media[^\{]+\{([^\{\}]*\{[^\}\{]*\})+/gi, keyframes: /@(?:\-(?:o|moz|webkit)\-)?keyframes[^\{]+\{(?:[^\{\}]*\{[^\}\{]*\})+[^\}]*\}/gi, comments: /\/\*[^*]*\*+([^/][^*]*\*+)*\//gi, urls: /(url\()['"]?([^\/\)'"][^:\)'"]+)['"]?(\))/g, findStyles: /@media *([^\{]+)\{([\S\s]+?)$/, only: /(only\s+)?([a-zA-Z]+)\s?/, minw: /\(\s*min\-width\s*:\s*(\s*[0-9\.]+)(px|em)\s*\)/, maxw: /\(\s*max\-width\s*:\s*(\s*[0-9\.]+)(px|em)\s*\)/, minmaxwh: /\(\s*m(in|ax)\-(height|width)\s*:\s*(\s*[0-9\.]+)(px|em)\s*\)/gi, other: /\([^\)]*\)/g }; t.mediaQueriesSupported = e.matchMedia && e.matchMedia("only all") !== null && e.matchMedia("only all").matches; if (t.mediaQueriesSupported) { return } var o = e.document, u = o.documentElement, a = [], f = [], l = [], c = {}, h = 30, p = o.getElementsByTagName("head")[0] || u, d = o.getElementsByTagName("base")[0], v = p.getElementsByTagName("link"), m, g, y, b = function () { var e, t = o.createElement("div"), n = o.body, r = u.style.fontSize, i = n && n.style.fontSize, s = false; t.style.cssText = "position:absolute;font-size:1em;width:1em"; if (!n) { n = s = o.createElement("body"); n.style.background = "none" } u.style.fontSize = "100%"; n.style.fontSize = "100%"; n.appendChild(t); if (s) { u.insertBefore(n, u.firstChild) } e = t.offsetWidth; if (s) { u.removeChild(n) } else { n.removeChild(t) } u.style.fontSize = r; if (i) { n.style.fontSize = i } e = y = parseFloat(e); return e }, w = function (t) { var n = "clientWidth", r = u[n], i = o.compatMode === "CSS1Compat" && r || o.body[n] || r, s = {}, c = v[v.length - 1], d = (new Date).getTime(); if (t && m && d - m < h) { e.clearTimeout(g); g = e.setTimeout(w, h); return } else { m = d } for (var E in a) { if (a.hasOwnProperty(E)) { var S = a[E], x = S.minw, T = S.maxw, N = x === null, C = T === null, k = "em"; if (!!x) { x = parseFloat(x) * (x.indexOf(k) > -1 ? y || b() : 1) } if (!!T) { T = parseFloat(T) * (T.indexOf(k) > -1 ? y || b() : 1) } if (!S.hasquery || (!N || !C) && (N || i >= x) && (C || i <= T)) { if (!s[S.media]) { s[S.media] = [] } s[S.media].push(f[S.rules]) } } } for (var L in l) { if (l.hasOwnProperty(L)) { if (l[L] && l[L].parentNode === p) { p.removeChild(l[L]) } } } l.length = 0; for (var A in s) { if (s.hasOwnProperty(A)) { var O = o.createElement("style"), M = s[A].join("\n"); O.type = "text/css"; O.media = A; p.insertBefore(O, c.nextSibling); if (O.styleSheet) { O.styleSheet.cssText = M } else { O.appendChild(o.createTextNode(M)) } l.push(O) } } }, E = function (e, n, r) { var i = e.replace(t.regex.comments, "").replace(t.regex.keyframes, "").match(t.regex.media), o = i && i.length || 0; n = n.substring(0, n.lastIndexOf("/")); var u = function (e) { return e.replace(t.regex.urls, "$1" + n + "$2$3") }, l = !o && r; if (n.length) { n += "/" } if (l) { o = 1 } for (var c = 0; c < o; c++) { var h, p, d, v; if (l) { h = r; f.push(u(e)) } else { h = i[c].match(t.regex.findStyles) && RegExp.$1; f.push(RegExp.$2 && u(RegExp.$2)) } d = h.split(","); v = d.length; for (var m = 0; m < v; m++) { p = d[m]; if (s(p)) { continue } a.push({ media: p.split("(")[0].match(t.regex.only) && RegExp.$2 || "all", rules: f.length - 1, hasquery: p.indexOf("(") > -1, minw: p.match(t.regex.minw) && parseFloat(RegExp.$1) + (RegExp.$2 || ""), maxw: p.match(t.regex.maxw) && parseFloat(RegExp.$1) + (RegExp.$2 || "") }) } } w() }, S = function () { if (n.length) { var t = n.shift(); i(t.href, function (n) { E(n, t.href, t.media); c[t.href] = true; e.setTimeout(function () { S() }, 0) }) } }, x = function () { for (var t = 0; t < v.length; t++) { var r = v[t], i = r.href, s = r.media, o = r.rel && r.rel.toLowerCase() === "stylesheet"; if (!!i && o && !c[i]) { if (r.styleSheet && r.styleSheet.rawCssText) { E(r.styleSheet.rawCssText, i, s); c[i] = true } else { if (!/^([a-zA-Z:]*\/\/)/.test(i) && !d || i.replace(RegExp.$1, "").split("/")[0] === e.location.host) { if (i.substring(0, 2) === "//") { i = e.location.protocol + i } n.push({ href: i, media: s }) } } } } S() }; x(); t.update = x; t.getEmValue = b; if (e.addEventListener) { e.addEventListener("resize", T, false) } else if (e.attachEvent) { e.attachEvent("onresize", T) } })(this)