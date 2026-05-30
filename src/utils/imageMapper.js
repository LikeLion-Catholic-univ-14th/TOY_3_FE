import tableImg from "../assets/furniture/table.jpg";
import lightingImg from "../assets/furniture/lighting.jpg";
import chairImg from "../assets/furniture/chair.jpg";
import shelfImg from "../assets/furniture/shelf.jpg";
import curtainImg from "../assets/furniture/curtain.jpg";
import defaultImg from "../assets/furniture/default.jpg";

const POST_IMAGE_MAP = [
  { keywords: ["협탁", "테이블", "책상"], image: tableImg },
  { keywords: ["조명", "무드등"], image: lightingImg },
  { keywords: ["소파", "암체어"], image: chairImg },
  { keywords: ["서랍장", "선반"], image: shelfImg },
  { keywords: ["커튼"], image: curtainImg },
];

export function getImageByTitle(title = "") {
  for (const { keywords, image } of POST_IMAGE_MAP) {
    if (keywords.some((kw) => title.includes(kw))) {
      return image;
    }
  }
  return defaultImg;
}
