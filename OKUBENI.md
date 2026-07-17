# NETA PRUVA — Uygulama

Yat Kaptanlığı El Kitabı'nın mobil uygulaması.
245 sayfa · tıklanabilir içindekiler · tam metin arama · çevrimdışı çalışır.

---

## Ne var bu pakette?

```
index.html              → uygulamanın kendisi
kitap.pdf               → 245 sayfalık kitap
pdf.min.js              → PDF motoru
pdf.worker.min.js       → PDF motoru (arka plan)
manifest.webmanifest    → uygulama tanımı (isim, ikon, renk)
sw.js                   → çevrimdışı çalışma
icon-192 / 512 / maskable / favicon → ikonlar
```

---

## Özellikler

| Özellik | Nasıl |
|---|---|
| **İçindekiler** | Sol üstteki ☰ → konuya tıkla, o sayfaya gider |
| **Arama** | Sağ üstteki 🔍 → kitabın tamamında arar, sonuca tıkla |
| **Sayfa atlama** | Alttaki kutuya sayfa numarası yaz |
| **Sayfa çevirme** | ‹ › tuşları veya **parmakla sağa/sola kaydır** |
| **Kaldığın yer** | Uygulamayı kapatıp açınca kaldığın sayfadan devam eder |
| **Çevrimdışı** | İlk açılıştan sonra internet gerekmez |

Arama Türkçe büyük/küçük harf duyarsızdır: `İZBARÇO`, `izbarço`, `İzbarço`
aynı sonucu verir.

---

## 1) Telefonda çalıştırmak (en kolay yol)

Uygulamanın çalışması için dosyaların bir **web adresinden** açılması gerekir.
Doğrudan `index.html`'e çift tıklamak **çalışmaz** (tarayıcı güvenliği).

### GitHub Pages ile (ücretsiz, 5 dakika)

1. [github.com](https://github.com) → yeni repo aç (adı: `netapruva`), **Public** seç
2. Bu klasördeki **tüm dosyaları** sürükle-bırak ile yükle → *Commit changes*
3. Repo → **Settings** → **Pages** → *Source: Deploy from a branch* →
   *Branch: main / (root)* → **Save**
4. 1-2 dakika bekle. Adresin şu olur:
   `https://KULLANICIADIN.github.io/netapruva/`
5. **Bu linki tanıdıklarına gönder.** Herkes telefonundan açar.

### Telefona "uygulama" olarak kurmak

Link açıldıktan sonra:

- **Android (Chrome):** ⋮ menü → *Uygulamayı yükle* / *Ana ekrana ekle*
- **iPhone (Safari):** Paylaş → *Ana Ekrana Ekle*

Ana ekranda kendi ikonuyla çıkar, tam ekran açılır, çevrimdışı çalışır.
Kullanıcı açısından mağazadan inen bir uygulamadan farkı yoktur.

---

## 2) Gerçek APK üretmek

APK üretimi için **Android SDK** gerekir. Bilgisayarında
[Android Studio](https://developer.android.com/studio) kuruluysa:

```bash
# 1. Proje kur
npm create @capacitor/app@latest netapruva-apk
cd netapruva-apk
npm install
npx cap add android

# 2. Bu paketteki dosyaları web klasörüne kopyala
#    (içindeki her şeyi netapruva-apk/www/ altına at)
rm -rf www/* && cp -r /BU_PAKETIN_YOLU/* www/

# 3. Uygulama kimliğini ayarla — capacitor.config.json:
#    { "appId": "com.tolgaerhanbalci.netapruva",
#      "appName": "Neta Pruva",
#      "webDir": "www" }

# 4. Senkronize et ve aç
npx cap sync android
npx cap open android
```

Android Studio açılınca: **Build → Build Bundle(s)/APK(s) → Build APK(s)**

APK şurada oluşur:
`android/app/build/outputs/apk/debug/app-debug.apk`

Bu dosyayı WhatsApp'tan gönderebilirsin. Kuran kişinin telefonunda
*"Bilinmeyen kaynaklara izin ver"* açık olmalı.

> **Not:** Google Play'e yüklemek istersen imzalı bir *release* APK/AAB
> gerekir ve geliştirici hesabı (tek seferlik 25 USD) açman gerekir.

---

## 3) Bilgisayarda denemek

```bash
cd bu-klasor
python3 -m http.server 8000
```
Tarayıcıda: `http://localhost:8000`

---

## Kitabı güncellemek

Kitapta değişiklik yaptığında sadece **`kitap.pdf`** dosyasını değiştir.
Uygulama içindekileri ve arama dizinini PDF'ten **otomatik** kurar —
kod değiştirmene gerek yok.

Service worker eskisini önbellekte tutabilir; `sw.js` içindeki
`netapruva-v1` yazısını `netapruva-v2` yap ki kullanıcılar yeni sürümü
görsün.

---

## Bilinen sınırlar

- İlk açılışta arama dizini kurulur (245 sayfa, birkaç saniye). Açılış
  ekranındaki çizgi bunun ilerlemesidir.
- PDF sabit sayfa düzenindedir; yazı boyutu değiştirilemez. Yakınlaştırmak
  için parmakla açma hareketi kullanılır.

---

**Neta Pruva — Yat Kaptanlığı El Kitabı**
Tolga Erhan Balcı · Birinci Baskı · 2026
