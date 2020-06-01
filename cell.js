class Cell {
  constructor(x, y, w, img, sx, sy, crop, csx, csy, ppd, cropname) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.img = img;
    this.sx = sx;
    this.sy = sy;
    this.ploughed = false;
    this.crop = crop;
    this.ppd = ppd;
    this.currentGrowth = 0;
    this.isMaxGrown = false;
    this.csx = csx;
    this.csy = csy;
    this.isHarvested = false;
    this.cropname = cropname;
  }
  show() {
    image(this.img, this.x, this.y, 64, 64, this.sx, this.sy, 64, 64);
    if (this.crop) {
      image(crops, this.x, this.y, 32, 64, this.csx, this.csy, 32, 64);
      image(
        crops,
        this.x + 16,
        this.y - 16,
        32,
        64,
        this.csx,
        this.csy,
        32,
        64
      );
      image(
        crops,
        this.x + 32,
        this.y - 32,
        32,
        64,
        this.csx,
        this.csy,
        32,
        64
      );
    }
  }

  update() {
    this.csy = floor(this.currentGrowth % 4) * 64;
    if (this.csy / 64 == 3) {
      this.isMaxGrown = true;
    }
  }
}
