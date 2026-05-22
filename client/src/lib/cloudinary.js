/**
 * Transforms a Cloudinary URL to force a download by adding the fl_attachment flag.
 * @param {string} url - The original Cloudinary URL
 * @param {string} filename - Optional filename for the download
 * @returns {string} - The transformed URL
 */
export const getDownloadUrl = (url) => {
  if (!url || !url.includes('cloudinary.com')) return url;

  // Determine the base path segment (image/upload or raw/upload)
  const uploadSegment = url.includes('/raw/upload/') ? '/raw/upload/' : '/image/upload/';
  const parts = url.split(uploadSegment);
  if (parts.length !== 2) return url;

  // Use the same segment in the returned URL and add fl_attachment flag
  return `${parts[0]}${uploadSegment}fl_attachment/${parts[1]}`;
};
