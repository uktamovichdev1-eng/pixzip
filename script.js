
const uploadBtn = document.getElementById("imgDow");
const fileInput = document.getElementById("fileinput");
const preview = document.getElementById("preview");
const resp = document.getElementById("resp");
const downloadBtn = document.querySelector(".downland");
const clearBtn = document.querySelector(".clear");

let compressedBlob = null;


uploadBtn.addEventListener("click", () => {
  fileInput.click();
});


function compressImage(file, quality = 0.7, maxWidth = 800) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = (e) => {
      const img = new Image();
      img.src = e.target.result;

      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        const scale = Math.min(1, maxWidth / img.width);
        canvas.width = img.width * scale;
        canvas.height = img.height * scale;

        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        canvas.toBlob(
          (blob) => {
            resolve(blob);
          },
          "image/jpeg",
          quality
        );
      };

      img.onerror = (err) => reject(err);
    };

    reader.onerror = (err) => reject(err);
  });
}


fileInput.addEventListener("change", async (e) => {
  const file = e.target.files[0];
  if (file) {
    resp.style.display = "none";


    compressedBlob = await compressImage(file, 0.7);


    const url = URL.createObjectURL(compressedBlob);
    preview.src = url;
    preview.style.display = "block";
  }
});


downloadBtn.addEventListener("click", () => {
  if (compressedBlob) {
    const link = document.createElement("a");
    link.href = URL.createObjectURL(compressedBlob);
    link.download = "siqilgan_rasm.jpg";
    link.click();
  } else {
    alert("Avval rasm yuklang va siqilsin 😊");
  }
});


clearBtn.addEventListener("click", () => {
  preview.src = "";
  preview.style.display = "none";
  resp.style.display = "block";
  fileInput.value = "";
  compressedBlob = null;
});
