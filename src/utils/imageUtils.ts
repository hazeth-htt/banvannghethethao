/**
 * Nén và chuyển đổi tệp ảnh từ máy tính sang chuỗi Base64 Data URL tối ưu
 * để lưu trữ nhẹ nhàng và hiển thị ngay tức thì.
 */
export async function compressImageFile(
  file: File,
  maxDimension: number = 1280,
  quality: number = 0.82
): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (readerEvent) => {
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        // Tính tỉ lệ co giãn nếu ảnh lớn hơn maxDimension
        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          } else {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        if (!ctx) {
          resolve(readerEvent.target?.result as string);
          return;
        }

        // Vẽ ảnh lên canvas đã co giãn
        ctx.drawImage(img, 0, 0, width, height);

        // Xuất ra dạng JPEG chất lượng cao tối ưu dung lượng
        const dataUrl = canvas.toDataURL("image/jpeg", quality);
        resolve(dataUrl);
      };

      img.onerror = (err) => {
        reject(err);
      };

      img.src = readerEvent.target?.result as string;
    };

    reader.onerror = (err) => {
      reject(err);
    };

    reader.readAsDataURL(file);
  });
}

/**
 * Nén nhiều tệp ảnh được chọn cùng lúc
 */
export async function compressMultipleImageFiles(files: FileList | File[]): Promise<string[]> {
  const fileArray = Array.from(files);
  const promises = fileArray.map((file) => compressImageFile(file));
  return Promise.all(promises);
}
