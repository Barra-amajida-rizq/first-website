def penjumlahan (a, b):
    return a + b
def pengurangan (a, b):
    return a - b
def perkalian (a, b):
    return a * b
def pembagian (a, b):
    if b != 0:
        return a / b
    else : 
        return ("pembagian tidak bisa di bagi dengan 0")
    

print ("-----Kalkulator Sederhana----")
print ("-----------------------------")

while True:
    print ("Pilih Oprasi nya")
    print("1. Penjumlahan")
    print("2. Pengurangan")
    print("3. Perkalian")
    print("4. Pembagian")
    print("5. Keluar")

    pilihan = input("pilih make angka menu nya : ")
    if pilihan == '5':
        print("salah masukkin angka mas")
        break
    
    angka1 = float(input("masukkan angka pertama : "))
    angka2 = float(input("masukkan angka kedua : "))

    if pilihan == '1':
        hasil = penjumlahan(angka1,angka2)
        print("hasil penjumlahan = ", hasil)
    elif pilihan == '2':
        hasil = pengurangan(angka1,angka2)
        print("hasil pengurangan = ", hasil)
    elif pilihan == '3':
        hasil = perkalian(angka1,angka2)
        print("hasil perkalian = ", hasil)
    elif pilihan == '4':
        hasil = pembagian(angka1,angka2)
        print("hasil pembagian = ", hasil)
    else : 
        print("Salah masukkin angka.")
