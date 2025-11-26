// 1. Ambil elemen DOM
var inputGram = document.getElementById("emas-gram"); // buat panggil id jumlah emas
var tombol = document.getElementById("hitung");       // buat di jadiin tombol hitung
var hasil = document.getElementById("hasil");         // buat area output hasil
var historyList = document.getElementById("history"); // buat daftar riwayat perhitungannya yang tadi

// 2. Tentukan harga emas per gram kayak (contoh: 1.100.000)
var hargaEmasRupiah = 1100000;  

// 3. Fungsi menampilkan history dari localStorage
function muatHistory() { //dibikin fungsi namanya "muatHistory"
  var data = localStorage.getItem("zakat_History");//nanti di localstorage nama key nya ("zakat_history")
  var riwayat = data ? JSON.parse(data) : [];
  //data ? kalau_benar jadiin array : kalau_salah di kosongin //: (kalau tidak) [] (kosongin arraynya)

  // diubah text JSON menjadi array menggunakan JSON.parse //(data ?):itu operator ternary —  dicek ada datanya atau tidak
  // JSON itu disimpan sebagai teks string, bukan list array beneran.===Karena localStorage cuma bisa nyimpan teks, bukan array asli.

  historyList.innerHTML = "";//awal historynya dikosongin
  riwayat.forEach(function(item) { //(yang "forEach" diloop data satu-satu
    var li = document.createElement("li");//buat kode li tanpa harus buat di html
    li.textContent = item;
    historyList.appendChild(li); // nah ini buat Kita bikin <li> lalu tempelin ke dalam <ul>

  });
}

// 4. Fungsi menyimpan history
function simpanHistory(text) {  // bikin fungsi yang namanya "simpanHistory" untuk data yang mau disimpan
  var data = localStorage.getItem("zakat_History"); // Hasilnya: kalau ada catatan dijadiin string JSON, kalau belum ada dijadiin null
  var riwayat = data ? JSON.parse(data) : [];
  //kondisi ? kalau_benar jadiin array : kalau_salah di kosongin //: (kalau tidak) [] (kosongin arraynya)

  // diubah text JSON menjadi array menggunakan JSON.parse //(data ?):itu operator ternary —  dicek ada datanya atau tidak
  // JSON itu disimpan sebagai teks string, bukan list array beneran.Karena localStorage cuma bisa nyimpan teks, bukan array asli.

 
  riwayat.unshift(text);//supaya data terbaruyang disimpan  ada di atas 
  if (riwayat.length > 10) riwayat.pop();// jika riwayat datanya itu lebih(>) dari 10 maka(pop) dibuang item terakhir

  localStorage.setItem("zakat_History", JSON.stringify(riwayat));//JSON.stringify() = array ke teks JSON
  //disimpan kembali list yang sudah diperbarui
  muatHistory();//di Panggil fungsi "muatHistory()" supaya tampilan list historynya langsung keupdate
}

// 5. Event tombol hitung
tombol.addEventListener("click", function() { //kerjanya ini mendengarkan sebuah aksi, aksinya "klik" dan yang harus dilakukan
  var emas = parseFloat(inputGram.value);//di imput data gram yang mau di kalkulasiakn 
  var nisab = 85;//di sebandingkann dengan standar nisab

  if (isNaN(emas) || emas <= 0) { //is Not a Number (isNaN)
    hasil.textContent = "Pastikan Memasukkan jumlah emas yang benar!";//ini kalo dak pas ki
    return;
  }

  if (emas < nisab) { //Kalau emas kurang dari batas 85 gram  belumpi disuruh wajib zakat
    hasil.textContent = "Belum Diwajibkan Membayar Zakat (nisab minimal 85 gram)";//ini nanti peringatannya 
    simpanHistory(`Emas: ${emas} gr Anda Belum wajib bayar zakat`);//tapi datanya masih di simpan 
  } else {
    var zakat = emas * 0.025; //100 dikali  0.025 = 2.5 gr 
    var rupiah = zakat * hargaEmasRupiah;//misal Zakat 2.5 gram jadi  2.5 × 1.200.000 = Rp 3.000.000

    //baru di tampilkan hasilnya

    hasil.textContent = `Zakat: ${zakat.toFixed(2)} gr (≈ Rp ${rupiah.toLocaleString()})`;//(tofixed): 2 angka desimal → contoh: 2.50

    simpanHistory(`Emas: ${emas} gr HARUS ZAKAT: ${zakat.toFixed(2)} gr (Rp ${rupiah.toLocaleString()})`);//format ribuan → contoh: 3,000,000
  }

  inputGram.value = "";//di kosongin biar siap buat input data baru
});

// 6. Tampilkan history saat halaman dibuka
muatHistory();//Kalau direloadki  history tetap muncul. karna kita simpan di localStorage
