export const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
  
    try {
      const response = await fetch("http://localhost:8000/upload/", {
        method: "POST",
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error("Image upload failed");
      }
  
      const data = await response.json();
      return data.url; // Return the image URL
    } catch (error) {
      console.error("Upload error:", error);
      return null;
    }
  };
  