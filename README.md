# dragula-scroll

Scrolling function for dragula library.

Implementation:

```
  const scroller = new Scroller();
  dragula([elements])
    .on('cancel', => { scroller.stop(); })
    .on('drag', => { scroller.start(); })
    .on('drop', () => {
        scroller.stop();
    });

```
