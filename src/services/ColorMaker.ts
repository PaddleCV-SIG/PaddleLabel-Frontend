/* eslint-disable */
export function MyColor(this: any) {
  this.TextColor = 'FFFFFF';
  this.Color = 'FF0000';
}

export const ColorMaker: {
  TotalColors: number;
  GetColor: (seed?: number) => any;
  _CalColor: (idx?: number) => number;
  _CalTextColor: (input?: string) => string;
} = {
  // 最大支持颜色种类数
  TotalColors: 300,
  // 获取颜色 seed:颜色种子(任意int)
  GetColor: (seed = 0) => {
    const ret = new MyColor();
    // 计算对应下标
    const idx = seed % ColorMaker.TotalColors;
    // 计算颜色
    const colorVal = ColorMaker._CalColor(idx);
    // 转成RGB 16进制字符串
    ret.Color = colorVal.toString(16).padStart(6, '0');
    // 计算互补色
    ret.TextColor = ColorMaker._CalTextColor(ret.Color);

    return ret;
  },

  _CalColor: (idx = 0) => {
    // 默认返回红色
    let ret = 0xff0000;
    // RGB的最大值
    const full = 0xffffff;
    // 总共需要支持多少种颜色，若传0则取255
    const total = ColorMaker.TotalColors > 0 ? ColorMaker.TotalColors : 0xff;
    // 将所有颜色平均分成x份
    const perVal = full / total;
    if (idx >= 0 && idx <= total) {
      ret = perVal * idx;
    }
    ret = Math.round(ret);
    return ret;
  },

  // 计算传入颜色的互补色
  _CalTextColor: (input = '') => {
    const R = input.substr(0, 2);
    const G = input.substr(2, 2);
    const B = input.substr(4, 2);
    const rVal = parseInt(R, 16);
    const gVal = parseInt(G, 16);
    const bVal = parseInt(B, 16);
    const hsl = rgbToHsl(rVal, gVal, bVal);

    hsl.L = (hsl.L + 0.5) % 1.0;
    const rgb = hslToRgb(hsl.H, hsl.S, hsl.L);
    const ret = (rgb.R << 16) + (rgb.G << 8) + rgb.B;
    return ret.toString(16).padStart(6, '0');
  },
};

/**
 * RGB 颜色值转换为 HSL.
 * 转换公式参考自 http://en.wikipedia.org/wiki/HSL_color_space.
 * r, g, 和 b 需要在 [0, 255] 范围内
 * 返回的 h, s, 和 l 在 [0, 1] 之间
 *
 * @param   Number  r       红色色值
 * @param   Number  g       绿色色值
 * @param   Number  b       蓝色色值
 * @return  Array           HSL各值数组
 */
export const rgbToHsl = (R: number, G: number, B: number) => {
  //   (r /= 255), (g /= 255), (b /= 255);
  const r = R / 255;
  const g = G / 255;
  const b = B / 255;
  const max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  let h,
    s = (max + min) / 2;
  const l = (max + min) / 2;
  if (max == min) {
    h = s = 0; // achromatic
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }
  return { H: h, S: s, L: l };
};

/**
 * HSL颜色值转换为RGB.
 * 换算公式改编自 http://en.wikipedia.org/wiki/HSL_color_space.
 * h, s, 和 l 设定在 [0, 1] 之间
 * 返回的 r, g, 和 b 在 [0, 255]之间
 *
 * @param   Number  h       色相
 * @param   Number  s       饱和度
 * @param   Number  l       亮度
 * @return  Array           RGB色值数值
 */
export const hslToRgb = (h: number, s: number, l: number) => {
  let r, g, b;
  if (s == 0) {
    r = g = b = l; // achromatic
  } else {
    const hue2rgb = function hue2rgb(p: number, q: number, T: number) {
      let t = T;
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }
  return { R: Math.round(r * 255), G: Math.round(g * 255), B: Math.round(b * 255) };
};
