  var jsfbcb = 0;
  function jsFlickrBadge(t, f) {
    var b, k;
    b = encodeURIComponent(f.flickrId);
    var h = f.size, z = f.rows, n = f.columns, r = f.animation, w = 1E3 * f.animationSpeed, u = 1E3 * f.animationPause, s = function (a,
                                                                                                                                      M) {
          var b = Math.floor(Math.random() * a);
          return 1 < a && b == M ? s(a, M) : b
        }, x = function (a, b) {
          var f, h;
          for (f in a) {
            if (a.hasOwnProperty(f) && (h = b(a[f], f), void 0 !== h)) {
              break;
            }
          }
          return h
        }, I = function (a) {
          var b = a ? a.split("px") : [];
          return 1 < b.length ? Number(b[0]) : a
        }, p = function (a) {
          return!a || isNaN(a) ? 0 : Number(a)
        }, B = function (a) {
          return a && "[object Array]" == Object.prototype.toString.apply(a)
        },
        U = function (a) {
          var b = 0, f = a.length;
          return function () {
            var h = a[b];
            b = (b + 1) % f;
            return h
          }
        }, m = function (a) {
          var b = document.documentElement;
          return B(a) ? x(a, function (a) {
            return b.style.hasOwnProperty(a) ? a : void 0
          }) : m(["-webkit-" + a, "-moz-" + a, "-o-" + a, a])
        }, C = m("transition"), V = m("perspective"), N = m("backface-visibility"), D = m("transform"), O = m("transform-style"), E = m("box-shadow");
    "random" == r && (r = ["shuffle", "zoom", "vscroll", "flipX", "flipY"][s(3)]);
    "group" == f.feed ? b = "groups_pool.gne?id=" + b : "contacts" == f.feed ? b = "photos_friends.gne?user_id=" +
        b : "contactsAll" == f.feed ? b = "photos_friends.gne?user_id=" + b + "&displayAll=1" : "friends" == f.feed ? b = "photos_friends.gne?user_id=" + b + "&friends=1" : "friendsAll" == f.feed ? b = "photos_friends.gne?user_id=" + b + "&friends=1&displayAll=1" : "favorites" == f.feed ? b = "photos_faves.gne?id=" + b : (b = "photos_public.gne?id=" + b, f.tags && (B(f.tags) ? b += "&tags=" + f.tags.join(",") : f.tags.split && (b += "&tags=" + f.tags.split(/ ,;/).join(","))));
    k = "jsFlickrBadge" + jsfbcb++;
    window[k] = function (a) {
      function b(J, l) {
        var d;
        d = J.currentStyle ? J.currentStyle[l] :
            window.getComputedStyle(J, null)[l];
        return I(d)
      }

      function f(b, l, d, c) {
        var a = d / 1E3 + "s ease-in-out", e = [];
        B(b) || (b = [b]);
        x(l, function (b, d) {
          e.push(d + " " + a)
        });
        x(b, function (b) {
          b.style[C] = e.join(",");
          b.img && (b.img.style[C] = e.join(","));
          x(l, function (d, c) {
            c == E && b.img ? b.img.style[c] = d : b.style[c] = d;
            if (("width" == c || "height" == c) && b.img) {
              b.img.style[c] = d
            }
          })
        });
        c && window.setTimeout(c, d)
      }

      function k(a, l, d, c) {
        B(a) || (a = [a]);
        x(a, function (c) {
          f(c, {top: p(b(c, "top")) + l.y + "px", left: p(b(c, "left")) + l.x + "px"}, d)
        });
        window.setTimeout(c,
            d)
      }

      function m(a, l, d) {
        var c = document.createElement("a");
        null != l && null != d && (F.appendChild(c), e || (e = {left: p(b(c, "marginLeft")), right: p(b(c,
            "marginRight")), top: p(b(c, "marginTop")), bottom: p(b(c, "marginBottom")), boxShadow: b(c,
            E) || "", zIndex: p(b(c,
            "zIndex"))}, e.height = e.top + h + e.bottom, e.width = e.left + h + e.right, t.style.height = z * e.height + "px", t.style.width = n * e.width + "px"), a.coords = {row: l, col: d});
        c.href = a.link;
        c.target = "_blank";
        c.title = a.title;
        c.rel = "nofollow";
        c.style.position = "absolute";
        l && (c.style.top = l * e.height +
            "px");
        d && (c.style.left = d * e.width + "px");
        c.style.width = h + "px";
        c.style.height = h + "px";
        c.style.border = "none";
        c.style.padding = "0";
        c.style.margin = "0";
        c.img = document.createElement("img");
        c.img.alt = c.img.title = a.title;
        c.img.src = a.media.m.replace(/_m\.jpg/, "_s.jpg");
        c.img.style.width = h + "px";
        c.img.style.maxWidth = "100%";
        c.img.style.height = h + "px";
        c.img.style.border = "none";
        c.img.style.padding = "0";
        c.img.style.margin = "0";
        c.appendChild(c.img);
        c.photo = a;
        return c
      }

      function K(b) {
        var a = s(v.length, A.index), d = v[a], c = d.photo.coords,
            g = P.splice(0, 1)[0], h = m(g, c.row, c.col), k = {}, n = {};
        A.index = a;
        d.style.zIndex = e.zIndex + 1;
        h.img.style[D] = "rotate" + b + "(-180deg)";
        h.img.style.position = "absolute";
        h.img.style.top = "0";
        h.img.style.left = "0";
        h.img.style.zIndex = e.zIndex + 2;
        d.style[V] = "200px";
        d.img.style[N] = h.img.style[N] = "hidden";
        d.img.style[O] = h.img.style[O] = "preserve-3d";
        d.img.style.zIndex = e.zIndex + 3;
        k[D] = "rotate" + b + "(180deg)";
        n[D] = "rotate" + b + "(0deg)";
        d.appendChild(h.img);
        window.setTimeout(function () {
          f(h.img, n, w);
          f(d.img, k, w, function () {
            d.style[C] =
                "inherit";
            d.style[D] = "inherit";
            var e = m(g, c.row, c.col);
            d.parentNode.replaceChild(e, d);
            v.splice(a, 1, e);
            P.push(d.photo);
            K(b)
          })
        }, u)
      }

      function Q() {
        var a = s(n, A.x), l = s(n,
            A.y), d = q[l][a], c = 1 == s(2), g = 1 == s(2), k = {height: h + "px", width: h + "px"}, m = {height: 2 * h + e.top + e.bottom + "px", width: 2 * h + e.left + e.right + "px"};
        k[E] = e.boxShadow;
        m[E] = "5px 5px 10px rgba(0, 0, 0, 0.75)";
        A = {x: a, y: l};
        0 == a ? g = !1 : a == n - 1 && (g = !0);
        0 == l ? c = !1 : l == z - 1 && (c = !0);
        c && (k.top = p(b(d, "top")) + "px", m.top = I(k.top) - e.height + "px");
        g && (k.left = p(b(d, "left")) + "px",
            m.left = I(k.left) - e.width + "px");
        d.style.zIndex = e.zIndex + 1;
        f(d, m, w, function () {
          window.setTimeout(function () {
            f(d, k, w, function () {
              d.style.zIndex = e.zIndex;
              window.setTimeout(Q, u)
            })
          }, u)
        })
      }

      function R() {
        var b = [], a;
        for (a = 0; a < n; a++) {
          b[a] = m(S(), z, a), v.push(b[a]);
        }
        window.setTimeout(function () {
          k(v, {x: 0, y: -e.height}, w, function () {
            x(v.splice(0, n), function (b) {
              b.parentNode.removeChild(b)
            });
            R()
          })
        }, u)
      }

      function T() {
        var b = [], a, d = {};
        0 < g.row && "d" != g.last && b.push({row: g.row - 1, col: g.col, last: "u"});
        g.row + 1 < q.length && "u" != g.last &&
        b.push({row: g.row + 1, col: g.col, last: "d"});
        0 < g.col && "r" != g.last && b.push({row: g.row, col: g.col - 1, last: "l"});
        g.col + 1 < q[0].length && "l" != g.last && b.push({row: g.row, col: g.col + 1, last: "r"});
        a = b[s(b.length)];
        g.col > a.col ? (d.x = e.width, d.y = 0) : g.col < a.col ? (d.x = -e.width, d.y = 0) : g.row > a.row ? (d.x = 0, d.y = e.height) : g.row < a.row && (d.x = 0, d.y = -e.height);
        k(q[a.row][a.col], d, w, function () {
          q[g.row][g.col] = q[a.row][a.col];
          delete q[a.row][a.col];
          g = a;
          window.setTimeout(T, u)
        })
      }

      var S = U(a.items), e, L = z * n, P = a.items.slice(L), A = {}, g, q = [],
          v = [], F, y, G, H;
      "shuffle" == r && (L--, g = {row: z - 1, col: n - 1});
      for (; t.firstChild;) {
        t.removeChild(t.firstChild);
      }
      F = document.createElement("div");
      F.style.position = "relative";
      t.appendChild(F);
      for (a = 0; a < L; a++) {
        y = S(), G = Math.floor(a / n), H = a % n, y = m(y, G, H), 0 == H ? q[G] =
            [y] : q[G][H] = y, v.push(y);
      }
      C && ("shuffle" == r ? window.setTimeout(T,
          u) : "vscroll" == r ? (t.style.overflow = "hidden", R()) : "zoom" == r ? window.setTimeout(Q,
          u) : "flipX" == r ? K("X") : "flipY" == r && K("Y"))
    };
    b = "http://api.flickr.com/services/feeds/" + b + "&lang=en-us&format=json&jsoncallback=" +
        k;
    k = document.createElement("script");
    k.type = "text/javascript";
    k.async = !0;
    k.src = b;
    document.body.appendChild(k)
  }
  ;
