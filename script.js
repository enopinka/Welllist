document.addEventListener("alpine:init", () => {
  Alpine.store("mystore", {
    formData: {
      nama_barang: "Nama barang",
      harga: 12000,
      prioritas: 2,
    },
    formDataArray: [],
    resultArray: [],
    isResultVisible: false,
    sortBy: "harga",

    init() {
      for (let a = 0; a < 5; a++) {
        this.formDataArray.push({
          nama_barang: "Nama barang ke-" + a,
          harga: 10000 * (a + 1),
          prioritas: a + 1,
        });
      }

      this.formDataArray.push({
        nama_barang: "Nama barang ke-" + 5,
        harga: 2000,
        prioritas: 3,
      });
    },

    addFormData() {
      // Trim whitespace from form data properties
      const trimmedNamaBarang = this.formData.nama_barang.trim();
      //const trimmedHarga = this.formData.harga.trim();
      //const trimmedPrioritas = this.formData.prioritas.trim();

      // Check if any of the properties are empty after trimming
      if (
        trimmedNamaBarang !== "" &&
        this.formData.harga !== 0 &&
        this.formData.prioritas !== 0
      ) {
        // Add to array only if at least one property is not empty
        this.formDataArray.push({
          nama_barang: trimmedNamaBarang,
          harga: this.formData.harga,
          prioritas: this.formData.prioritas,
        });

        this.beginSort();

        // Clear form data
        this.formData.nama_barang = "";
        this.formData.harga = 0;
        this.formData.prioritas = 0;
      } else {
        alert("Data tidak boleh kosong");
      }
    },

    generateResult(maxPrice) {
      if (this.formDataArray.length === 0) {
        alert("Daftar barang kosong!");
      }

      this.formDataArray.sort((a, b) => b.prioritas - a.prioritas);

      while (maxPrice > 0 && this.formDataArray.length > 0) {
        let selectedObject = null;

        for (let i = 0; i < this.formDataArray.length; i++) {
          if (parseFloat(this.formDataArray[i].harga) <= maxPrice) {
            selectedObject = this.formDataArray[i];
            this.resultArray.push(selectedObject);
            maxPrice -= parseFloat(selectedObject.harga);
          }

          const index = this.formDataArray.indexOf(selectedObject);
          if (index !== -1) {
            this.formDataArray.splice(index, 1);
          }
        }
      }

      if (this.resultArray.length === 0) {
        alert("Tidak ada barang yang dipilih!");
      }

      maxPrice = "";
      this.isResultVisible = true;
    },

    refreshPage() {
      location.reload();
    },

    beginSort() {
      console.log(this.formDataArray.length);
      for (let i = 0; i < this.formDataArray.length; i++) {
        console.log(this.sortBy);
        let minIndex = i;

        for (let j = i + 1; j < this.formDataArray.length; j++) {
          if (this.sortBy == "harga") {
            console.log("called");
            if (
              this.formDataArray[j].harga < this.formDataArray[minIndex].harga
            ) {
              minIndex = j;
              console.log("sort by harga");
            }
          } else {
            console.log("sort by prioritas");
            if (
              this.formDataArray[j].prioritas <
              this.formDataArray[minIndex].prioritas
            ) {
              minIndex = j;
            }
          }
        }

        // Move the condition to swap outside of the inner loop
        console.log("tuker");
        if (minIndex !== i) {
          [this.formDataArray[i], this.formDataArray[minIndex]] = [
            this.formDataArray[minIndex],
            this.formDataArray[i],
          ];
        }
      }
    },
  });
});
