"use server";

export async function imageToBlob(file: string) {
  const base64Data = file.split(",")[1];
  const binaryData = atob(base64Data);
  const buffer = new Uint8Array(binaryData.length);

  for (let i = 0; i < binaryData.length; i++) {
    buffer[i] = binaryData.charCodeAt(i);
  }

  return new Blob([buffer], { type: "image/jpeg" });
}
