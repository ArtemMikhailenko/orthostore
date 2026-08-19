// Custom Next.js image loader.
// The site's images live on Cloudinary, which can resize/optimize on its own.
// Routing them through Vercel's optimizer runs into the account's
// Image-Optimization quota (HTTP 402), which breaks every <Image> on the live
// site. This loader bypasses Vercel entirely: for Cloudinary delivery URLs it
// injects on-the-fly transforms (auto format/quality + width cap); any other
// URL (local /images, placeholders, other hosts) is returned untouched.
module.exports = function cloudinaryLoader({ src, width }) {
  const marker = '/image/upload/';
  const idx = src.indexOf(marker);
  if (src.includes('res.cloudinary.com') && idx !== -1) {
    // Cloudinary rejects numeric quality with q_auto, so always use q_auto.
    const t = ['f_auto', 'q_auto', `w_${width}`, 'c_limit'].join(',');
    return src.slice(0, idx + marker.length) + t + '/' + src.slice(idx + marker.length);
  }
  return src;
};
