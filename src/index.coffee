noOp = ->

identity = (x) -> x

wrap = (x) -> -> x

curry = (f) ->
  g = (ax...) ->
    if ax.length >= f.length
      f ax...
    else
      switch f.length - ax.length
        when 1 then (x) -> f ax..., x
        when 2 then binary curry (x,y) -> f ax..., x, y
        when 3 then ternary curry (x,y,z) -> f ax..., x, y, z
        else (bx...) -> g ax..., bx...

_ = {}

substitute = curry (ax, bx) ->
  i = 0
  for a in ax
    if a == _
      bx[i++]
    else
      a

partial = (f, ax...) ->
  (bx...) -> f (substitute ax, bx)...

flip = (f) ->
  switch f.length
    when 1 then f
    when 2 then (y, x) -> f(x, y)
    when 3 then (z, y, x) -> f(x, y, z)
    else (ax...) -> f(ax.reverse()...)

compose = (fx..., f) ->
  if fx.length == 0
    f
  else
    g = compose fx...
    (ax...) ->
      if (fax = f ax...)?.then? then (fax.then g) else (g fax)

pipe = flip compose

spread = (f) -> (ax) -> f ax...

wait = (f) -> (x) -> if x?.then? then (x.then (a) -> f a) else (f x)

flow = (fx...) ->
  if fx.length == 0
    undefined
  else if fx.length == 1 && !fx[0]?
    undefined
  else if fx.length == 1 && fx[0]?[Symbol.iterator]?
    flow fx[0]...
  else
    (ax...) ->
      [start, gx...] = fx
      result = start ax...
      result = (wait g) result for g in gx
      result

unary = (f) -> (x) -> f(x)

binary = (f) -> (x,y) -> f arguments...

ternary = (f) -> (x,y,z) -> f arguments...

apply = (f, args...) -> (f args...)

negate = (f) -> -> !(f arguments...)

given = (args..., f) -> f args...

tee = (f) ->
  (a, bx...) ->
    if (k = (f a, bx...))?.then? then (k.then -> a) else a

once = (f) ->
  do (k=undefined) ->
    -> if k? then k else (k = f())

memoize = (f) ->
  do (cache={}) -> (args...) -> cache[args] ?= f args...

export {noOp, identity, wrap, curry, _, substitute,
  partial, flip, compose, pipe, spread, wait, flow,
  unary, binary, ternary,
  apply, negate, once, tee, given, memoize}
