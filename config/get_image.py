import pyautogui as pg
import time


def _moe(button="alt"):
    pg.keyDown(button)
    pg.press('tab')
    pg.keyUp(button)


def _start():
    _moe()
    pg.scroll(-186)
    _moe()


# _start()

xx = 460
yy = 125
_run = True
row = int(input('Nhập số hàng muốn lấy: '))
_moe("ctrl")
for _ in range(row):
    for i in range(3):
        x = xx + 480*(i % 3)
        y = yy
        _moe()
        pg.moveTo(x, y)
        pg.click(button='right')
        pg.moveTo(x+20, y+170)
        if pg.position()[0] != x and pg.position()[0] != x + 20:
            _run = False
            break
        pg.click()
        _moe()
        pg.hotkey('ctrl', 'v')
        pg.press('enter')
        pg.hotkey('ctrl', 's')
    if _run == False:
        break
    _moe()
    pg.scroll(-129)
    _moe()

_moe('ctrl')
