/**
 * Transforms a Cloudinary URL to force a download by adding the fl_attachment flag.
 * @param {string} url - The original Cloudinary URL
 * @param {string} filename - Optional filename for the download
 * @returns {string} - The transformed URL
 */
export const getDownloadUrl = (url) => {
  if (!url || !url.includes('cloudinary.com')) return url;
  
  const parts = url.split('/upload/');
  if (parts.length !== 2) return url;
  
  // Now that we've switched back to 'image' resource type in the backend,
  // fl_attachment will work perfectly to force a PDF download.
  return `${parts[0]}/upload/fl_attachment/${parts[1]}`;
};
