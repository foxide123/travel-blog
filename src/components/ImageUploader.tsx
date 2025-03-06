// components/ImageUploader.ts
import Quill from "quill";

// Custom ImageUploader module for Quill
class ImageUploader {
  quill: Quill;
  options: any;

  constructor(quill: Quill, options: any) {
    this.quill = quill;
    this.options = options;

    // Get the toolbar module and add a handler for the "image" button.
    const toolbar:any = this.quill.getModule("toolbar");
    toolbar.addHandler("image", this.selectLocalImage.bind(this));
  }

  selectLocalImage() {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      const file = input.files ? input.files[0] : null;
      if (file) {
        // Optionally, show a loading indicator here
        const range = this.quill.getSelection(true);
        // Upload the image and get its URL
        const url = await this.uploadImage(file);
        if (url) {
          // Insert the image into the editor at the current cursor position.
          this.quill.insertEmbed(range.index, "image", url, "user");
          // Move the cursor to right after the image.
          this.quill.setSelection(range.index + 1, 0);
        }
      }
    };
  }

  async uploadImage(file: File): Promise<string | null> {
    // Create a FormData object for the file upload.
    const formData = new FormData();
    formData.append("file", file);

    try {
      // Adjust this URL to your API endpoint that handles uploads to Supabase.
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      // Assuming the response contains { url: "https://..." }
      return data.url;
    } catch (error) {
      console.error("Image upload failed", error);
      return null;
    }
  }
}

export default ImageUploader;
