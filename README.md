Tabify - convert midi in tablature
==================================

Node package containing tooling that can convert plain midi files into readable tablature.

Usage
-----

```
Usage: tabify [options] <file ...>

Options:

  -h, --help           output usage information
  -b, --bars  <n>      Break after how many bars?
  -c, --capo <n>       What position is the capo on?
  -s, --separator <n>  Number of rests inserted between each bar?
```

Example
-------

`tabify --capo 8 example.mid`

````
--------------------2-0---------------------------------------------------------
------------------------1-0-----------------------------------------------------
--------0-0-2---------------2-0-------0---0-------------------------------------
------0-------0-2-0-------------0-4-2---2---0-------0-4-0-2-----2-2-0-0-2-0-----
0-2-3-----------------------------------------0-1-2---------0-2-------------2-3-
--------------------------------------------------------------------------------

----------------------------------------------------------------------------0-0-
------------------3-0-3-----0-------------------------------------------3-0-----
------0---------0-------2-----0---------------0-----0-0-0-2-----0---------------
0-2-4---4-2-0-------------0-----4-2-----0-2-4---4-2---------2-4---4-2-0---------
--------------3---------------------2-0-----------------------------------------
--------------------------------------------------------------------------------
```
