import { Breakpoint, Width } from "../../constants/constants";

export function getWidth(widthPerPixel: number) {
  if (widthPerPixel < Breakpoint.Small) {
    return Width.Small;
  } else if (widthPerPixel < Breakpoint.Medium) {
    return Width.Medium;
  } else if (widthPerPixel < Breakpoint.Large) {
    return Width.Large;
  } else {
    return Width.ExtraLarge;
  }
}
