document.addEventListener("alpine:init", () => {
  Alpine.store("mystore", {
    formData: {
      nama_barang: "",
      harga: 0,
      prioritas: 0,
    },
    formDataArray: [],
    resultArray: [],

    sortBy: "harga",

    // fungsi untuk menambahkan barang ke dalam formDataArray
    addFormData() {
      const trimmedNamaBarang = this.formData.nama_barang.trim();
      if (
        trimmedNamaBarang !== "" &&
        this.formData.harga !== 0 &&
        this.formData.prioritas !== 0
      ) {
        //memasukkan ke dalam array
        this.formDataArray.push({
          nama_barang: trimmedNamaBarang,
          harga: this.formData.harga,
          prioritas: this.formData.prioritas,
        });

        // mengurutkan array setelah ditambahkan
        this.beginSort();

        // menghapus data setelah setelah ditambahkan
        this.formData.nama_barang = "";
        this.formData.harga = 0;
        this.formData.prioritas = 0;
      } else {
        alert("Data tidak boleh kosong");
      }
    },

    // algoritma knapsack
    generateResult(maxPrice) {
      // ketika tidak ada barang ditambahkan
      if (this.formDataArray.length === 0) {
        alert("Daftar barang kosong!");
        return;
      }

      this.formDataArray.sort((a, b) => b.prioritas - a.prioritas);

      while (maxPrice > 0 && this.formDataArray.length > 0) {
        console.log("while loop");
        let selectedObject = null;

        for (let i = 0; i < this.formDataArray.length; i++) {
          if (parseFloat(this.formDataArray[i].harga) <= maxPrice) {
            selectedObject = this.formDataArray[i];
            this.resultArray.push(selectedObject);
            maxPrice -= parseFloat(selectedObject.harga);

            const index = this.formDataArray.indexOf(selectedObject);
          }
        }
        // setting ulang maxPrice menjadi nol
        maxPrice = 0;
        break;
      }
      // ketika uang yang dimasukkan tidak dapat memenuhi satu barang pun
      if (this.resultArray.length === 0) {
        alert("Tidak ada barang yang dipilih!");
      }
    },

    // fungsi untuk melakukan reset halaman
    refreshPage() {
      location.reload();
    },

    // fungsi untuk mengurutkan item dalam formDataArray secara menaik
    beginSort() {
      console.log(this.formDataArray.length);
      for (let i = 0; i < this.formDataArray.length; i++) {
        console.log(this.sortBy);
        let minIndex = i;

        for (let j = i + 1; j < this.formDataArray.length; j++) {
          // mengurutkan berdasarkan harga
          if (this.sortBy == "harga") {
            console.log("called");
            if (
              this.formDataArray[j].harga < this.formDataArray[minIndex].harga
            ) {
              minIndex = j;
              console.log("sort by harga");
            }
          } else {
            // mengurutkan berdasarkan prioritas
            console.log("sort by prioritas");
            if (
              this.formDataArray[j].prioritas <
              this.formDataArray[minIndex].prioritas
            ) {
              minIndex = j;
            }
          }
        }

        //menukar posisi jika terdapat posisi tidak tepat
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
